<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond($status, $body) {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function text_value($value, $maxLength) {
    if (!is_string($value)) {
        return '';
    }

    $substring = function_exists('mb_substr') ? mb_substr($value, 0, $maxLength) : substr($value, 0, $maxLength);
    return trim($substring);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['delivered' => false, 'error' => 'method_not_allowed']);
}

$allowedHosts = [
    'staff-academia.ru',
    'www.staff-academia.ru',
    'staff-academia.com',
    'www.staff-academia.com',
];
$host = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$originHost = $origin ? strtolower((string) parse_url($origin, PHP_URL_HOST)) : '';

if (!in_array($host, $allowedHosts, true) || !$originHost || $originHost !== $host) {
    respond(403, ['delivered' => false, 'error' => 'invalid_origin']);
}

$contentType = strtolower(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]);
if ($contentType !== 'application/json') {
    respond(415, ['delivered' => false, 'error' => 'invalid_content_type']);
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 12_000) {
    respond(413, ['delivered' => false, 'error' => 'payload_too_large']);
}

try {
    $input = json_decode($rawBody, true, 32, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, ['delivered' => false, 'error' => 'invalid_json']);
}

if (!is_array($input)) {
    respond(400, ['delivered' => false, 'error' => 'invalid_payload']);
}

// A filled field is a bot signal. Return success without forwarding it.
if (text_value($input['website'] ?? '', 200) !== '') {
    respond(200, ['delivered' => true]);
}

$name = text_value($input['name'] ?? '', 100);
$contact = text_value($input['contact'] ?? '', 100);
$email = text_value($input['email'] ?? '', 254);
$experience = text_value($input['experience'] ?? '', 500);
$intent = text_value($input['intent'] ?? '', 160);
$page = text_value($input['page'] ?? '', 1_000);
$submittedAt = text_value($input['submittedAt'] ?? '', 64);

$nameLength = function_exists('mb_strlen') ? mb_strlen($name) : strlen($name);
$contactLength = function_exists('mb_strlen') ? mb_strlen($contact) : strlen($contact);
// Email необязателен: проверяем формат только если он передан.
$emailValid = $email === '' || filter_var($email, FILTER_VALIDATE_EMAIL);
if ($nameLength < 2 || $contactLength < 3 || !$emailValid) {
    respond(422, ['delivered' => false, 'error' => 'validation_failed']);
}

$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDirectory = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'staff-academia-leads';
if (!is_dir($rateDirectory)) {
    @mkdir($rateDirectory, 0700, true);
}
$rateFile = $rateDirectory . DIRECTORY_SEPARATOR . hash('sha256', $clientIp) . '.json';
$now = time();
$attempts = [];
if (is_file($rateFile)) {
    $saved = json_decode((string) file_get_contents($rateFile), true);
    if (is_array($saved)) {
        $attempts = array_values(array_filter($saved, static function ($timestamp) use ($now) {
            return is_int($timestamp) && $timestamp > $now - 3600;
        }));
    }
}
if (count($attempts) >= 5) {
    respond(429, ['delivered' => false, 'error' => 'rate_limited']);
}
$attempts[] = $now;
@file_put_contents($rateFile, json_encode($attempts), LOCK_EX);

$configPath = __DIR__ . DIRECTORY_SEPARATOR . 'lead-config.php';
$config = is_file($configPath) ? require $configPath : [];
$botToken = getenv('STAFF_TELEGRAM_BOT_TOKEN') ?: ($config['telegram_bot_token'] ?? '');
$chatId = getenv('STAFF_TELEGRAM_CHAT_ID') ?: ($config['telegram_chat_id'] ?? '');

if (!is_string($botToken) || !is_string($chatId) || $botToken === '' || $chatId === '') {
    error_log('Staff Academy lead endpoint is not configured.');
    respond(503, ['delivered' => false, 'error' => 'service_unavailable']);
}

$utm = [];
if (is_array($input['utm'] ?? null)) {
    foreach ($input['utm'] as $key => $value) {
        $key = text_value($key, 80);
        $value = text_value($value, 300);
        if ($key !== '' && $value !== '') {
            $utm[$key] = $value;
        }
    }
}

$escape = static function ($value) {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};
$lines = [
    '<b>Новая заявка с Staff Concierge Academy</b>',
    '<b>Имя:</b> ' . $escape($name),
    '<b>Телефон / Telegram:</b> ' . $escape($contact),
    '<b>Email:</b> ' . $escape($email !== '' ? $email : '—'),
    '<b>Опыт:</b> ' . $escape($experience !== '' ? $experience : '—'),
    '<b>Запрос:</b> ' . $escape($intent ?: 'Консультация по курсу'),
    '<b>Страница:</b> ' . $escape($page),
    '<b>Время:</b> ' . $escape($submittedAt ?: gmdate(DATE_ATOM)),
];
if ($utm) {
    $lines[] = '<b>UTM:</b> ' . $escape(http_build_query($utm, '', '; '));
}

$telegramPayload = json_encode([
    'chat_id' => $chatId,
    'text' => implode("\n", $lines),
    'parse_mode' => 'HTML',
    'disable_web_page_preview' => true,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$telegramUrl = 'https://api.telegram.org/bot' . $botToken . '/sendMessage';
$telegramResponse = false;

if (function_exists('curl_init')) {
    $curl = curl_init($telegramUrl);
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $telegramPayload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 12,
    ]);

    // REG.RU hosting currently reaches Telegram reliably over IPv6.
    if (defined('CURL_IPRESOLVE_V6')) {
        curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V6);
    }

    $telegramResponse = curl_exec($curl);
    curl_close($curl);
} else {
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $telegramPayload,
            'timeout' => 10,
            'ignore_errors' => true,
        ],
    ]);
    $telegramResponse = @file_get_contents($telegramUrl, false, $context);
}
$telegramResult = is_string($telegramResponse) ? json_decode($telegramResponse, true) : null;

if (!is_array($telegramResult) || empty($telegramResult['ok'])) {
    error_log('Staff Academy lead delivery failed.');
    respond(502, ['delivered' => false, 'error' => 'delivery_failed']);
}

respond(200, ['delivered' => true]);

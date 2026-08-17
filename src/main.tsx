import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Пререндер отдаёт готовый HTML (SEO + мгновенная первая отрисовка).
// Дальше React рендерит поверх и берёт страницу под контроль.
// Используем render (а не hydrate) намеренно: анимации framer-motion
// делают строгую гидрацию несовместимой со снапшотом.
createRoot(document.getElementById("root")!).render(<App />);

import logoBlack from "@/assets/logo-black.png";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-7">
        <div className="relative">
          <div className="h-36 w-36 rounded-full border border-border/60 bg-card flex items-center justify-center shadow-xl">
            <img src={logoBlack} alt="Staff Concierge Academy" className="h-20 w-auto" />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-primary/40 border-t-transparent animate-spin" />
        </div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
          ЗАГРУЗКА САЙТА
        </p>
      </div>
    </div>
  );
};

export default Loader;


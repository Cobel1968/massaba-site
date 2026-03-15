export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-background px-6">
      <div className="max-w-4xl text-center">
        <h1 className="mb-6 text-6xl font-black tracking-tighter text-foreground sm:text-7xl">
          CONSULTANCY <span className="text-primary">SITE</span>
        </h1>
        
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Precision consulting for the modern era. Our engine is built on 
          Next.js 16 and Tailwind v4 for unparalleled performance and design.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105 hover:bg-primary-dark">
            Get Started
          </button>
          <button className="rounded-full border border-border bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:bg-muted">
            Our Services
          </button>
        </div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
    </main>
  );
}
export default function TypographyGuide() {
  return (
    <main className="min-h-screen bg-background p-12 text-foreground">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <section className="border-b border-border pb-8">
          <h1 className="text-4xl font-serif font-black tracking-tighter text-primary">
            Typography & Style Guide
          </h1>
          <p className="text-muted-foreground mt-2 font-sans">
            Consultancy Site Engine | Next.js 16 + Tailwind v4
          </p>
        </section>

        {/* 1. Sans (Inter) - The Workhorse */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">01. Sans-Serif (Inter)</h2>
          <div className="bg-muted/30 p-8 rounded-xl border border-border">
            <p className="font-sans text-3xl font-bold mb-4">The quick brown fox jumps over the lazy dog.</p>
            <p className="font-sans text-lg leading-relaxed max-w-2xl text-muted-foreground">
              Used for UI elements, navigation, and general body text. It is designed for high legibility and a clean, modern aesthetic.
            </p>
          </div>
        </section>

        {/* 2. Serif (Merriweather) - The Authority */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">02. Serif (Merriweather)</h2>
          <div className="bg-muted/30 p-8 rounded-xl border border-border">
            <p className="font-serif text-4xl italic mb-4">Strategic excellence and precision consulting.</p>
            <p className="font-serif text-xl leading-loose max-w-3xl">
              Used for editorial content, executive summaries, and high-level headings. The serif typeface adds authority and a traditional "consultancy" feel to the digital experience.
            </p>
          </div>
        </section>

        {/* 3. Mono (JetBrains) - The Data */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">03. Monospace (JetBrains Mono)</h2>
          <div className="bg-muted/30 p-8 rounded-xl border border-border">
            <p className="font-mono text-2xl text-primary mb-2">RUN_DIAGNOSTIC: STATUS_OK [200]</p>
            <p className="font-mono text-sm text-muted-foreground">
              Used for technical data, metadata, identifiers, and code blocks.
            </p>
          </div>
        </section>

        {/* Color Palette Check */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">04. Color Palette</h2>
          <div className="flex gap-4">
            <div className="h-20 w-20 bg-primary rounded-lg flex items-end p-2 text-[10px] font-mono font-bold text-primary-foreground">PRIMARY</div>
            <div className="h-20 w-20 bg-primary-dark rounded-lg flex items-end p-2 text-[10px] font-mono font-bold text-primary-foreground">DARK</div>
            <div className="h-20 w-20 bg-secondary rounded-lg flex items-end p-2 text-[10px] font-mono font-bold text-white">SECONDARY</div>
            <div className="h-20 w-20 bg-muted rounded-lg border border-border flex items-end p-2 text-[10px] font-mono font-bold">MUTED</div>
          </div>
        </section>

      </div>
    </main>
  );
}

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ════════════════════════════════════════════════════════════
   OWNEO — DESIGN SYSTEM (source de vérité)
   Toutes les couleurs sont en HSL. Ne jamais écrire de couleur
   en dur dans les composants : utiliser les tokens ci-dessous.
   ════════════════════════════════════════════════════════════ */

@layer base {
  :root {
    /* ─── Fonds & textes ─── */
    --background: 0 0% 7%;
    --foreground: 0 0% 98%;

    --card: 0 0% 10%;
    --card-foreground: 0 0% 98%;

    --popover: 0 0% 10%;
    --popover-foreground: 0 0% 98%;

    /* ─── Accent unique de la marque : CHAMPAGNE ───
       Ne change la valeur qu'ici pour rebrander tout le site. */
    --champagne: 16 23% 66%;
    --champagne-foreground: 0 0% 7%;

    --primary: 16 23% 66%;            /* CTA principaux, accents forts */
    --primary-foreground: 0 0% 7%;

    --secondary: 0 0% 15%;            /* boutons/blocs secondaires */
    --secondary-foreground: 0 0% 98%;

    --accent: 16 23% 66%;             /* pictos décoratifs, survols */
    --accent-foreground: 0 0% 7%;

    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 75%;

    --destructive: 0 72% 45%;         /* erreurs / "agotado" uniquement */
    --destructive-foreground: 0 0% 98%;

    /* ─── Bordures & champs ─── */
    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 16 23% 66%;

    /* ─── Rayon unifié (cartes arrondies "luxe") ─── */
    --radius: 1rem;

    /* ─── État métier : participations disponibles ─── */
    --participation-available: 16 23% 66%;

    /* ─── Sidebar (admin) ─── */
    --sidebar-background: 0 0% 7%;
    --sidebar-foreground: 0 0% 89%;
    --sidebar-primary: 16 23% 66%;
    --sidebar-primary-foreground: 0 0% 7%;
    --sidebar-accent: 0 0% 15%;
    --sidebar-accent-foreground: 0 0% 98%;
    --sidebar-border: 0 0% 20%;
    --sidebar-ring: 16 23% 66%;
  }

  /* Le site est nativement sombre : .dark = mêmes valeurs */
  .dark {
    --background: 0 0% 7%;
    --foreground: 0 0% 98%;
  }
}

@layer utilities {
  /* ─── Couleur d'accent (helpers) ─── */
  .text-champagne { color: hsl(var(--champagne)); }
  .bg-champagne   { background-color: hsl(var(--champagne)); }

  /* ─── ÉCHELLE TYPOGRAPHIQUE — look luxe épuré ───
     Une classe par niveau. À utiliser PARTOUT pour les titres. */

  .ds-display {
    @apply text-4xl sm:text-5xl md:text-6xl lg:text-7xl
           font-extralight tracking-[0.15em] uppercase leading-tight;
  }

  .ds-h1 {
    @apply text-3xl sm:text-4xl md:text-5xl
           font-light tracking-[0.12em] uppercase leading-tight;
  }

  .ds-h2 {
    @apply text-2xl sm:text-3xl md:text-4xl
           font-semibold tracking-[0.04em] leading-snug;
  }

  .ds-h3 {
    @apply text-xl sm:text-2xl
           font-light tracking-[0.04em] leading-snug;
  }

  .ds-card-title {
    @apply text-lg sm:text-xl
           font-normal tracking-[0.02em] leading-snug;
  }

  .ds-eyebrow {
    @apply inline-block text-xs uppercase tracking-[0.2em]
           text-muted-foreground;
  }

  .ds-eyebrow-pill {
    @apply inline-block text-xs uppercase tracking-[0.2em]
           text-muted-foreground border border-border
           rounded-full px-4 py-1;
  }

  .ds-lead { @apply text-base sm:text-lg text-muted-foreground leading-relaxed; }
  .ds-body { @apply text-sm sm:text-base text-muted-foreground leading-relaxed; }

  /* ─── BLOCS / CARTES — style unifié ─── */

  .ds-card {
    @apply bg-card border border-border rounded-2xl p-6 sm:p-8;
  }

  .ds-card-hover {
    @apply bg-card border border-border rounded-2xl p-6 sm:p-8
           transition-all duration-500
           hover:border-champagne/60 hover:-translate-y-2
           hover:shadow-[0_20px_60px_-15px_hsl(var(--champagne)/0.35)];
  }

  .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px hsl(0 0% 0% / 0.5);
  }

  /* Picto décoratif : toujours en couleur d'accent */
  .ds-icon { @apply text-champagne; }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-encode font-extralight;
  }

  html {
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
  }
}

/* Safe area for bottom nav */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

/* Mobile-only: keep fixed header/footer anchored during pinch-zoom and scroll */
@media (max-width: 767px) {
  nav.fixed,
  header.fixed {
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden;
  }
}

/* Bottom nav spacer for pages */
.pb-bottom-nav {
  padding-bottom: calc(56px + env(safe-area-inset-bottom, 0px));
}

/* Remove hover effects on touch devices */
@media (hover: none) and (pointer: coarse) {
  .hover-lift:hover {
    transform: none;
    box-shadow: none;
  }

  .group:hover .group-hover\:scale-110 {
    transform: none;
  }
}

/* Ensure minimum touch targets */
@media (pointer: coarse) {
  button, a, [role="button"] {
    min-height: 44px;
  }
}

/* react-big-calendar dark theme */
.rbc-dark .rbc-calendar { background: transparent; color: hsl(var(--foreground)); }
.rbc-dark .rbc-toolbar button { color: hsl(var(--foreground)); background: hsl(var(--card)); border-color: hsl(var(--border)); }
.rbc-dark .rbc-toolbar button:hover, .rbc-dark .rbc-toolbar button.rbc-active { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
.rbc-dark .rbc-month-view, .rbc-dark .rbc-time-view, .rbc-dark .rbc-agenda-view { border-color: hsl(var(--border)); background: hsl(var(--card)); }
.rbc-dark .rbc-header, .rbc-dark .rbc-day-bg, .rbc-dark .rbc-month-row, .rbc-dark .rbc-time-header-content, .rbc-dark .rbc-time-content, .rbc-dark .rbc-timeslot-group { border-color: hsl(var(--border)); }
.rbc-dark .rbc-today { background: hsl(var(--primary) / 0.1); }
.rbc-dark .rbc-off-range-bg { background: hsl(var(--muted) / 0.3); }
.rbc-dark .rbc-off-range { color: hsl(var(--muted-foreground)); }
.rbc-dark .rbc-event { padding: 2px 4px; }

/* Hide scrollbar utility */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Scrollbar hide utility */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

@media (max-width: 767px) {
  .admin-shell { font-size: 14px; }
  .admin-shell h1 { font-size: 1.25rem; line-height: 1.3; }
  .admin-shell h2 { font-size: 1.1rem; line-height: 1.3; }

  .admin-shell [class*="grid-cols-2"],
  .admin-shell [class*="grid-cols-3"],
  .admin-shell [class*="grid-cols-4"],
  .admin-shell [class*="grid-cols-5"],
  .admin-shell [class*="grid-cols-6"] {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .admin-shell table { min-width: 100%; font-size: 14px; }
  .admin-shell .overflow-x-auto,
  .admin-shell table {
    -webkit-overflow-scrolling: touch;
  }
  .admin-shell > table,
  .admin-shell div:not(.overflow-x-auto):not(.overflow-auto) > table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .admin-shell button:not([class*="h-5"]):not([class*="h-6"]):not([class*="h-7"]):not([class*="h-8"]):not([class*="h-9"]):not([class*="size-"]) {
    min-height: 44px;
  }
  .admin-shell input:not([type="checkbox"]):not([type="radio"]),
  .admin-shell select,
  .admin-shell textarea {
    width: 100%;
    min-height: 48px;
    font-size: 16px;
  }
  .admin-shell textarea { min-height: 96px; }
  .admin-shell label { display: block; font-size: 14px; margin-bottom: 4px; }

  .admin-shell .recharts-responsive-container { min-height: 220px !important; width: 100% !important; }

  .admin-shell { overflow-x: hidden; }
  .admin-shell * { max-width: 100%; }

  .admin-shell [class*="max-w-"] { max-width: 100% !important; }
}

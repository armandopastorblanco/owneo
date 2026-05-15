import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LegalLayoutProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

const LegalLayout = ({ title, lastUpdated = "mayo de 2026", children }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 sm:mb-14 border-b border-border pb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">
              Información legal
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Última actualización: {lastUpdated}
            </p>
          </header>

          <article
            className="
              text-foreground
              [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-foreground
              [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-foreground
              [&_p]:text-sm sm:[&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p]:mb-4
              [&_ul]:text-sm sm:[&_ul]:text-[15px] [&_ul]:leading-relaxed [&_ul]:text-muted-foreground [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:space-y-1.5
              [&_li]:marker:text-primary/60
              [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80
              [&_strong]:text-foreground [&_strong]:font-semibold
            "
          >
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalLayout;

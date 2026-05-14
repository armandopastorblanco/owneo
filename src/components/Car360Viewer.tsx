import { useState, useRef, useCallback } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Car, RotateCcw } from "lucide-react";

interface Car360ViewerProps {
  carName: string;
  gallery: string[];
}

const Car360Viewer = ({ carName, gallery }: Car360ViewerProps) => {
  const [view, setView] = useState<"exterior" | "interior">("exterior");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startIndex = useRef(0);

  // Fixed split: 80% exterior, 20% interior (12 ext + 3 int for 15 images)
  const exteriorCount = Math.ceil(gallery.length * 0.8);
  const exteriorImages = gallery.slice(0, exteriorCount);
  const interiorImages = gallery.slice(exteriorCount);
  const images = view === "exterior" ? exteriorImages : interiorImages;

  const handleViewChange = (val: string) => {
    if (val === "exterior" || val === "interior") {
      setView(val);
      setCurrentIndex(0);
    }
  };

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startIndex.current = currentIndex;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [currentIndex]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const diff = e.clientX - startX.current;
    const threshold = width / images.length;
    const indexDelta = Math.round(diff / threshold);
    const newIndex = ((startIndex.current - indexDelta) % images.length + images.length) % images.length;
    setCurrentIndex(newIndex);
  }, [images.length]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <section className="mb-12">
      <div className="flex justify-end mb-6">
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={handleViewChange}
          className="bg-card border border-border rounded-lg p-1"
        >
          <ToggleGroupItem
            value="exterior"
            className="px-4 py-2 rounded-md text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <Car className="w-4 h-4 mr-2" />
            Exterior ({exteriorImages.length})
          </ToggleGroupItem>
          <ToggleGroupItem
            value="interior"
            className="px-4 py-2 rounded-md text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Interior ({interiorImages.length})
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gradient-to-b from-muted to-background cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {images.map((img, i) => (
          <img
            key={`${view}-${i}`}
            src={img}
            alt={`${carName} ${view} vista ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              i === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
          />
        ))}

        {/* Drag hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/70 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-muted-foreground flex items-center gap-2 pointer-events-none">
          <RotateCcw className="w-3 h-3" />
          Arrastra para rotar
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-primary w-4" : "bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Car360Viewer;

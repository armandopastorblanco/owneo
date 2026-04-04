// Maps database image paths to local Vite-imported assets
// This allows us to store simple path strings in the DB while using local assets

const imageModules = import.meta.glob('/src/assets/cars/**/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const cityModules = import.meta.glob('/src/assets/cities/**/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

export function resolveAssetPath(dbPath: string | null): string {
  if (!dbPath) return '/placeholder.svg';
  
  // If it's already a full URL (e.g. from Supabase Storage), return as-is
  if (dbPath.startsWith('http')) return dbPath;
  
  // Convert DB path like "/assets/cars/ferrari-portofino.jpg" to Vite glob key "/src/assets/cars/ferrari-portofino.jpg"
  const vitePath = `/src${dbPath}`;
  
  return imageModules[vitePath] || cityModules[vitePath] || dbPath;
}

// components/ui/gradient-background.tsx
export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
      <div className="absolute -top-1/2 right-0 h-[1000px] w-[1000px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
      <div className="absolute -bottom-1/2 left-0 h-[1000px] w-[1000px] rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 blur-3xl" />
    </div>
  );
}

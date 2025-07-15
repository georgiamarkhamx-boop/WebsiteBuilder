import ImmersiveHero from "./immersive-hero";

interface HeroSectionProps {
  onShowDemo: () => void;
}

export default function HeroSection({ onShowDemo }: HeroSectionProps) {
  return <ImmersiveHero onShowDemo={onShowDemo} />;
}

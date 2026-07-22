import { HologramIntro } from '@/components/hologram-intro';
import { SeoHead } from '@/components/seo-head';

export default function IntroScreen() {
  return (
    <>
      <SeoHead
        title="Community-basierte Harm-Reduction-App"
        description="SAFEFLOOR ist ein interaktiver Produktprototyp für ruhige Orientierung, Community-Hinweise, Hilfe und Nachsorge."
      />
      <HologramIntro />
    </>
  );
}

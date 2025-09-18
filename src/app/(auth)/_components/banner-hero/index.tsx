import bannerHeroImage from "./assets/banner-hero.svg";
import Image from "next/image";

export function BannerHero() {
  return (
    <div className="relative">
      <Image
        alt="Banner Image"
        src={bannerHeroImage}
        className="object-cover h-[200px] sm:h-auto w-full"
        sizes="100vw"
        priority
        quality={100}
      />
    </div>
  );
}

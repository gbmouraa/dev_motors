import bannerHeroImage from "./assets/banner-hero.svg";
import Image from "next/image";

export function BannerHero() {
  return (
    <div className="relative h-[200px] sm:h-[320px] w-full">
      <Image
        alt="Banner Image"
        src={bannerHeroImage}
        className="object-cover h-[200px] sm:h-[320px] w-full"
        fill
        priority
        quality={100}
      />
    </div>
  );
}

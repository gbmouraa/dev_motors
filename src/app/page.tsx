import { Container } from "@/components/container";
import { CarouselPlugin } from "./_components/hero-carousel";
import { InputSearchCar } from "./_components/input-search-car";
import { Categories } from "./_components/categories";

export default function Home() {
  return (
    <main className="bg-sky-50 min-h-[calc(100vh-56px)]">
      <CarouselPlugin />
      <Container>
        <section className="flex w-full flex-col items-center">
          <InputSearchCar />
          <Categories />
        </section>
        <section></section>
      </Container>
    </main>
  );
}

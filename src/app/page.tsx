import { Header } from "@/components/header";
import { Container } from "@/components/container";
import { CarouselPlugin } from "./_components/hero-carousel";
import { InputSearchCar } from "./_components/input-search-car";
import { Categories } from "./_components/categories";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[#ECEDF2] min-h-[calc(100vh-56px)]">
        <CarouselPlugin />
        <Container>
          <section className="flex w-full flex-col items-center">
            <InputSearchCar />
            <Categories />
          </section>
          <section></section>
        </Container>
      </main>
    </>
  );
}

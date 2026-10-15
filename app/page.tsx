import Header from "../components/Header";
import Hero from "../components/Hero";
import Freshness from "../components/Freshness";
import Catalog from "../components/Catalog";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Freshness />
        <Catalog />
      </main>
    </div>
  );
}
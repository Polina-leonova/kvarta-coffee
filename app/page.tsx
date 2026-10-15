import Header from "../components/Header";
import Hero from "../components/Hero";
import Freshness from "../components/Freshness";
import Catalog from "../components/Catalog";
import Subscription from "../components/Subscription";
import LocationDelivery from "../components/LocationDelivery";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Freshness />
        <Catalog />
        <Subscription />
        <LocationDelivery />
      </main>
    </div>
  );
}
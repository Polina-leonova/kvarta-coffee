"use client";

import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Freshness from "../components/Freshness";
import Catalog from "../components/Catalog";
import Subscription from "../components/Subscription";
import LocationDelivery from "../components/LocationDelivery";
import OrderForm from "../components/OrderForm";
import Footer from "../components/Footer";
import CoffeeQuiz from "../components/CoffeeQuiz";

export default function Home() {
  const [selectedInterest, setSelectedInterest] = useState<string>("single");
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleSelectProduct = (productName: string) => {
    setSelectedInterest(`single: ${productName}#${Date.now()}`);
  };

  const handleSelectSubscription = () => {
    setSelectedInterest(`subscription#${Date.now()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Freshness />
        <Catalog
          onSelectProduct={handleSelectProduct}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />
        <Subscription onSelectSubscription={handleSelectSubscription} />
        <LocationDelivery />
        <OrderForm initialInterest={selectedInterest} />
      </main>
      <Footer />

      <CoffeeQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}
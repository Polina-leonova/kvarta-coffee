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

export default function Home() {
  const [selectedInterest, setSelectedInterest] = useState<string>("single");

  const handleSelectProduct = (productName: string) => {
    setSelectedInterest(`single: ${productName}`);
  };

  const handleSelectSubscription = () => {
    setSelectedInterest("subscription");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Freshness />
        <Catalog onSelectProduct={handleSelectProduct} />
        <Subscription onSelectSubscription={handleSelectSubscription} />
        <LocationDelivery />
        <OrderForm initialInterest={selectedInterest} />
      </main>
      <Footer />
    </div>
  );
}
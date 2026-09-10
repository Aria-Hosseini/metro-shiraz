"use client";

import { useState } from "react";

import Map from "@/components/map/Map";
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";
import SearchBar from "./layouts/Searchbar";

type Station = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export default function Home() {
  const [selectedStation, setSelectedStation] =
    useState<Station | null>(null);

  return (
    <div className="flex min-h-screen justify-center bg-zinc-100">
      <main className="relative flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-white">

        <Header selectedStation={selectedStation} />

        <div className="relative min-h-0 flex-1">
          <Map onStationClick={setSelectedStation} />
        </div>

        <SearchBar />

        <Navbar />

      </main>
    </div>
  );
}
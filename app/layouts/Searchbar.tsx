"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

import stations from "@/data/stations.json";

export type Station = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type MetroLine = {
  id: number;
  name: string;
  color: string;
  stations: Station[];
};

type StationsData = {
  lines: MetroLine[];
};

type SearchBarProps = {
  onSelectStation: (station: Station) => void;
};

const metroData = stations as StationsData;

export default function SearchBar({
  onSelectStation,
}: SearchBarProps) {
  const [search, setSearch] = useState("");

  const normalizeText = (text: string) => {
    return text
      .trim()
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .toLowerCase();
  };

  const allStations = metroData.lines.flatMap((line) => line.stations);

  const filteredStations = allStations.filter((station) =>
    normalizeText(station.name).includes(normalizeText(search)),
  );

  const handleSelectStation = (station: Station) => {
    setSearch(station.name);

    onSelectStation(station);
  };

  return (
    <div className="relative flex h-12 w-full items-center justify-center border-t-2 border-zinc-400 bg-zinc-200 px-3">
      <InputGroup
        dir="rtl"
        className="border-zinc-200 bg-white shadow-sm"
      >
        <InputGroupInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی ایستگاه..."
          className="text-zinc-800 placeholder:text-zinc-400"
        />

        <InputGroupAddon className="text-zinc-500">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      {search.length > 0 && (
        <div className="absolute bottom-full right-3 left-3 z-50 mb-2 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg">
          {filteredStations.length > 0 ? (
            <ul>
              {filteredStations.map((station) => (
                <li
                  key={station.id}
                  className="cursor-pointer border-b border-zinc-100 px-4 py-3 text-right last:border-none hover:bg-zinc-100"
                  onMouseDown={() => handleSelectStation(station)}
                >
                  <div className="text-sm font-medium text-zinc-800">
                    {station.name}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-right text-sm text-zinc-500">
              ایستگاهی پیدا نشد
            </div>
          )}
        </div>
      )}
    </div>
  );
}
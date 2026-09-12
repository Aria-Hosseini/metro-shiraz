"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

import metroData from "@/data/stations.json";

type Station = {
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

type MapProps = {
  onStationClick: (station: Station) => void;
  selectedStation: Station | null;
};

const createStationIcon = (
  L: typeof import("leaflet"),
  color: string,
) => {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 14px;
        height: 14px;
        background: #ffffff;
        border: 3px solid ${color || "#0066cc"};
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
};

export default function Map({
  onStationClick,
  selectedStation,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    let map: L.Map | null = null;

    const initMap = async () => {
      const L = await import("leaflet");

      if (!mapContainer.current || mapRef.current) return;

      map = L.map(mapContainer.current, {
        center: [29.5918, 52.5311],
        zoom: 13,
      });

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        },
      ).addTo(map);

      const lines = metroData.lines as MetroLine[];

      lines.forEach((line) => {
        const linePoints: [number, number][] =
          line.stations.map((station) => [
            station.lat,
            station.lng,
          ]);

        L.polyline(linePoints, {
          color: line.color || "#0066cc",
          weight: 4,
          opacity: 0.85,
        }).addTo(map!);

        line.stations.forEach((station) => {
          const stationIcon = createStationIcon(
            L,
            line.color,
          );

          L.marker(
            [station.lat, station.lng],
            {
              icon: stationIcon,
            },
          )
            .addTo(map!)
            .on("click", () => {
              onStationClick(station);
            });
        });
      });

      const allStations = lines.flatMap(
        (line) => line.stations,
      );

      const allPoints: [number, number][] =
        allStations.map((station) => [
          station.lat,
          station.lng,
        ]);

      if (allPoints.length > 0) {
        const bounds = L.latLngBounds(allPoints);

        map.fitBounds(bounds, {
          padding: [30, 30],
        });
      }

      mapRef.current = map;

      setTimeout(() => {
        map?.invalidateSize();
      }, 200);
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
        map = null;
      }

      mapRef.current = null;
    };
  }, [onStationClick]);

  useEffect(() => {
    if (!selectedStation || !mapRef.current) return;

    mapRef.current.flyTo(
      [selectedStation.lat, selectedStation.lng],
      17,
      {
        animate: true,
        duration: 1.5,
      },
    );
  }, [selectedStation]);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
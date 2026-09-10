"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";

type Station = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type HeaderProps = {
  selectedStation: Station | null;
};

export default function Header({ selectedStation }: HeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedStation) {
      setOpen(true);
    }
  }, [selectedStation]);

  return (
    <div className="flex h-12 w-full items-center justify-between border-b bg-white px-3">
      <Drawer
        open={open}
        onOpenChange={setOpen}
        swipeDirection="down"
      >
        <DrawerTrigger
          render={
            <button
              type="button"
              className="rounded-md p-2 hover:bg-zinc-100"
            />
          }
        >
          <Menu className="size-6" />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {selectedStation?.name ?? "متروی شیراز"}
            </DrawerTitle>
          </DrawerHeader>

          {selectedStation && (
            <div className="space-y-4 p-4 text-right">
              <div>
                <p className="text-sm text-zinc-500">
                  نام ایستگاه
                </p>

                <p className="font-medium">
                  {selectedStation.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  مختصات
                </p>

                <p className="text-sm">
                  {selectedStation.lat}, {selectedStation.lng}
                </p>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      <h1 className="text-sm font-semibold">
        متروی شیراز
      </h1>
    </div>
  );
}
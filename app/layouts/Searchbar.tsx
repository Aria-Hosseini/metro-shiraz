import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex h-12 w-full items-center justify-center px-3 bg-zinc-200 border-t-2 border-zinc-400">
      <InputGroup
        dir="rtl"
        className="border-zinc-200 bg-white shadow-sm"
      >
        <InputGroupInput
          placeholder="جستجوی ایستگاه..."
          className="text-zinc-800 placeholder:text-zinc-400"
        />

        <InputGroupAddon className="text-zinc-500">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
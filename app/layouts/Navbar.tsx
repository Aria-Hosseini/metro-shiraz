import { LiaMapMarkedSolid } from "react-icons/lia";
import { PiInfoBold } from "react-icons/pi";
import { TbSettings } from "react-icons/tb";

export default function Navbar() {
  const items = [
    {
      id: 1,
      title: "نقشه",
      icon: <LiaMapMarkedSolid />,
    },
    {
      id: 2,
      title: "تنظیمات",
      icon: <TbSettings />,
    },
    {
      id: 3,
      title: "درباره",
      icon: <PiInfoBold />,
    },
  ];

  return (
    <nav className="flex h-16 w-full items-center justify-around border-t-2 border-zinc-300 bg-white shadow-sm">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex h-full flex-1 items-center justify-center"
        >
          <button
            className="
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              gap-1
              text-zinc-500
              transition-colors
              hover:text-zinc-800
              active:text-zinc-900
            "
          >
            <span className="text-2xl">{item.icon}</span>

            <span className="text-xs font-medium">{item.title}</span>
          </button>
        </div>
      ))}
    </nav>
  );
}

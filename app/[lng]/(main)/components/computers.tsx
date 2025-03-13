import { useTranslation } from "@/i18n/client";
import { Cctv, Cpu, MemoryStick, Thermometer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

// Interfaces remain unchanged
interface CategoryType {
  description_ru: string;
  description_uz: string;
  id: number;
  name_uz: string;
  name_ru: string;
  type: string;
}

interface ComputersTypes {
  item: {
    id: number;
    fps: string;
    brand: { id: number; name: "HP" };
    category: CategoryType;
    cooler: string;
    description_ru: string;
    description_uz: string;
    image: string;
    memory: string;
    monitor: number;
    name_ru: string;
    name_uz: string;
    price_usd: string;
    price_uzs: string;
    processor: string;
    resolution: string;
    videocard: string;
  };
  lng: string;
}

const Computers = ({ item, lng }: ComputersTypes) => {
  const { t } = useTranslation(lng);
  const router = useRouter();
  const onNavigateProduct = (query: number) => {
    router.push(`/category/${query}`);
  };

  return (
    <div className="bg-[#1E1E1E] p-6 flex flex-col space-y-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <Image
        src={item.image}
        alt={item.name_ru}
        width={200}
        height={200}
        className="mx-auto h-48 w-full object-contain rounded-lg"
      />
      <div className="flex items-center justify-between border-b border-gray-600 pb-4">
        <span className="font-sans bg-[#D3176D] text-white px-3 py-1 rounded-full text-sm font-medium transition-transform hover:scale-105">
          {item.monitor} {t("compyutercomplection")}
        </span>
        <div className="flex flex-col items-end">
          <button className="px-3 py-1.5 border border-[#D3176D] text-white text-sm rounded-md hover:bg-[#D3176D]/10 transition-colors">
            {item.price_uzs} {lng == "uz" ? "Sum" : "Сум"}
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-[#D3176D] font-semibold text-lg">{t("optimal")}</p>
        <p className="text-gray-400 text-sm">{t("balancedpk")}</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-white">
          <Cpu className="w-5 h-5 text-[#D3176D]" />
          <div>
            <p className="text-xs text-gray-500">{t("processor")}</p>
            <p className="text-sm font-medium">{item.processor}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-white">
          <MemoryStick className="w-5 h-5 text-[#D3176D]" />
          <div>
            <p className="text-xs text-gray-500">{t("videocard")}</p>
            <p className="text-sm font-medium">{item.videocard}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-white">
          <Thermometer className="w-5 h-5 text-[#D3176D]" />
          <div>
            <p className="text-xs text-gray-500">{t("cooler")}</p>
            <p className="text-sm font-medium">{item.cooler}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-white">
          <Cctv className="w-5 h-5 text-[#D3176D]" />
          <div>
            <p className="text-xs text-gray-500">{t("memory")}</p>
            <p className="text-sm font-medium">{item.memory}</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 pt-2">
        <Link href={`/desktops/${item.id}`}>
          <button className="flex-1 px-4 py-2 border border-gray-600 text-white text-sm rounded-md hover:bg-gray-700 hover:border-gray-500 transition-colors">
            {t("more")}
          </button>
        </Link>
        <button
          className="flex-1 px-4 py-2 border border-[#D3176D] text-[#D3176D] text-sm rounded-md hover:bg-[#D3176D] hover:text-white transition-all duration-200"
          onClick={() => onNavigateProduct(item.id)}
        >
          {t("buy")}
        </button>
      </div>
    </div>
  );
};

export default Computers;

import { Cctv, Cpu, MemoryStick, Thermometer } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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
    brand: {
      id: number;
      name: "HP";
    };
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
}

const Computers = ({ item }: ComputersTypes) => {
  const router = useRouter();
  const onNavigateProduct = (query: number) => {
    router.push(`/category/${query}`);
  };
  return (
    <div className="bg-[#1E1E1E] pt-16 flex flex-col justify-between space-y-6 px-5 pb-10  shadow-xl rounded-xl">
      <Image
        src={item.image}
        alt={item.name_ru}
        width={200}
        height={200}
        className="mx-auto h-1/3 object-cover"
      />
      <div className="flex items-center  justify-between border-b-2 pb-4 border-gray-500">
        <p className="font-sans bg-[#D3176D] px-2 py-1 rounded-full cursor-pointer">
          {item.monitor} комплекции
        </p>
        <div className="flex flex-col items-end space-y-2">
          <button className="px-1 py-2 border text-sm border-[#D3176D]">
            от {item.price_uzs} Сум
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-[#D3176D]">Оптимальные</p>
        <p className="text-xs">Сбалансированные игровые ПК</p>
      </div>
      <div className="flex items-center space-x-2">
        <Cpu />
        <div>
          <p className="text-[10px] text-slate-500">Процессор</p>
          <p className="text-xs">{item.processor}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <MemoryStick />
        <div>
          <p className="text-[10px] text-slate-500">Видеокарты</p>
          <p className="text-xs">{item.videocard}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Thermometer />
        <div>
          <p className="text-[10px] text-slate-500">Охлаждение</p>
          <p className="text-xs">{item.cooler}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Cctv />
        <div>
          <p className="text-[10px] text-slate-500">Память</p>
          <p className="text-xs">{item.memory}</p>
        </div>
      </div>
      <div className="flex space-x-5">
        <button
          className="px-5 py-1 border  text-sm"
          onClick={() => router.push(`/desktops/${item.id}`)}
        >
          Подробнее
        </button>
        <button
          className="px-5 py-1 border border-[#D3176D] text-sm"
          onClick={() => onNavigateProduct(item.id)}
        >
          Купить
        </button>
      </div>
    </div>
  );
};

export default Computers;

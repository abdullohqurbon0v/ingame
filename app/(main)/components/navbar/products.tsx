"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

const categories = [
  {
    key: "gaming",
    title: "Игровые ПК",
    subtitle: "Лучшее времяпрепровождение",
  },
  { key: "laptops", title: "Ноутбуки", subtitle: "Лучшее времяпрепровождение" },
  {
    key: "accessories",
    title: "Аксессуары",
    subtitle: "Лучшее времяпрепровождение",
  },
  {
    key: "headsets",
    title: "Гарнитуры",
    subtitle: "Лучшее времяпрепровождение",
  },
  {
    key: "furniture",
    title: "Столы, кресла",
    subtitle: "Лучшее времяпрепровождение",
  },
  {
    key: "parts",
    title: "Комплектующие",
    subtitle: "Лучшее времяпрепровождение",
  },
];

const subcategories: Record<
  string,
  { title: string; subtitle: string; active?: boolean }[]
> = {
  gaming: [
    { title: "Оптимальные", subtitle: "Лучшее времяпрепровождение" },
    { title: "Мощные", subtitle: "Лучшее времяпрепровождение" },
    {
      title: "Кастомные",
      subtitle: "Лучшее времяпрепровождение",
      active: true,
    },
    { title: "Специальные", subtitle: "Лучшее времяпрепровождение" },
  ],
  laptops: [
    { title: "Для учёбы", subtitle: "Универсальные решения" },
    { title: "Игровые ноутбуки", subtitle: "Максимальная производительность" },
    { title: "Бюджетные", subtitle: "Доступные и надёжные" },
    { title: "Премиум", subtitle: "Топовые модели" },
  ],
  accessories: [
    { title: "Коврики", subtitle: "Уверенное скольжение" },
    { title: "Подставки", subtitle: "Удобство и эргономика" },
    { title: "Освещение", subtitle: "Геймерская атмосфера" },
    { title: "Адаптеры", subtitle: "Совместимость с любым устройством" },
  ],
  headsets: [
    { title: "С микрофоном", subtitle: "Общение без помех" },
    { title: "Игровые", subtitle: "Погружение в игру" },
    { title: "Беспроводные", subtitle: "Свобода движения" },
    { title: "Проводные", subtitle: "Максимальное качество звука" },
  ],
  furniture: [
    { title: "Геймерские кресла", subtitle: "Удобство на весь день" },
    { title: "Столы с LED", subtitle: "Стиль и функциональность" },
    { title: "Регулируемые столы", subtitle: "Работа стоя или сидя" },
    { title: "Аксессуары", subtitle: "Держатели, подставки" },
  ],
  parts: [
    { title: "Процессоры", subtitle: "Сердце системы" },
    { title: "Видеокарты", subtitle: "Мощность для игр" },
    { title: "ОЗУ", subtitle: "Скорость и многозадачность" },
    { title: "Хранение", subtitle: "SSD, HDD и не только" },
  ],
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("gaming");
  const router = useRouter();

  const handleNavigate = (categoryKey: string, subTitle: string) => {
    const subSlug = subTitle.toLowerCase().replace(/\s+/g, "-");
    router.push(`/category/${subSlug}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Продукция</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="p-0 w-[640px] bg-[#111] text-white rounded-lg border border-neutral-800 shadow-xl overflow-hidden"
      >
        <div className="flex divide-x divide-neutral-800">
          <div className="w-1/2 bg-[#0b0b0b]">
            {categories.map((cat) => (
              <div
                key={cat.key}
                onMouseEnter={() => setActiveCategory(cat.key)}
                className={clsx(
                  "px-5 py-3 cursor-pointer hover:bg-neutral-800 transition",
                  activeCategory === cat.key &&
                    "bg-neutral-900 border-l-4 border-pink-600"
                )}
              >
                <div
                  className={clsx(
                    "font-semibold",
                    activeCategory === cat.key ? "text-pink-500" : "text-white"
                  )}
                >
                  {cat.title}
                </div>
                <div className="text-xs text-gray-400">{cat.subtitle}</div>
              </div>
            ))}
          </div>

          <div className="w-1/2 p-4 space-y-1">
            {subcategories[activeCategory]?.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleNavigate(activeCategory, item.title)}
                className={clsx(
                  "flex justify-between items-center p-2 rounded hover:bg-neutral-800 transition cursor-pointer",
                  item.active && "text-pink-500"
                )}
              >
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-gray-400">{item.subtitle}</div>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            ))}

            <button
              onClick={() => router.push(`/category/${activeCategory}`)}
              className="mt-4 w-full bg-white text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
            >
              Посмотреть все в наличии
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Products;

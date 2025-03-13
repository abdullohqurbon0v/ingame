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

interface SubcategoryItem {
  title: string;
  subtitle: string;
  active?: boolean;
}
interface Subcategories {
  [category: string]: {
    ru: SubcategoryItem[];
    uz: SubcategoryItem[];
  };
}
const categories: Record<
  "ru" | "uz",
  { key: string; title: string; subtitle: string }[]
> = {
  ru: [
    {
      key: "gaming",
      title: "Игровые ПК",
      subtitle: "Лучшее времяпрепровождение",
    },
    {
      key: "laptops",
      title: "Ноутбуки",
      subtitle: "Лучшее времяпрепровождение",
    },
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
  ],
  uz: [
    {
      key: "gaming",
      title: "O'yin kompyuterlari",
      subtitle: "Eng yaxshi vaqt o'tkazish",
    },
    {
      key: "laptops",
      title: "Noutbuklar",
      subtitle: "Eng yaxshi vaqt o'tkazish",
    },
    {
      key: "accessories",
      title: "Aksessuarlar",
      subtitle: "Eng yaxshi vaqt o'tkazish",
    },
    {
      key: "headsets",
      title: "Garnituralar",
      subtitle: "Eng yaxshi vaqt o'tkazish",
    },
    {
      key: "furniture",
      title: "Stollar, kreslolar",
      subtitle: "Eng yaxshi vaqt o'tkazish",
    },
    {
      key: "parts",
      title: "Komponentlar",
      subtitle: "Eng yaxshi vaqt o'tkazish",
    },
  ],
};

// Subcategories with translations
const subcategories: Subcategories = {
  gaming: {
    ru: [
      { title: "Оптимальные", subtitle: "Лучшее времяпрепровождение" },
      { title: "Мощные", subtitle: "Лучшее времяпрепровождение" },
      {
        title: "Кастомные",
        subtitle: "Лучшее времяпрепровождение",
        active: true,
      },
      { title: "Специальные", subtitle: "Лучшее времяпрепровождение" },
    ],
    uz: [
      { title: "Optimal", subtitle: "Eng yaxshi vaqt o'tkazish" },
      { title: "Kuchli", subtitle: "Eng yaxshi vaqt o'tkazish" },
      { title: "Maxsus", subtitle: "Eng yaxshi vaqt o'tkazish", active: true },
      { title: "Alohida", subtitle: "Eng yaxshi vaqt o'tkazish" },
    ],
  },
  laptops: {
    ru: [
      { title: "Для учёбы", subtitle: "Универсальные решения" },
      {
        title: "Игровые ноутбуки",
        subtitle: "Максимальная производительность",
      },
      { title: "Бюджетные", subtitle: "Доступные и надёжные" },
      { title: "Премиум", subtitle: "Топовые модели" },
    ],
    uz: [
      { title: "O'qish uchun", subtitle: "Universal yechimlar" },
      { title: "O'yin noutbuklari", subtitle: "Maksimal unumdorlik" },
      { title: "Byudjet", subtitle: "Arzon va ishonchli" },
      { title: "Premium", subtitle: "Eng yuqori modellar" },
    ],
  },
  accessories: {
    ru: [
      { title: "Коврики", subtitle: "Уверенное скольжение" },
      { title: "Подставки", subtitle: "Удобство и эргономика" },
      { title: "Освещение", subtitle: "Геймерская атмосфера" },
      { title: "Адаптеры", subtitle: "Совместимость с любым устройством" },
    ],
    uz: [
      { title: "Gilamchalar", subtitle: "Ishonchli sirpanish" },
      { title: "Stendlar", subtitle: "Qulaylik va ergonomika" },
      { title: "Yoritish", subtitle: "Geymer muhiti" },
      { title: "Adapterlar", subtitle: "Har qanday qurilma bilan moslik" },
    ],
  },
  headsets: {
    ru: [
      { title: "С микрофоном", subtitle: "Общение без помех" },
      { title: "Игровые", subtitle: "Погружение в игру" },
      { title: "Беспроводные", subtitle: "Свобода движения" },
      { title: "Проводные", subtitle: "Максимальное качество звука" },
    ],
    uz: [
      { title: "Mikrofonli", subtitle: "To'siqsiz muloqot" },
      { title: "O'yin uchun", subtitle: "O'yinga sho'ng'ish" },
      { title: "Simsiz", subtitle: "Harakatlanish erkinligi" },
      { title: "Simli", subtitle: "Maksimal ovoz sifati" },
    ],
  },
  furniture: {
    ru: [
      { title: "Геймерские кресла", subtitle: "Удобство на весь день" },
      { title: "Столы с LED", subtitle: "Стиль и функциональность" },
      { title: "Регулируемые столы", subtitle: "Работа стоя или сидя" },
      { title: "Аксессуары", subtitle: "Держатели, подставки" },
    ],
    uz: [
      { title: "Geymer kreslolari", subtitle: "Kun bo'yi qulaylik" },
      { title: "LEDli stollar", subtitle: "Uslub va funksionallik" },
      { title: "Sozlanadigan stollar", subtitle: "Tik yoki o'tirib ishlash" },
      { title: "Aksessuarlar", subtitle: "Ushlagichlar, stendlar" },
    ],
  },
  parts: {
    ru: [
      { title: "Процессоры", subtitle: "Сердце системы" },
      { title: "Видеокарты", subtitle: "Мощность для игр" },
      { title: "ОЗУ", subtitle: "Скорость и многозадачность" },
      { title: "Хранение", subtitle: "SSD, HDD и не только" },
    ],
    uz: [
      { title: "Protsessorlar", subtitle: "Tizimning yuragi" },
      { title: "Videokartalar", subtitle: "O'yinlar uchun quvvat" },
      { title: "Operativ xotira", subtitle: "Tezlik va ko'p vazifalilik" },
      { title: "Saqlash", subtitle: "SSD, HDD va boshqalar" },
    ],
  },
};

const Products = ({ lang }: { lang: string }) => {
  const [activeCategory, setActiveCategory] = useState("gaming");
  const router = useRouter();

  const handleNavigate = (categoryKey: string, subTitle: string) => {
    const subSlug = subTitle.toLowerCase().replace(/\s+/g, "-");
    router.push(`/category/${subSlug}`);
  };
  const currentCategories = categories[lang as "ru" | "uz"] || categories.ru;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hidden sm:block">
          {lang === "uz" ? "Mahsulotlar" : "Продукция"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="p-0 w-[640px] bg-[#111] text-white rounded-lg border border-neutral-800 shadow-xl overflow-hidden"
      >
        <div className="flex divide-x divide-neutral-800">
          <div className="w-1/2 bg-[#0b0b0b]">
            {currentCategories.map((cat) => (
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
            {subcategories[activeCategory]?.[lang as "ru" | "uz"]?.map(
              (item, idx) => (
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
              )
            )}

            <button
              onClick={() => router.push(`/category/${activeCategory}`)}
              className="mt-4 w-full bg-white text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
            >
              {lang === "uz"
                ? "Hamma mavjudlarini ko'rish"
                : "Посмотреть все в наличии"}
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Products;

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import React from "react";
import clsx from "clsx";

const categories = [
  { key: "gaming", title: "Игровые ПК" },
  { key: "laptops", title: "Ноутбуки" },
  { key: "accessories", title: "Аксессуары" },
  { key: "headsets", title: "Гарнитуры" },
  { key: "furniture", title: "Столы, кресла" },
  { key: "parts", title: "Комплектующие" },
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

const ProductsAccordion = () => {
  const router = useRouter();

  const handleNavigate = (categoryKey: string, subTitle: string) => {
    const subSlug = subTitle.toLowerCase().replace(/\s+/g, "-");
    router.push(`/category/${subSlug}`);
  };

  return (
    <Accordion type="single" collapsible className="w-full text-white">
      {categories.map((cat) => (
        <AccordionItem value={cat.key} key={cat.key}>
          <AccordionTrigger className="text-left text-base font-semibold hover:text-[#D3176D] transition-colors">
            {cat.title}
          </AccordionTrigger>
          <AccordionContent className="space-y-2 px-2 pb-4">
            {subcategories[cat.key]?.map((sub, idx) => (
              <div
                key={idx}
                onClick={() => handleNavigate(cat.key, sub.title)}
                className={clsx(
                  "cursor-pointer rounded px-3 py-2 hover:bg-neutral-800 transition",
                  sub.active && "text-pink-500"
                )}
              >
                <div className="font-medium">{sub.title}</div>
                <div className="text-xs text-gray-400">{sub.subtitle}</div>
              </div>
            ))}
            <button
              onClick={() => router.push(`/category/${cat.key}`)}
              className="mt-3 w-full bg-white text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
            >
              Посмотреть все в наличии
            </button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ProductsAccordion;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { $axios } from "@/http/api";
import { DesktopType } from "@/types";
import Link from "next/link";

const comments = [
  {
    name: "имя пользователя",
    comment:
      "съешь же ещё этих мягких французских булок, да выпей чаю съешь же ещё этих мягких французских булок, д",
  },
  {
    name: "имя пользователя",
    comment:
      "съешь же ещё этих мягких французских булок, да выпей чаю съешь же ещё этих мягких французских булок, д",
  },
  {
    name: "имя пользователя",
    comment:
      "съешь же ещё этих мягких французских булок, да выпей чаю съешь же ещё этих мягких французских булок, д",
  },
];

type SingleProductPageProps = {
  id: string;
};

const SingleProductPage = ({ id }: SingleProductPageProps) => {
  const [desktops, setDesktops] = useState<DesktopType[]>([]);
  const [product, setProduct] = useState<DesktopType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await $axios.get(`/desktop/${id}`);
        setProduct(productRes.data);

        const desktopsRes = await $axios.get("/desktops");
        setDesktops(desktopsRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 font-sans bg-black min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-20">
          <Image
            src={product.image}
            alt={product.name_ru}
            width={400}
            height={400}
            className="mx-auto object-contain"
          />
          <div className="text-white flex flex-col space-y-5">
            <p className="text-2xl font-semibold">{product.name_ru}</p>
            <p>{product.description_ru}</p>
            <p className="text-xl font-bold">{product.price_uzs} Сум</p>

            <div className="flex space-x-5">
              <button className="bg-[#D3176D] border border-[#D3176D] px-5 py-1 text-sm">
                Купить
              </button>
              <button className="border border-[#D3176D] px-5 py-1 text-sm">
                В Корзину
              </button>
            </div>

            <div className="mt-10 text-white">
              <h3 className="text-2xl font-bold mb-4">Характеристики</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">Процессор:</span>
                  <span>{product.processor}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">Видеокарта:</span>
                  <span>{product.videocard}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">Оперативная память:</span>
                  <span>{product.memory}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">Охлаждение:</span>
                  <span>{product.cooler}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">Разрешение:</span>
                  <span>{product.resolution}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">FPS:</span>
                  <span>{product.fps}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">Монитор:</span>
                  <span>{product.monitor}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">Бренд:</span>
                  <span>{product.brand?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Похожие товары */}
        {desktops.length > 1 && (
          <div className="max-w-[1200px] mx-auto mt-20 text-white">
            <h2 className="text-3xl font-bold mb-8">Похожие товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {desktops
                .filter((item) => item.id !== product.id)
                .slice(0, 3)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#1E1E1E] border border-[#D3176D] rounded-lg overflow-hidden shadow-md"
                  >
                    <Image
                      src={item.image}
                      alt={item.name_ru}
                      width={400}
                      height={250}
                      className="w-full h-[250px] object-cover"
                    />
                    <div className="p-4 flex flex-col space-y-2">
                      <p className="text-lg font-semibold">{item.name_ru}</p>
                      <p className="text-pink-500 font-bold">
                        {item.price_uzs} сум
                      </p>
                      <Link href={`/desktops/${item.id}`}>
                        <button className="mt-2 self-start border border-[#D3176D] px-4 py-1 text-sm hover:bg-[#D3176D] transition">
                          Подробнее
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Отзывы */}
      <div className="max-w-[1200px] mx-auto text-white flex flex-col space-y-7">
        <h2 className="text-4xl font-bold text-center mt-16">
          Отзывы наших клиентов
        </h2>
        <p className="text-center">
          Об этом лучше всего расскажут сами наши клиенты!
        </p>
        <div className="flex flex-col md:flex-row gap-10 overflow-x-auto py-5">
          {comments.map((item, idx) => (
            <div
              className="border border-[#D3176D] bg-[#1E1E1E] rounded-lg py-5 px-8 w-full md:w-[400px] flex flex-col space-y-4 shadow-md"
              key={idx}
            >
              <div className="flex items-center space-x-3">
                <div className="border-4 border-[#D3176D] p-3 rounded-full">
                  <User size={30} className="text-white" />
                </div>
                <p className="font-semibold text-lg">{item.name}</p>
              </div>
              <p className="text-gray-300">{item.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;

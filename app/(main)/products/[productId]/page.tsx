"use client";

import Image from "next/image";
import { $axios } from "@/http/api";
import { useEffect, useState } from "react";

export interface ProductsType {
  description_ru: string;
  description_uz: string;
  image: string;
  id: string;
  name_uz: string;
  name_ru: string;
  price_usd: string;
  price_uzs: string;
  slug: string;
}

const SingleProductPage = ({ params }: Promise<{ productId: string }>) => {
  const [product, setProduct] = useState<ProductsType | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const id = (await params).productId;
        console.log(id);
        const res = await $axios.get(`/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке товара:", err);
      }
    };
    getProduct();
  }, [params]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Товар не найден
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-white mt-16 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex gap-4">
          <div className="relative w-full h-[400px] bg-[#1a1a1a] rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name_ru}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name_ru}</h1>
          <p className="text-gray-400 mt-1">Название модели</p>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-1 text-pink-500 text-lg">★★★★☆</div>
            <span className="text-sm text-gray-400">(1323 отзыва)</span>
          </div>

          <p className="text-3xl font-bold text-white mt-4">
            {parseInt(product.price_uzs).toLocaleString("ru-RU")} сум
          </p>

          <p className="mt-4 text-gray-300 leading-relaxed max-w-xl">
            {product.description_ru}
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-bold transition">
              Купить
            </button>
            <button className="border border-pink-500 px-6 py-3 rounded-lg text-white hover:bg-pink-600 transition">
              В корзину
            </button>
          </div>

          <div className="flex gap-4 mt-4 text-sm text-gray-400">
            <span>🚚 Доставка</span>
            <span>❓ Нужна помощь?</span>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Похожие товары</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] p-4 rounded-xl text-center hover:shadow-lg transition"
            >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={product.image}
                  alt="similar product"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white font-semibold">Название</p>
              <p className="text-pink-500 font-bold">4 500 000 сум</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type CartItemType = {
  image: string;
  title: string;
  details: string;
  availability: string;
  quantity: number;
  price: string;
};

const OrderPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        setCartItems(parsed);
      } catch (e) {
        console.error("Ошибка при парсинге корзины:", e);
      }
    }
  }, []);

  const formatPrice = (price: number) =>
    price.toLocaleString("ru-RU").replace(/,/g, " ");

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNum = parseInt(item.price?.replace(/\s/g, "") || "0");
    return acc + priceNum * item.quantity;
  }, 0);

  return (
    <div className="max-w-[1200px] min-h-screen mt-16 mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-8">Оформить заказ</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Форма заказа */}
        <div className="lg:col-span-2 space-y-6">
          <input
            type="text"
            placeholder="Ф.И.О *"
            className="w-full p-3 bg-[#222] rounded-lg outline-none"
          />
          <input
            type="text"
            placeholder="Номер телефона *"
            className="w-full p-3 bg-[#222] rounded-lg outline-none"
          />

          <input
            type="text"
            placeholder="Адрес доставки *"
            className="w-full p-3 bg-[#222] rounded-lg outline-none"
          />

          <div className="text-sm text-gray-400 leading-relaxed">
            <p>• Доставка в течение 1 дня бесплатная.</p>
            <p>• По городу Ташкент доставка до локации.</p>
            <p>• Мебель — 100.000 сум по ТКАД.</p>
            <p>• В регионы — экспресс-почтой BTS или Fargo.</p>
          </div>

          <textarea
            rows={4}
            placeholder="Комментарий к заказу"
            className="w-full p-3 bg-[#222] rounded-lg outline-none"
          />

          <button className="bg-pink-500 w-full py-4 rounded-lg font-bold text-lg">
            Оформить заказ
          </button>
        </div>
        <div className="bg-[#111] p-6 rounded-2xl">
          <div className="border border-pink-500 p-4 rounded-xl mb-6 text-sm">
            <p>
              Товаров: <strong>{totalItems}</strong>
            </p>
            <p>
              Итого:{" "}
              <strong className="text-pink-500 text-lg">
                {formatPrice(totalPrice)} сум
              </strong>
            </p>
          </div>

          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#1c1c1c] p-3 rounded-lg"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="rounded-lg border border-neutral-700 object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-gray-400">
                    Кол-во: {item.quantity}
                  </p>
                  <p className="text-sm font-medium">{item.price} сум/мес</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

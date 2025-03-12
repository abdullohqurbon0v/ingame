"use client";

import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

type CartItemType = {
  image: string;
  title: string;
  details: string;
  availability: string;
  quantity: number;
  price: string;
};

type CartItemProps = {
  item: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg mb-4">
      <div className="flex items-center gap-4">
        <Image
          src={item.image}
          alt={item.title}
          width={64}
          height={64}
          className="rounded-lg object-cover"
        />
        <div>
          <h2 className="text-white font-bold">{item.title}</h2>
          <p className="text-gray-400 text-sm">{item.details}</p>
          <p className="text-pink-400 text-sm">{item.availability}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-gray-700 text-white px-2 py-1 rounded">-</button>
        <span className="text-white">{item.quantity}</span>
        <button className="bg-gray-700 text-white px-2 py-1 rounded">+</button>
      </div>
      <p className="text-white whitespace-nowrap">{item.price} сум/мес</p>
      <button className="text-red-500">
        <Trash size={20} />
      </button>
    </div>
  );
};

const CartPage: React.FC = () => {
  const cartItems: CartItemType[] = [
    {
      image: "https://via.placeholder.com/60",
      title: "Название товара",
      details: "Доп. данные",
      availability: "Заказ 4-7 дней",
      quantity: 1,
      price: "2 343 444",
    },
    {
      image: "https://via.placeholder.com/60",
      title: "Название товара",
      details: "Доп. данные",
      availability: "Заказ 4-7 дней",
      quantity: 1,
      price: "2 343 444",
    },
    {
      image: "https://via.placeholder.com/60",
      title: "Название товара",
      details: "Доп. данные",
      availability: "Заказ 4-7 дней",
      quantity: 1,
      price: "2 343 444",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto mt-16">
      <div className="bg-black min-h-screen p-10 text-white">
        <div>
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 p-4 bg-gray-800 rounded-lg">
          <input
            type="text"
            placeholder="Промокод"
            className="p-2 bg-gray-700 rounded text-white w-1/3"
          />
          <button className="bg-pink-500 px-4 py-2 rounded">Применить</button>
        </div>
        <div className="mt-6 p-4 bg-gray-800 rounded-lg flex justify-between items-center">
          <p className="text-xl">
            Итого:{" "}
            <span className="font-bold text-pink-400">22 343 444 сум</span>
          </p>
          <button className="bg-pink-500 px-6 py-2 rounded text-white font-bold">
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

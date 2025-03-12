"use client";

import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 bg-[#1a1a1a] p-5 rounded-xl mb-5 shadow-md hover:shadow-pink-500/10 transition-shadow">
      <div className="flex items-center gap-5 flex-1 min-w-[200px]">
        <Image
          src={item.image}
          alt={item.title}
          width={72}
          height={72}
          className="rounded-xl hidden sm:block object-cover border border-neutral-700"
        />
        <div>
          <h2 className="text-white font-semibold text-lg">{item.title}</h2>
          <p className="text-gray-400 text-sm">{item.details}</p>
          <p className="text-pink-500 text-sm font-medium">
            {item.availability}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center sm:justify-end gap-4 w-full sm:w-auto">
        <button
          onClick={onDecrease}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-white"
        >
          -
        </button>
        <span className="text-white">{item.quantity}</span>
        <button
          onClick={onIncrease}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-white"
        >
          +
        </button>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-4 w-full sm:w-auto">
        <p className="text-white font-semibold whitespace-nowrap">
          {item.price} сум/мес
        </p>
        <button onClick={onRemove} className="text-red-500 hover:text-red-400">
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

const CartPage: React.FC = () => {
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

  const increaseQuantity = (index: number) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    setCartItems(updated);
  };

  const decreaseQuantity = (index: number) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setCartItems(updated);
    }
  };

  const removeItem = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const total = cartItems.reduce((acc, item) => {
    const priceNum = parseInt(item.price?.replace(/\s/g, "") || "0");
    return acc + priceNum * item.quantity;
  }, 0);

  const formatPrice = (price: number) =>
    price.toLocaleString("ru-RU").replace(/,/g, " ");

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-16 pt-10">
      <h1 className="text-3xl font-bold text-white mb-8">Корзина</h1>
      <div className="bg-black min-h-screen p-6 sm:p-10 rounded-2xl shadow-inner">
        {cartItems.length === 0 ? (
          <p className="text-gray-400 text-center text-xl">
            Ваша корзина пуста
          </p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onIncrease={() => increaseQuantity(index)}
                onDecrease={() => decreaseQuantity(index)}
                onRemove={() => removeItem(index)}
              />
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 p-4 bg-[#222] rounded-xl gap-4">
              <input
                type="text"
                placeholder="Введите промокод"
                className="p-3 bg-gray-800 rounded-lg text-white w-full sm:w-1/2"
              />
              <button className="bg-pink-500 hover:bg-pink-600 px-5 py-3 rounded-lg text-white font-semibold transition">
                Применить
              </button>
            </div>

            <div className="mt-8 p-6 bg-[#2a2a2a] rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-2xl font-semibold">
                Итого:{" "}
                <span className="text-pink-500 font-bold">
                  {formatPrice(total)} сум
                </span>
              </p>
              <Link href={"/registration"}>
                <button className="bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-full text-lg font-bold text-white transition shadow-lg">
                  Оформить заказ
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;

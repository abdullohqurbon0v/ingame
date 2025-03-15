"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useTranslation } from "@/i18n/client";
import { useParams, useRouter } from "next/navigation";
import { $axios } from "@/http/api";
import { toast } from "sonner";

type CartItemType = {
  image: string;
  title: string;
  details: string;
  availability: string;
  quantity: number;
  price_usd: string;
  price_uzs: string;
};

const OrderPage: React.FC = () => {
  const { lng } = useParams();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [valute, setValute] = useState("");
  const router = useRouter();

  const { t } = useTranslation(lng as string);

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

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    const trimmed = numbers.slice(0, 12);

    if (trimmed.length <= 3) {
      return `+${trimmed}`;
    } else if (trimmed.length <= 5) {
      return `+${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
    } else if (trimmed.length <= 8) {
      return `+${trimmed.slice(0, 3)}-${trimmed.slice(3, 5)}-${trimmed.slice(
        5
      )}`;
    } else if (trimmed.length <= 10) {
      return `+${trimmed.slice(0, 3)}-${trimmed.slice(3, 5)}-${trimmed.slice(
        5,
        8
      )}-${trimmed.slice(8)}`;
    } else {
      return `+${trimmed.slice(0, 3)}-${trimmed.slice(3, 5)}-${trimmed.slice(
        5,
        8
      )}-${trimmed.slice(8, 10)}-${trimmed.slice(10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (!input.startsWith("+998") && input.length <= 4) {
      setPhone("+998");
      return;
    }

    const formatted = formatPhoneNumber(input);
    setPhone(formatted);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNum = parseInt(
      valute === "UZS"
        ? item.price_uzs?.replace(/\s/g, "")
        : item.price_usd?.replace(/\s/g, "") || "0"
    );
    return acc + priceNum * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !address) {
      setError("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (!/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/.test(phone)) {
      setError(
        "Пожалуйста, введите корректный номер телефона в формате +998-91-000-00-00"
      );
      return;
    }

    setLoading(true);
    setError(null);

    const orderData = {
      name: fullName,
      phone_number: phone,
      address,
      comment,
      items: cartItems.map((x) => ({
        price_usd: x.price_usd || "0",
        price_uzs: x.price_uzs.replace(/\s/g, ""),
        name_uz: x.title,
      })),
    };

    console.log(orderData);

    try {
      const response = await $axios.post("/orders/", orderData);
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        setFullName("");
        setPhone("");
        setAddress("");
        setComment("");
        setCartItems([]);
        localStorage.removeItem("cartItems");
      }
      toast(lng === "uz" ? "Malumotlar jonatildi" : "Данные были отправлены", {
        action: {
          label: lng === "uz" ? "Yopish" : "Закрыть",
          onClick: () => console.log("Undo"),
        },
      });
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Произошла ошибка при оформлении заказа"
        );
      } else {
        setError("Произошла неизвестная ошибка");
      }
      console.error("Ошибка:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedValute = localStorage.getItem("valute") || "UZS";
    setValute(storedValute);

    const handleStorageChange = () => {
      const newValute = localStorage.getItem("valute") || "UZS";
      setValute(newValute);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("valuteChange", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("valuteChange", handleStorageChange);
    };
  }, []);

  return (
    <div className="max-w-[1200px] min-h-screen mt-16 mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-8">{t("oformit")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <input
            type="text"
            placeholder="Ф.И.О *"
            className="w-full p-3 bg-[#222] rounded-lg outline-none font-mono"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="+998-91-000-00-00 *"
            className="w-full p-3 bg-[#222] rounded-lg outline-none font-mono"
            value={phone}
            onChange={handlePhoneChange}
            required
            pattern="\+998-\d{2}-\d{3}-\d{2}-\d{2}"
            maxLength={17}
          />
          <input
            type="text"
            placeholder={t("address")}
            className="w-full p-3 bg-[#222] rounded-lg outline-none font-mono"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className="text-sm text-gray-400 leading-relaxed">
            <p>{t("dostavka1")}</p>
            <p>{t("dostavka2")}</p>
            <p>{t("dostavka3")}</p>
            <p>{t("dostavka4")}</p>
          </div>

          <textarea
            rows={4}
            placeholder={t("desc")}
            className="w-full p-3 bg-[#222] rounded-lg outline-none font-mono"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`bg-pink-500 w-full py-4 rounded-lg font-bold text-lg ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600"
            }`}
          >
            {loading
              ? lng === "uz"
                ? "Jonatilmoqda"
                : lng === "ru"
                ? "отправка"
                : t("loading")
              : t("oformit")}
          </button>
        </form>

        <div className="bg-[#111] p-6 rounded-2xl">
          <div className="border border-pink-500 p-4 rounded-xl mb-6 text-sm">
            <p>
              {t("tovars")}: <strong>{totalItems}</strong>
            </p>
            <p>
              {t("total")}:{" "}
              <strong className="text-pink-500 text-lg">
                {formatPrice(totalPrice)} сум
              </strong>
            </p>
          </div>

          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center">Корзина пуста</p>
            ) : (
              cartItems.map((item, index) => (
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
                    <p className="text-sm font-medium">
                      {valute === "UZS" ? item.price_uzs : item.price_usd}{" "}
                      {valute === "UZS" ? t("sum") : "$"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductsType } from "@/types";
import { toast } from "sonner";

interface NewsTypes {
  item: {
    description_ru: string;
    description_uz: string;
    image: string;
    id: string;
    name_uz: string;
    name_ru: string;
    price_usd: string;
    price_uzs: string;
    slug: string;
    videocard: string;
    type: string;
  };
  lng: string;
}

const Product = ({ item, lng }: NewsTypes) => {
  console.log(item);
  const [valute, setValute] = useState<string>("UZS");
  const { t } = useTranslation(lng);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: string, currency: string) =>
    new Intl.NumberFormat(currency === "UZS" ? "uz-UZ" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(Number(price));

  const handleAddToCard = (item: ProductsType) => {
    if (!item) return;
    toast(lng === "uz" ? "Savatga qoshildi" : "Добавлено в корзину", {
      description: lng === "uz" ? item.name_uz : item.name_ru,
      action: {
        label: lng === "uz" ? "Yopish" : "Закрыть",
        onClick: () => console.log("Undo"),
      },
    });
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const newItem = {
      image: item.image,
      title: lng === "uz" ? item.name_uz : item.name_ru,
      details:
        (lng === "uz" ? item.description_uz : item.description_ru).slice(
          0,
          50
        ) + "...",
      availability: t("in_stock"),
      quantity: 1,
      price_usd: item.price_usd,
      price_uzs: item.price_uzs,
    };

    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const cardVariants = {
    initial: { y: 0, opacity: 1 },
    hover: {
      y: -10,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
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
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gradient-to-b from-[#1E1E1E] to-[#2A2A2A] rounded-2xl overflow-hidden
                 border border-gray-800/30 flex flex-col
                 max-w-sm mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative p-5">
        <Image
          src={item.image}
          alt={lng === "uz" ? item.name_uz : item.name_ru}
          width={200}
          height={200}
          className="mx-auto object-contain w-full h-48 rounded-xl
                     transform transition-transform duration-500 hover:scale-110"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPJ7lBKQAAAABJRU5ErkJggg=="
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl"
        >
          <span className="text-white text-sm font-semibold bg-[#D3176D]/80 px-3 py-1 rounded-full">
            {t("quick_view")}
          </span>
        </motion.div>
      </div>
      <div className="px-5 pb-5 flex flex-col flex-grow space-y-4">
        <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight">
          {lng === "uz" ? item.name_uz : item.name_ru}
        </h3>

        <div className="space-y-2">
          <p className="text-[#D3176D] text-xl font-extrabold tracking-tight">
            {valute === "UZS"
              ? formatPrice(item.price_uzs, "UZS")
              : formatPrice(item.price_usd, "USD")}
          </p>
          <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
            {lng === "uz" ? item.description_uz : item.description_ru}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <Link
            href={
              item.videocard
                ? `/${lng}/desktops/${item.id}`
                : `/${lng}/products/${item.slug}`
            }
            className="flex-1"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-2 bg-gray-800/70 text-white text-sm font-medium
                         rounded-lg border border-gray-700/50
                         hover:bg-gray-700 hover:border-[#D3176D] hover:text-[#D3176D]
                         transition-all duration-300"
            >
              {t("more")}
            </motion.button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 bg-[#D3176D]/10 text-[#D3176D]
                       hover:bg-[#D3176D] hover:text-white
                       rounded-full transition-all duration-300"
            onClick={() => handleAddToCard(item)}
          >
            <motion.div whileTap={{ scale: 0.9 }}>
              <ShoppingCart className="h-5 w-5 transition-transform duration-300" />
            </motion.div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;

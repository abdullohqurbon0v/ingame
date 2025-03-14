"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductsType } from "@/types";

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
  const [valute, setValute] = useState<string>('UZS');
  const { t } = useTranslation(lng);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: string) =>
    new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
    }).format(Number(price));

  const handleAddToCard = (item: ProductsType) => {
    if (!item) return;

    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const newItem = {
      image: item.image,
      title: lng === "uz" ? item.name_uz : item.name_ru,
      details:
        (lng === "uz" ? item.description_uz : item.description_ru).slice(0, 50) + "...",
      availability: t("in_stock"),
      quantity: 1,
      price: item.price_uzs.toString(),
    };

    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    alert(t("added_to_cart"));
  };

  const cardVariants = {
    initial: { y: 0, opacity: 1 },
    hover: {
      y: -8,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.2 },
    },
  };
  useEffect(() => {
    const storedValute = localStorage.getItem('valute') || 'UZS';
    setValute(storedValute);
  }, []);
  useEffect(() => {
    const handleStorageChange = () => {
      const storedValute = localStorage.getItem('valute') || 'UZS';
      setValute(storedValute);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gradient-to-b from-[#1E1E1E] to-[#2A2A2A] rounded-xl overflow-hidden
                 border border-gray-800/50 flex flex-col
                 max-w-sm mx-auto sm:max-w-xs md:max-w-sm lg:max-w-md"
    >
      <div className="relative p-6">
        <Image
          src={item.image}
          alt={item.name_ru}
          width={200}
          height={200}
          className="mx-auto object-contain transition-all duration-300
                    rounded-lg w-full max-h-[200px]
                    hover:scale-105 sm:max-h-[150px] sm:w-[150px]"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPJ7lBKQAAAABJRU5ErkJggg=="
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center"
        >
          <span className="text-white text-sm font-medium">
            {t("quick_view")}
          </span>
        </motion.div>
      </div>

      <div className="px-6 pb-6 flex flex-col flex-grow space-y-4">
        <h3 className="text-lg font-semibold text-white line-clamp-2 leading-tight sm:text-base md:text-lg">
          {lng === "uz" ? item.name_uz : item.name_ru}
        </h3>

        <div className="space-y-3">
          <p className="text-[#D3176D] text-xl font-bold tracking-tight sm:text-lg">
            {valute === 'UZS' ? formatPrice(item.price_uzs) : formatPrice(item.price_usd)}
          </p>
          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed sm:text-xs">
            {lng === "uz" ? item.description_uz : item.description_ru}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <Link
            href={
              item.videocard
                ? `/${lng}/desktops/${item.id}`
                : `/${lng}/products/${item.slug}`
            }
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-800/50 text-white text-sm font-medium
                        rounded-lg border border-gray-700
                        hover:bg-gray-700 hover:border-gray-600
                        transition-all duration-200 sm:px-3 sm:py-1"
            >
              {t("more")}
            </motion.button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="group h-10 w-10 bg-[#D3176D]/10 text-[#D3176D]
                      hover:bg-[#D3176D]/20 hover:text-[#D3176D]
                      rounded-full transition-all duration-200"
            asChild
          >
            <motion.div whileTap={{ scale: 0.9 }} onClick={() => handleAddToCard(item)}>
              <ShoppingCart
                className="h-5 w-5 group-hover:rotate-12
                                     transition-transform duration-200"
              />
            </motion.div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;

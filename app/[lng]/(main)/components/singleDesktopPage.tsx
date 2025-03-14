"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { $axios } from "@/http/api";
import { DesktopType } from "@/types";
import Link from "next/link";
import Loading from "./loading";
import { useTranslation } from "@/i18n/client";
import Accordions from "./accordions";

type SingleProductPageProps = {
  id: string;
  lng: string;
};

const SingleProductPage = ({ id, lng }: SingleProductPageProps) => {
  const { t } = useTranslation(lng);
  const [desktops, setDesktops] = useState<DesktopType[]>([]);
  const [product, setProduct] = useState<DesktopType>();
  const [valute, setValute] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await $axios.get(`/desktop/${id}`);
        setProduct(productRes.data);

        const desktopsRes = await $axios.get("/desktops");
        setDesktops(desktopsRes.data);
      } catch (err) {
        console.error(t("error_loading_data"), err);
      }
    };
    fetchData();
  }, [id, t]);

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

  const handleAddToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const newItem = {
      image: product.image,
      title: lng === "uz" ? product.name_uz : product.name_ru,
      details:
        (lng === "uz" ? product.description_uz : product.description_ru).slice(
          0,
          50
        ) + "...",
      availability: t("in_stock"),
      quantity: 1,
      price: product.price_uzs.toString(),
    };

    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    alert(t("added_to_cart"));
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="mt-16 font-sans bg-black min-h-screen">
      <div className="bg-[#1A1A1A] py-20">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-20">
          <Image
            src={product.image}
            alt={lng === "uz" ? product.name_uz : product.name_ru}
            width={400}
            height={400}
            className="mx-auto object-contain"
          />
          <div className="text-white flex flex-col space-y-5">
            <p className="text-2xl font-semibold">
              {lng === "uz" ? product.name_uz : product.name_ru}
            </p>
            <p>
              {lng === "uz" ? product.description_uz : product.description_ru}
            </p>
            <p className="text-xl font-bold">
              {valute === "UZS" ? product.price_uzs : product.price_usd}{" "}
              {valute === "UZS" ? t("sum") : "$"}
            </p>

            <div className="flex space-x-5">
              <button className="bg-[#D3176D] border border-[#D3176D] px-5 py-1 text-sm">
                {t("buy")}
              </button>
              <button
                onClick={handleAddToCart}
                className="border border-[#D3176D] px-5 py-1 text-sm hover:bg-[#D3176D] transition"
              >
                {t("add_to_cart")}
              </button>
            </div>

            <div className="mt-10 text-white">
              <h3 className="text-2xl font-bold mb-4">{t("specifications")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">{t("processor")}</span>
                  <span>{product.processor}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">{t("graphics_card")}</span>
                  <span>{product.videocard}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">{t("memory")}</span>
                  <span>{product.memory}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">{t("cooling")}</span>
                  <span>{product.cooler}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">{t("resolution")}</span>
                  <span>{product.resolution}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">{t("fps")}</span>
                  <span>{product.fps}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">{t("monitor")}</span>
                  <span>{product.monitor}</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span className="text-gray-400">{t("brand")}</span>
                  <span>{product.brand?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {desktops.length > 1 && (
          <div className="max-w-[1200px] mx-auto mt-20 text-white">
            <h2 className="text-3xl font-bold mb-8">{t("related_products")}</h2>
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
                      alt={lng === "uz" ? item.name_uz : item.name_ru}
                      width={400}
                      height={250}
                      className="w-full h-[250px] object-cover"
                    />
                    <div className="p-4 flex flex-col space-y-2">
                      <p className="text-lg font-semibold">
                        {lng === "uz" ? item.name_uz : item.name_ru}
                      </p>
                      <p className="text-pink-500 font-bold">
                        {item.price_uzs} {t("sum")}
                      </p>
                      <Link href={`/desktops/${item.id}`}>
                        <button className="mt-2 self-start border border-[#D3176D] px-4 py-1 text-sm hover:bg-[#D3176D] transition">
                          {t("more_details")}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <Accordions lng={lng} />
    </div>
  );
};

export default SingleProductPage;

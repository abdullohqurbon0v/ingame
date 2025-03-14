"use client";

import Image from "next/image";
import { $axios } from "@/http/api";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useTranslation } from "@/i18n/client";

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

export default function SingleProductPage({
  id,
  lng,
}: {
  id: string;
  lng: string;
}) {
  const { t } = useTranslation(lng);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [product, setProduct] = useState<ProductsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [valute, setValute] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await $axios.get(`/product/${id}`);
        setProduct(res.data);
        const products = await $axios.get(
          `/combined?catalog_id=${res.data.catalog.id}`
        );
        setProducts([...products.data.desktops, ...products.data.products]);
        console.log(products);
      } catch (err) {
        console.error(t("error_loading_product"), err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
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

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        {t("product_not_found")}
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
              alt={lng === "uz" ? product.name_uz : product.name_ru}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            {lng === "uz" ? product.name_uz : product.name_ru}
          </h1>
          <p className="text-gray-400 mt-1">{t("model_name")}</p>
          <p className="text-3xl font-bold text-white mt-4">
            {valute === "UZS"
              ? parseInt(product.price_uzs).toLocaleString(
                  lng === "uz" ? "uz-UZ" : "ru-RU"
                )
              : product.price_usd}{" "}
            {valute === "UZS" ? t("sum") : "$"}
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed max-w-xl">
            {lng === "uz" ? product.description_uz : product.description_ru}
          </p>
          <div className="flex gap-4 mt-6">
            <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-bold transition">
              {t("buy")}
            </button>
            <button
              className="border border-pink-500 px-6 py-3 rounded-lg text-white hover:bg-pink-600 transition"
              onClick={handleAddToCart}
            >
              {t("add_to_cart")}
            </button>
          </div>
          <div className="flex gap-4 mt-4 text-sm text-gray-400">
            <span>🚚 {t("delivery")}</span>
            <span>❓ {t("need_help")}</span>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">{t("related_products")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((item, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] p-4 rounded-xl text-center hover:shadow-lg transition"
            >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={item.image}
                  alt={t("similar_product")}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white font-semibold">{item.name_ru}</p>
              <p className="text-pink-500 font-bold">
                {valute === "UZS" ? item.price_uzs : item.price_usd}{" "}
                {valute === "UZS" ? t("sum") : "$"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

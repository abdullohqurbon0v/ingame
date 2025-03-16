"use client";

import { $axios } from "@/http/api";
import { BlogTypes, ProductsType } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Product from "../components/product";
import Accordions from "../components/accordions";
import Blogs from "../components/blogs";
import Loading from "../components/loading";

const SearchPage = ({ lng }: { lng: string }) => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [blogs, setBlogs] = useState<BlogTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const param = useSearchParams();
  const query = param.get("query");

  useEffect(() => {
    const getSearchParams = async () => {
      try {
        setIsLoading(true);

        const res = await $axios.get(`/search?query=${query}`);
        setProducts(res.data || []);

        const blogsRes = await $axios.get("/news");
        setBlogs(blogsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    getSearchParams();
  }, [query]);

  if (isLoading) {
    return <Loading />;
  }
  if (products.length === 0) {
    return (
      <div className="min-h-screen mt-16 flex flex-col items-center justify-center text-white">
        <p className="text-2xl font-semibold text-gray-100">
          Результатов не найдено
        </p>
        <p className="mt-3 text-gray-300">Попробуйте другой поисковый запрос</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 text-white">
      <div className="max-w-[1200px] mx-auto pt-6 px-6 sm:px-0">
        <h1 className="my-16 text-3xl font-semibold">
          {lng === "uz" ? "Majsulotlar" : "Прродукты"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((item) => (
            <Product item={item} key={item.name_ru} lng={lng} />
          ))}
        </div>
      </div>
      <div className="my-16">
        <Accordions lng={lng} />
      </div>
      <Blogs blogs={blogs} lng={lng} />
    </div>
  );
};

export default SearchPage;

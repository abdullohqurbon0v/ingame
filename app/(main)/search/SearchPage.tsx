"use client";

import { $axios } from "@/http/api";
import { BlogTypes, ProductsType } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Product from "../components/product";
import Accordions from "../components/accordions";
import Blogs from "../components/blogs";
import Footer from "../components/footer";

const SearchPage = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [blogs, setBlogs] = useState<BlogTypes[]>([]);
  const param = useSearchParams();
  const query = param.get("query");

  useEffect(() => {
    const getSearchParams = async () => {
      const res = await $axios.get(`/search?query=${query}`);
      setProducts(res.data);

      const blogs = await $axios.get("/news");
      setBlogs(blogs.data);
    };
    getSearchParams();
  }, [query]);

  return (
    <div className="min-h-screen mt-16 text-white">
      <div className="max-w-[1200px] mx-auto pt-6">
        <h1 className="my-16 text-3xl font-semibold">Продукты</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((item) => (
            <Product item={item} key={item.name_ru} />
          ))}
        </div>
      </div>
      <div className="my-16">
        <Accordions />
      </div>
      <Blogs blogs={blogs} />
      <Footer />
    </div>
  );
};

export default SearchPage;

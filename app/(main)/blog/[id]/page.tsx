"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { $axios } from "@/http/api";
import { BlogTypes } from "@/types";

const SingleBlog = () => {
  const [blog, setBlog] = useState<BlogTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await $axios.get(`/news/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Ошибка при загрузке блога", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Загрузка...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Блог не найден.
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-[#0F0F0F] text-white py-20 px-4">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-4xl font-bold mb-4">{blog.title_ru}</h1>
        <p className="text-gray-400 text-sm mb-6">
          {new Date(blog.created_time).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <Image
          src={blog.image}
          alt={blog.title_uz}
          width={800}
          height={400}
          className="rounded-xl mb-8 object-cover w-full h-[400px]"
        />
        <p className="text-lg leading-7 text-gray-200">{blog.description_ru}</p>
      </div>
    </div>
  );
};

export default SingleBlog;

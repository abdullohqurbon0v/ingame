import { BlogTypes } from "@/types";
import Image from "next/image";
import React from "react";

const blogPosts = [
  {
    title: "У нас горячие новинки!",
    date: "16.05.24",
    image: "https://api.mirmakhmudoff.uz/media/desktop_images/w800_1.png", // Заменить на актуальный путь к изображению
    description:
      "Современный игровой компьютерный стол, который станет идеальным помощником в мире виртуальных развлечений и погрузит Вас в них с головой!",
    link: "#",
  },
  {
    title: "У нас горячие новинки!",
    date: "16.05.24",
    image: "https://api.mirmakhmudoff.uz/media/desktop_images/w800_1.png",
    description:
      "Современный игровой компьютерный стол, который станет идеальным помощником в мире виртуальных развлечений и погрузит Вас в них с головой!",
    link: "#",
  },
  {
    title: "У нас горячие новинки!",
    date: "16.05.24",
    image: "https://api.mirmakhmudoff.uz/media/desktop_images/w800_1.png",
    description:
      "Современный игровой компьютерный стол, который станет идеальным помощником в мире виртуальных развлечений и погрузит Вас в них с головой!",
    link: "#",
  },
];

const Blogs = ({ blogs }: { blogs: BlogTypes[] }) => {
  return (
    <div className="max-w-[1200px] mx-auto mt-20 px-4">
      <h2 className="text-white text-3xl md:text-5xl font-bold mb-12">
        Блог и новости
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post, idx) => (
          <div key={idx} className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
            <div className="relative">
              <Image
                src={post.image}
                alt={post.title_ru}
                width={400}
                height={250}
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs px-3 py-1 rounded-md font-bold">
                {post.created_time.toLocaleString()}
              </div>
              <div className="absolute bottom-4 left-4 text-white text-xl font-bold">
                <p className="uppercase tracking-widest">Новинка</p>
                <p className="text-2xl">от 200$</p>
              </div>
            </div>
            <div className="p-4 text-white">
              <h3 className="text-lg font-bold">{post.title_ru}</h3>
              <p className="text-sm text-gray-400 mt-2">
                {post.description_ru.length >= 50
                  ? post.description_ru.slice(0, 50)
                  : post.description_ru}
              </p>
              <a
                href={post.id}
                className="text-pink-500 text-sm font-semibold mt-4 inline-block hover:underline"
              >
                Читать дальше →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;

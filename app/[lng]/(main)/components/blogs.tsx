import { useTranslation } from "@/i18n/client";
import { BlogTypes } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Blogs = ({ blogs, lng }: { blogs: BlogTypes[]; lng: string }) => {
  const { t } = useTranslation(lng);
  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/${lng}/blog/${id}`);
  };
  return (
    <div className="max-w-[1200px] mx-auto mt-20 px-4">
      <h2 className="text-white text-3xl md:text-5xl font-bold mb-12">
        {t("blogtitle")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post, idx) => (
          <div
            key={idx}
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col justify-between"
          >
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
            </div>
            <div className="p-4 text-white">
              <h3 className="text-lg font-bold">
                {lng == "uz" ? post.title_uz : post.title_ru}
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                {lng == "uz"
                  ? post.description_uz.length >= 50
                    ? `${post.description_uz.slice(0, 50)}...`
                    : post.description_uz
                  : post.description_ru.length >= 50
                  ? `${post.description_ru.slice(0, 50)}...`
                  : post.description_ru}
              </p>
              <div
                onClick={() => handleNavigate(post.id)}
                className="text-pink-500 text-sm font-semibold mt-4 inline-block hover:underline cursor-pointer"
              >
                {t("read")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;

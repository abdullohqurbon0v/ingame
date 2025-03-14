import { useTranslation } from "@/i18n/client";
import { VideoType } from "@/types";
import Image from "next/image";
import React from "react";

const Videos = ({ videos, lng }: { videos: VideoType[]; lng: string }) => {
  const { t } = useTranslation(lng);
  return (
    <div className="max-w-[1200px] mx-auto mt-16 px-4 mb-24">
      <h2 className="text-white text-3xl md:text-5xl font-bold text-center">
        {t("whyme")}
      </h2>
      <p className="text-center text-gray-300 mt-2">{t("askclient")}</p>

      <div className="overflow-x-auto flex space-x-6 mt-12 pb-4 scrollbar-this scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {videos.map((client, idx) => (
          <div
            key={idx}
            className="bg-[#1a1a1a] text-white rounded-2xl w-[250px] shrink-0 p-4 relative"
          >
            <div className="bg-pink-600 text-xs px-2 py-1 rounded-md absolute top-4 left-4 font-bold">
              {lng === "uz" ? client.review_uz : client.review_ru}
            </div>
            <Image
              src={client.image}
              alt={client.review_ru}
              width={250}
              height={250}
              className="rounded-xl mt-16 object-cover h-[250px] w-full"
            />
            <div className="mt-4">
              <h3 className="font-semibold">{client.name}</h3>
              <p className="text-sm text-gray-400">
                {lng == "uz" ? client.profession_uz : client.profession_ru}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;

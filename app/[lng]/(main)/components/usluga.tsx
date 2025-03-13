import { useTranslation } from "@/i18n/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface UslugaProps {
  item: {
    description_ru: string;
    description_uz: string;
    id: number;
    image: string;
    min_description_ru: string;
    min_description_uz: string;
    name_uz: string;
    name_ru: string;
  };
  lng: string;
}

const Usluga = ({ item, lng }: UslugaProps) => {
  const { t } = useTranslation(lng);
  return (
    <div className="bg-[#1E1E1E] font-sans  flex flex-col space-y-3 shadow-xl rounded-xl pb-5">
      <Image
        src={item.image}
        alt={item.name_ru}
        width={500}
        height={200}
        className="mx-auto w-full"
      />
      <div className="flex flex-col space-y-3 px-4">
        <p className="text-xl font-semibold text-[#D3176D]">
          {lng == "uz" ? item.name_uz : item.name_ru}
        </p>
        <p>{lng == "uz" ? item.min_description_uz : item.min_description_ru}</p>
        <div className="flex items-center space-x-2 justify-start">
          <Link href={`/blog/${item.id}`}>
            <button className="px-5 py-1 border text-sm">{t("more")}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Usluga;

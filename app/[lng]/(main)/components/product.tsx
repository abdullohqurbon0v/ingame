import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  };
  lng: string;
}

const Product = ({ item, lng }: NewsTypes) => {
  const { t } = useTranslation(lng);
  return (
    <div className="bg-[#1E1E1E] font-sans pt-16 flex flex-col space-y-3 shadow-xl rounded-xl px-5 pb-5">
      <Image
        src={item.image}
        alt={item.name_ru}
        width={200}
        height={200}
        className="mx-auto"
      />
      <p className="text-xl">{lng == "uz" ? item.name_uz : item.name_ru}</p>
      <div>
        <p className="text-[#D3176D] text-xl font-semibold">
          {item.price_uzs} сум
        </p>
      </div>
      <p className="max-h-[200px] whitespace-nowrap truncate">
        {lng == "uz" ? item.description_uz : item.description_ru}
      </p>
      <div className="flex items-center space-x-2 justify-start">
        <Link href={`/products/${item.slug}`}>
          <button className="px-5 py-1 border text-sm">{t("more")}</button>
        </Link>

        <Button
          variant={"ghost"}
          className="hover:bg-transparent hover:text-white"
          size={"icon"}
        >
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Product;

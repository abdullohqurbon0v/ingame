import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface CategoryItem {
  id: number;
  image: string;
  name_uz: string;
  name_ru: string;
}
const Categories = ({ item, lng }: { item: CategoryItem; lng: string }) => {
  const searchParams = useSearchParams;
  const router = useRouter();
  const onRouteEl = (id: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lng);
    router.push(`/${lng}/category/${id}`);
  };
  return (
    <div
      onClick={() => onRouteEl(item.id)}
      className="mt-16 flex flex-col justify-between cursor-pointer"
    >
      <Image
        src={item.image}
        alt={item.name_uz}
        width={100}
        className="mx-auto"
        height={100}
      />
      <p className="text-center">
        {lng === "uz" ? item.name_uz : item.name_ru}
      </p>
    </div>
  );
};

export default Categories;

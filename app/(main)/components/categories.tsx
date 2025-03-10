import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryProps {
  item: {
    id: number;
    image: string;
    name_uz: string;
    name_ru: string;
  };
}

const Categories = ({ item }: CategoryProps) => {
  return (
    <Link
      href={`/category/${item.name_uz}`}
      className="mt-16 flex flex-col justify-between"
    >
      <Image
        src={item.image}
        alt={item.name_uz}
        width={100}
        className="mx-auto"
        height={100}
      />
      <p className="text-center">{item.name_ru}</p>
    </Link>
  );
};

export default Categories;

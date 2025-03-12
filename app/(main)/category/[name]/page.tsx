"use client";
import React, { useState } from "react";
import Product from "../../components/product";
import { data } from "@/constants";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const brangs = [
  "GIGABYTE Aorus",
  "ALIENWARE AURORA",
  "Lenovo Legion T7",
  "Acer Predator Orion",
  "ARENA 9604",
  "GAMER PRO RYZEN",
];

const monitors = ["24", "27", "32"];

const mouses = ["Игровая", "Офисная"];

const ITEMS_PER_PAGE = 12;

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-[#1A1A1A]">
      <div className="max-w-[1200px] mx-auto flex space-x-10 pt-40 text-white">
        <aside className="w-1/3 mt-10">
          <div className="space-y-5">
            <p>Цена</p>
            <form className="flex space-x-5">
              <Input type={"number"} />
              <Input type={"number"} />
            </form>
            <div className="border-b"></div>
          </div>
          <div className="my-8">
            <p>Бренды</p>
            <div>
              {brangs.map((item, idx) => (
                <div key={idx} className="flex space-x-4 items-center mt-2">
                  <Checkbox className="border-white" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="my-8">
            <p>Монитор</p>
            <div>
              {monitors.map((item, idx) => (
                <div key={idx} className="flex space-x-4 items-center mt-2">
                  <Checkbox className="border-white" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="my-8">
            <p>Мышка</p>
            <div>
              {mouses.map((item, idx) => (
                <div key={idx} className="flex space-x-4 items-center mt-2">
                  <Checkbox className="border-white" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
        <div>
          <h1 className="text-3xl font-semibold mb-7">Игровые ПК</h1>
          <div className="grid grid-cols-3 gap-5">
            {currentProducts.map((item, idx) => (
              <Product key={idx} item={item} />
            ))}
          </div>
          <div className="flex justify-center space-x-2 mt-10">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              ❮
            </Button>
            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 ${
                  currentPage === idx + 1 ? "bg-pink-500" : "bg-gray-700"
                }`}
              >
                {idx + 1}
              </Button>
            ))}
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              ❯
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

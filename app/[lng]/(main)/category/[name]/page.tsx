"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";
import { $axios } from "@/http/api";
import Product from "../../components/product";
import Loading from "../../components/loading";

interface Brand {
  name: string;
  id: string;
}

interface ProductsType {
  type: string;
  brand: Brand;
  description_ru: string;
  description_uz: string;
  image: string;
  id: string;
  name_uz: string;
  name_ru: string;
  price_usd: string;
  price_uzs: string;
  videocard: string;
  slug: string;
  monitor?: number; // Добавлено для фильтрации по монитору (если есть в данных)
}

interface BrandsType {
  id: number;
  name: string;
}

interface FilterState {
  minPrice: number | null;
  maxPrice: number | null;
  selectedBrands: string[];
  selectedMonitors: string[];
  selectedMouses: string[];
}

const Category = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductsType[]>([]);
  const [brands, setBrands] = useState<BrandsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [valute, setValute] = useState<string>("UZS");
  const [filters, setFilters] = useState<FilterState>({
    minPrice: null,
    maxPrice: null,
    selectedBrands: [],
    selectedMonitors: [],
    selectedMouses: [],
  });

  const { lng, name } = useParams<{ name: string; lng: string }>();
  const monitors = ["24", "27", "32"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await $axios.get(`/combined/?catalog_id=${name}`);
        const allProducts = [...res.data.products, ...res.data.desktops];
        setProducts(allProducts);
        setFilteredProducts(allProducts);

        const brandsRes = await $axios.get("/brands");
        setBrands(brandsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [name]);
  useEffect(() => {
    const storedValute = localStorage.getItem("valute") || "UZS";
    setValute(storedValute);

    const handleStorageChange = () => {
      const newValute = localStorage.getItem("valute") || "UZS";
      setValute(newValute);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("valuteChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("valuteChange", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    const applyFilters = () => {
      let result = [...products];
      if (filters.minPrice !== null || filters.maxPrice !== null) {
        result = result.filter((p) => {
          const price =
            valute === "UZS" ? Number(p.price_uzs) : Number(p.price_usd);
          const minCheck =
            filters.minPrice !== null ? price >= filters.minPrice : true;
          const maxCheck =
            filters.maxPrice !== null ? price <= filters.maxPrice : true;
          return minCheck && maxCheck;
        });
      }
      if (filters.selectedBrands.length > 0) {
        console.log("REsult", result);
        result = result.filter((p) =>
          filters.selectedBrands.includes(p?.brand?.name)
        );
      }
      if (filters.selectedMonitors.length > 0) {
        result = result.filter((p) =>
          p.monitor
            ? filters.selectedMonitors.includes(p.monitor.toString())
            : false
        );
      }

      // Фильтрация по мышкам (предполагаем, что это часть типа или нужно добавить поле)
      if (filters.selectedMouses.length > 0) {
        result = result.filter((p) =>
          filters.selectedMouses.some(
            (mouse) => p.name_uz.includes(mouse) || p.name_ru.includes(mouse)
          )
        );
      }

      setFilteredProducts(result);
    };

    applyFilters();
  }, [filters, products, valute]);

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    setFilters((prev) => {
      if (type === "minPrice" || type === "maxPrice") {
        return { ...prev, [type]: value ? Number(value) : null };
      }

      const currentValues = prev[type] as string[];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [type]: currentValues.filter((v) => v !== value),
        };
      }
      return {
        ...prev,
        [type]: [...currentValues, value],
      };
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#1A1A1A] min-h-screen py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-0 flex flex-col md:flex-row gap-8 pt-20 text-white">
        <aside className="w-full md:w-1/4 bg-[#222222] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-[#D3176D] mb-6">Фильтры</h2>

          {/* Цена */}
          <div className="space-y-4">
            <p className="text-lg font-medium text-gray-200">Цена ({valute})</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="number"
                placeholder="От"
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="bg-[#2A2A2A] border-none text-white placeholder-gray-500 focus:ring-2 focus:ring-[#D3176D] rounded-lg"
              />
              <Input
                type="number"
                placeholder="До"
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="bg-[#2A2A2A] border-none text-white placeholder-gray-500 focus:ring-2 focus:ring-[#D3176D] rounded-lg"
              />
            </div>
            <div className="border-t border-gray-700 mt-4"></div>
          </div>

          {/* Бренды */}
          <div className="mt-6 space-y-4">
            <p className="text-lg font-medium text-gray-200">Бренды</p>
            {brands.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <Checkbox
                  className="border-gray-500 data-[state=checked]:bg-[#D3176D] data-[state=checked]:border-[#D3176D]"
                  checked={filters.selectedBrands.includes(item.name)}
                  onCheckedChange={() =>
                    handleFilterChange("selectedBrands", item.name)
                  }
                />
                <p className="text-gray-300 hover:text-white transition-colors">
                  {item.name}
                </p>
              </div>
            ))}
            <div className="border-t border-gray-700 mt-4"></div>
          </div>

          {/* Монитор */}
          <div className="mt-6 space-y-4">
            <p className="text-lg font-medium text-gray-200">Монитор</p>
            {monitors.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Checkbox
                  className="border-gray-500 data-[state=checked]:bg-[#D3176D] data-[state=checked]:border-[#D3176D]"
                  checked={filters.selectedMonitors.includes(item)}
                  onCheckedChange={() =>
                    handleFilterChange("selectedMonitors", item)
                  }
                />
                <p className="text-gray-300 hover:text-white transition-colors">
                  {item}
                </p>
              </div>
            ))}
            <div className="border-t border-gray-700 mt-4"></div>
          </div>
        </aside>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-8">Игровые ПК</h1>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-400 text-lg text-center">
              Товаров не найдено
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((item) => (
                <Product item={item} key={item.id} lng={lng} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;

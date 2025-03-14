"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";
import { $axios } from "@/http/api";
import Product from "../../components/product";

interface ProductsType {
  type: string;
  description_ru: string;
  description_uz: string;
  image: string;
  id: string;
  name_uz: string;
  name_ru: string;
  price_usd: string;
  price_uzs: string;
  videocard: string,
  slug: string;
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
  const [filters, setFilters] = useState<FilterState>({
    minPrice: null,
    maxPrice: null,
    selectedBrands: [],
    selectedMonitors: [],
    selectedMouses: [],
  });
  
  const { lng, name } = useParams<{name: string, lng: string}>();
  const monitors = ["24", "27", "32"];
  const mouses = ["Игровая", "Офисная"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await $axios.get(`/combined/?catalog_id=${name}`);
        console.log(res)
        const allProducts = [...res.data.products, ...res.data.desktops];
        setProducts(allProducts);
        setFilteredProducts(allProducts);

        const brandsRes = await $axios.get('/brands');
        setBrands(brandsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [name]);

  useEffect(() => {
    const applyFilters = () => {
      let result = [...products];
      if (filters.minPrice !== null) {
        result = result.filter(p => 
          Number(p.price_uzs) >= Number(filters.minPrice)
        );
      }
      if (filters.maxPrice !== null) {
        result = result.filter(p => 
          Number(p.price_uzs) <= Number(filters.maxPrice)
        );
      }
      if (filters.selectedBrands.length > 0) {
        result = result.filter(p => 
          filters.selectedBrands.includes(p.type)
        );
      }

      setFilteredProducts(result);
    };

    applyFilters();
  }, [filters, products]);

  const handleFilterChange = (type: keyof FilterState, value: any) => {
    setFilters(prev => {
      if (type === 'minPrice' || type === 'maxPrice') {
        return { ...prev, [type]: value ? Number(value) : null };
      }
      
      const currentValues = prev[type] as string[];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [type]: currentValues.filter(v => v !== value)
        };
      }
      return {
        ...prev,
        [type]: [...currentValues, value]
      };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      <div className="max-w-[1200px] mx-auto flex space-x-10 pt-40 text-white">
        <aside className="w-1/3 mt-10">
          <div className="space-y-5">
            <p>Цена</p>
            <form className="flex space-x-5">
              <Input 
                type="number" 
                placeholder="От"
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
              <Input 
                type="number" 
                placeholder="До"
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </form>
            <div className="border-b"></div>
          </div>

          <div className="my-8">
            <p>Бренды</p>
            {brands.map((item) => (
              <div key={item.id} className="flex space-x-4 items-center mt-2">
                <Checkbox
                  className="border-white"
                  checked={filters.selectedBrands.includes(item.name)}
                  onCheckedChange={() => handleFilterChange('selectedBrands', item.name)}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>

          <div className="my-8">
            <p>Монитор</p>
            {monitors.map((item) => (
              <div key={item} className="flex space-x-4 items-center mt-2">
                <Checkbox
                  className="border-white"
                  checked={filters.selectedMonitors.includes(item)}
                  onCheckedChange={() => handleFilterChange('selectedMonitors', item)}
                />
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="my-8">
            <p>Мышка</p>
            {mouses.map((item) => (
              <div key={item} className="flex space-x-4 items-center mt-2">
                <Checkbox
                  className="border-white"
                  checked={filters.selectedMouses.includes(item)}
                  onCheckedChange={() => handleFilterChange('selectedMouses', item)}
                />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-7">Игровые ПК</h1>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-400">Товаров не найдено</p>
          ) : (
            <div className="grid grid-cols-3 gap-10">
              {filteredProducts.map((item) => (
               <Product item={item} key={item.name_uz} lng={lng}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
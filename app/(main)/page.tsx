"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Categories from "./components/categories";
import Computers from "./components/computers";
import Product from "./components/product";
import { $axios } from "@/http/api";
import Usluga from "./components/usluga";
import Footer from "./components/footer";
import Accordions from "./components/accordions";
import Videos from "./components/videos";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Blogs from "./components/blogs";
import {
  BannerType,
  BlogTypes,
  CatalogsType,
  DesktopType,
  ProductsType,
  ServiceType,
  VideoType,
} from "@/types";

const MainPage = () => {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [catalogs, setCatalogs] = useState<CatalogsType[]>([]);
  const [desktops, setDesktops] = useState<DesktopType[]>([]);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [services, serServices] = useState<ServiceType[]>([]);
  const [blogs, setBlogs] = useState<BlogTypes[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  useEffect(() => {
    async function getDatas() {
      try {
        const bannners = await $axios.get("/banners/");
        setBanners(bannners.data);
        const catalogs = await $axios.get("/catalogs/");
        setCatalogs(catalogs.data);
        const desktops = await $axios.get("/desktops");
        setDesktops(desktops.data);
        const news = await $axios.get("/products");
        setProducts(news.data);
        const services = await $axios.get("/services");
        serServices(services.data);
        const blogs = await $axios.get("/news");
        setBlogs(blogs.data);
        const videos = await $axios.get("/testimonials");
        setVideos(videos.data);
        console.log(videos);
      } catch (error) {
        console.log(error);
      }
    }
    getDatas();
  }, []);

  return (
    <main className="mt-16 text-white">
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        spaceBetween={50}
        className="max-w-[1200px] mx-auto"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex justify-between py-64">
              <div className="w-[700px] flex flex-col items-start space-y-5">
                <div>
                  <h1 className="text-5xl font-semibold mb-2">
                    {item.title_uz}
                  </h1>
                  <p>{item.description_uz}</p>
                </div>
                <button className="px-5 py-3 border border-[#D3176D]">
                  Подробнее
                </button>
              </div>
              <Image
                src={item.image}
                alt="Banner image"
                width={400}
                height={400}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="bg-[#0F0F0F]">
        <div className="max-w-[1200px] text-center mx-auto py-16">
          <h2 className="text-3xl mb-2">КАТАЛОГ INGAME.UZ</h2>
          <p>Выберите себе в каталоге для максимально комфортной игры</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {catalogs.map((item) => (
              <Categories key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto py-16">
          <h1 className="text-3xl font-bold">Наши ПК</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 ">
            {desktops.map((item) => (
              <Computers key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto py-16">
          <h1 className="text-3xl font-bold">Новинки</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 px-12">
            {products.map((item, idx) => (
              <Product key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto py-16">
          <h1 className="text-3xl font-bold">Услуги</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 px-12">
            {services.map((item, idx) => (
              <Usluga key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
      <Videos videos={videos} />
      <Accordions />
      <Blogs blogs={blogs} />
      <Footer />
    </main>
  );
};

export default MainPage;

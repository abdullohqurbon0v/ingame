"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Categories from "./components/categories";
import Computers from "./components/computers";
import Product from "./components/product";
import { $axios } from "@/http/api";
import Usluga from "./components/usluga";
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
import Loading from "./components/loading";
import { useParams } from "next/navigation";
import { useTranslation } from "@/i18n/client";

const MainPage = () => {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng as string);
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [catalogs, setCatalogs] = useState<CatalogsType[]>([]);
  const [desktops, setDesktops] = useState<DesktopType[]>([]);
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [services, serServices] = useState<ServiceType[]>([]);
  const [blogs, setBlogs] = useState<BlogTypes[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getDatas();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between py-10 lg:py-32 px-4 sm:px-8">
              <div className="w-full lg:w-1/2 flex flex-col items-start space-y-5 text-center lg:text-left">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-2">
                    {lng == "uz" ? item.title_uz : item.title_ru}
                  </h1>
                  <p className="text-sm sm:text-base">
                    {lng == "uz" ? item.description_uz : item.description_ru}
                  </p>
                </div>
                {/* <button className="px-5 py-3 border border-[#D3176D] hover:bg-[#D3176D] transition">
                  Подробнее
                </button> */}
              </div>
              <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
                <Image
                  src={item.image}
                  alt="Banner image"
                  width={400}
                  height={400}
                  className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="bg-[#0F0F0F]">
        <div className="max-w-[1200px] text-center mx-auto py-16">
          <h2 className="text-3xl mb-2">{t("catalogtitle")}</h2>
          <p>{t("catalogdescribe")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {catalogs.map((item) => (
              <Categories key={item.id} item={item} lng={lng} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto py-16">
          <h1 className="text-3xl font-bold">{t("pktitle")}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 ">
            {desktops.map((item) => (
              <Computers key={item.id} item={item} lng={lng} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto py-16">
          <h1 className="text-3xl font-bold">{t("productstitle")}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 px-12">
            {products.map((item, idx) => (
              <Product key={idx} item={item} lng={lng} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto py-16">
          <h1 className="text-3xl font-bold">{t("servicetitle")}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 px-12">
            {services.map((item, idx) => (
              <Usluga key={idx} item={item} lng={lng} />
            ))}
          </div>
        </div>
      </div>
      <Videos videos={videos} lng={lng} />
      <div className="bg-[#1A1A1A]">
        <Accordions lng={lng} />
      </div>
      <Blogs blogs={blogs} lng={lng} />
    </main>
  );
};

export default MainPage;

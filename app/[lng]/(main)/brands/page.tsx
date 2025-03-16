"use client";

import Image from "next/image";
import React from "react";
import Accordions from "../components/accordions";
import { useParams } from "next/navigation";
import { useTranslation } from "@/i18n/client";

const BrandsPage = () => {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng);

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white">
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto space-y-12">
        <section className="space-y-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center sm:text-left">
            {t("aboutcompany")}
          </h1>
          <p className="text-sm md:text-base tracking-wide leading-6 max-w-3xl mx-auto sm:mx-0">
            {t("deskaboutcompany")}
          </p>
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src="https://i0.wp.com/www.iadea.com/wp-content/uploads/2016/01/About-company-S2-02.jpg?ssl=1"
              alt="About Company image"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </section>
        <section className="space-y-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4">
              {t("aboutme")}
            </h1>
            <div className="border-b-2 border-[#D3176D] w-24 sm:w-40 mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="relative w-full md:w-1/3 h-[200px] sm:h-[250px] md:h-[300px]">
              <Image
                src="https://a.storyblok.com/f/99519/1920x1080/55b0da46bb/5-positive-conflict-tips-you-can-learn-from-high-performance-teams-5.jpg"
                alt="Team"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <p className="text-sm md:text-base leading-6">
                {t("aboutmedesc")}
              </p>
            </div>
          </div>
        </section>
        <section className="space-y-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-center">
            {t("whyme")}
          </h1>
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-sm md:text-base leading-6">{t("helloabout")}</p>
            <p className="text-sm md:text-base leading-6">{t("hellodesc")}</p>
            <p className="text-sm md:text-base leading-6">{t("minidesc")}</p>
          </div>
        </section>
        <section>
          <Accordions lng={lng} />
        </section>
      </div>
    </div>
  );
};

export default BrandsPage;

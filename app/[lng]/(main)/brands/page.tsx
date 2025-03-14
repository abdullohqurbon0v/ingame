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
    <div className="bg-[#1a1a1a]">
      <div className="mt-16 max-w-[1200px] mx-auto py-32 space-y-8 ">
        <h1 className="text-2xl font-semibold">{t("aboutcompany")}</h1>
        <p className="text-sm tracking-wide leading-6">
          {t("deskaboutcompany")}
        </p>
        <Image
          src={
            "https://i0.wp.com/www.iadea.com/wp-content/uploads/2016/01/About-company-S2-02.jpg?ssl=1"
          }
          alt="About Company image"
          width={1000}
          height={1000}
          className="w-full object-cover"
        />

        <h1 className="text-3xl text-center">{t("aboutme")}</h1>
        <div className="border-b-2 border-[#D3176D] w-40 mx-auto"></div>
        <div className="flex space-x-10">
          <Image
            className="w-1/3 pk"
            src={
              "https://a.storyblok.com/f/99519/1920x1080/55b0da46bb/5-positive-conflict-tips-you-can-learn-from-high-performance-teams-5.jpg"
            }
            alt="Team"
            width={200}
            height={200}
          />
          <div className="w-2/3">
            <p>{t("aboutmedesc")}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          <h1 className="text-2xl text-center mb-10">{t("whyme")}</h1>
          <p>{t("helloabout")}</p>
          <p>{t("hellodesc")}</p>
          <p>{t("minidesc")}</p>
        </div>
        <Accordions lng={lng} />
      </div>
    </div>
  );
};

export default BrandsPage;

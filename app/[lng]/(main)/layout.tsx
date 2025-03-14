"use client";
import React, { Suspense } from "react"; // Import Suspense
import Navbar from "./components/navbar";
import { ChildProps } from "@/types";
import { useParams } from "next/navigation";
import Footer from "./components/footer";

type Params = {
  lng?: string;
};

const MainLayout = ({ children }: ChildProps) => {
  const params = useParams<Params>();
  const lng = params.lng || "ru";

  return (
    <div className="font-orbitron bg-black">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar lng={lng} />
      </Suspense>
      <main>{children}</main>
      <Footer lng={lng} />
    </div>
  );
};

export default MainLayout;

"use client";
import React, { Suspense } from "react"; // Import Suspense
import Navbar from "./components/navbar";
import { ChildProps } from "@/types";
import { useParams } from "next/navigation";

type Params = {
  lng?: string;
};

const MainLayout = ({ children }: ChildProps) => {
  const params = useParams<Params>();
  const lng = params.lng || "ru";

  return (
    <div className="font-orbitron bg-black">
      {/* Wrap Navbar in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar lng={lng} />
      </Suspense>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;

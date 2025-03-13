"use client";

import React, { Suspense } from "react";
import SearchPage from "./SearchPage";
import { useParams } from "next/navigation";

export default function Page() {
  const { lng } = useParams<{ lng: string }>();
  return (
    <Suspense fallback={<div className="text-white p-10">Загрузка...</div>}>
      <SearchPage lng={lng} />
    </Suspense>
  );
}

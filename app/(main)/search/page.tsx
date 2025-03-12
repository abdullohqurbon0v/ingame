import React, { Suspense } from "react";
import SearchPage from "./SearchPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Загрузка...</div>}>
      <SearchPage />
    </Suspense>
  );
}

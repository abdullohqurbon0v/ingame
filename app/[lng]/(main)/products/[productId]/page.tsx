import React from "react";
import SingleProductPage from "../../components/singleProductPage";

type Params = Promise<{ productId: string; lng: string }>;

export default async function page(props: { params: Params }) {
  const params = await props.params;
  const { productId, lng } = params;
  return <SingleProductPage id={productId} lng={lng} />;
}

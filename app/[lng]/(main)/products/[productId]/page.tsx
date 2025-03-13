import React from "react";
import SingleProductPage from "../../components/singleProductPage";

type Params = Promise<{ productId: string }>;

export default async function page(props: { params: Params }) {
  const params = await props.params;
  const id = params.productId;
  return <SingleProductPage id={id} />;
}

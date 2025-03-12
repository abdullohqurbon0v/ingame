import SingleProductPage from "../../components/singleDesktopPage";

export default async function Page({ params }: Promise<{ id: string }>) {
  const id = (await params).id;
  return <SingleProductPage id={id} />;
}

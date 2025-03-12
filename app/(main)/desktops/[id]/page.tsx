import SingleProductPage from "../../components/singleDesktopPage";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const id = (await params).id;
  return <SingleProductPage id={id} />;
}

import SingleProductPage from "../../components/singleDesktopPage";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  return <SingleProductPage id={await params.id} />;
}

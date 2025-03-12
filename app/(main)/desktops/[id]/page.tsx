import SingleProductPage from "../../components/singleDesktopPage";

interface PageProps {
  params: { id: string };
}

const Page = ({ params }: PageProps) => {
  return <SingleProductPage id={params.id} />;
};

export default Page;

import SingleProductPage from "../../components/singleDesktopPage";

const Page = ({ params }: Promise<{ id: string }>) => {
  return <SingleProductPage id={params.id} />;
};

export default Page;

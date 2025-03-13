import SingleProductPage from "../../components/singleDesktopPage";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  return <SingleProductPage id={id} />;
}

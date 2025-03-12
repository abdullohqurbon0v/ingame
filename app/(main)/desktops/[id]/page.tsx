// app/desktops/[id]/page.tsx

import SingleProductPage from "../../components/singleDesktopPage";

const Page = ({ params }: { params: { id: string } }) => {
  return <SingleProductPage id={params.id} />;
};

export default Page;

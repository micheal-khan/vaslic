import { getHomepageData } from "@/lib/data";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const { productsByCategory, retiredProducts } = await getHomepageData();

  return (
    <HomeClient
      productsByCategory={productsByCategory}
      retiredProducts={retiredProducts}
    />
  );
}

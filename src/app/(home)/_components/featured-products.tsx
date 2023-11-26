import { ProductItem } from "~/components/product-item";
import { api } from "~/lib/trpc";

export async function FeaturedProducts() {
  const products = await api.server.product.getProducts.query();

  return (
    <div className="flex flex-col px-[5%]">
      <p className="text-4xl font-bold mb-4 text-black">Featured Products</p>
      <div className="flex gap-4 flex-wrap">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

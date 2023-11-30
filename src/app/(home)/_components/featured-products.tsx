import { ProductItem } from "~/components/product-item";
import { caller } from "~/server";

export async function FeaturedProducts() {
  const products = await caller.product.getProducts();

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

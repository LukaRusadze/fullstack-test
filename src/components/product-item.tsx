/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/LjXt7m0RAZc
 */
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { getNameAcronym } from "~/lib/utils";
import { Plus, ShoppingCart } from "lucide-react";
import { db } from "~/lib/db";
import { shoppingCartItems, shoppingCarts, users } from "~/lib/db/schema";
import { eq } from "drizzle-orm";

export function ProductItem(props: {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  inCart: boolean;
}) {
  async function onAddToShoppingCart() {
    "use server";
  }

  return (
    <Card className="p-4 md:p-6 rounded-lg shadow-lg w-[250px] bg-white hover:shadow-xl transition-shadow">
      <div className="flex flex-col items-start">
        <Image
          alt="Artwork Image"
          className="aspect-square object-cover rounded-md w-full mb-4"
          height={100}
          src={props.image}
          width={100}
        />
        <div className="flex items-center gap-2 mb-2">
          <Avatar>
            <AvatarImage className="mr-2" src="/placeholder-user.jpg" />
            <AvatarFallback>{getNameAcronym(props.author)}</AvatarFallback>
          </Avatar>
          <h3 className="text-base font-medium">{props.author}</h3>
        </div>
        <h2 className="text-xl font-bold mb-2">{props.title}</h2>
        <div className="flex items-center justify-between w-full relative">
          <h4 className="text-lg font-semibold text-primary-500">
            ${props.price.toFixed(2)}
          </h4>
          <form>
            <Button
              formAction={onAddToShoppingCart}
              size="icon"
              className="absolute right-0 bottom-0"
            >
              {props.inCart ? <ShoppingCart /> : <Plus />}
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}

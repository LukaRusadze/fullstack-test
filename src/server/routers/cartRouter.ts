import { procedure, router } from "../trpc";
import { z } from "zod";

export const cartRouter = router({
  getCartItems: procedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return CART_ITEMS;
  }),
  deleteCartItem: procedure.input(z.string()).mutation(({ input }) => {
    CART_ITEMS = CART_ITEMS.filter((item) => item.id !== input);
  }),
});

let CART_ITEMS = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "3",
    name: "Product 3",
    price: 300,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "4",
    name: "Product 4",
    price: 400,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "5",
    name: "Product 5",
    price: 500,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "6",
    name: "Product 6",
    price: 600,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "7",
    name: "Product 7",
    price: 700,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "8",
    name: "Product 8",
    price: 800,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "9",
    name: "Product 9",
    price: 900,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "10",
    name: "Product 10",
    price: 1000,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "11",
    name: "Product 11",
    price: 1100,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "12",
    name: "Product 12",
    price: 1200,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "13",
    name: "Product 13",
    price: 1300,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "14",
    name: "Product 14",
    price: 1400,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
  {
    id: "15",
    name: "Product 15",
    price: 1500,
    quantity: 1,
    image: "https://picsum.photos/200",
  },
];

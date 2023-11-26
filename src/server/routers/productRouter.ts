import { procedure, router } from "../trpc";

export const productRouter = router({
  getProducts: procedure.query(async () => {
    return DUMMY_PRODUCTS;
  }),
});

let DUMMY_PRODUCTS = [
  {
    id: "1",
    title: "Product 1",
    author: "Author 1",
    price: 100,
    image: "https://picsum.photos/200",
    inCart: false,
  },
  {
    id: "2",
    title: "Product 2",
    author: "Author 2",
    price: 200,
    image: "https://picsum.photos/200",
    inCart: false,
  },
  {
    id: "3",
    title: "Product 3",
    author: "Author 3",
    price: 300,
    image: "https://picsum.photos/200",
    inCart: false,
  },
  {
    id: "4",
    title: "Product 4",
    author: "Author 4",
    price: 400,
    image: "https://picsum.photos/200",
    inCart: false,
  },
];

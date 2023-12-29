import { IProduct } from "../App/clients/Context/Client.context";
import formatPrice from "../App/clients/utils/formatPrice";

export const products: IProduct[] = [
  {
    id: 1,
    name: "Nike Slim ",
    price: formatPrice(5000),
    description: "high quality product",
    countInStock: 10,
  },
  {
    id: 2,
    name: "Adidas Fit ",
    price: formatPrice(5000),
    description: "high quality product",
    countInStock: 20,
  },
  {
    id: 3,
    name: "Lacoste Free ",
    price: formatPrice(5000),
    description: "high quality product",
    countInStock: 0,
  },
  {
    id: 4,
    name: "Nike Slim ",
    price: formatPrice(7800),
    description: "high quality product",
    countInStock: 15,
  },
  {
    id: 5,
    name: "Puma Slim ",
    price: formatPrice(6500),
    description: "high quality product",
    countInStock: 5,
  },
  {
    id: 6,
    name: "Adidas Fit + Tshirt",
    price: formatPrice(13900),
    description: "high quality product",
    countInStock: 12,
  },
  {
    id: 7,
    name: "Lacoste Free + invicta ",
    price: formatPrice(150000),
    description: "high quality product",
    countInStock: 0,

  },
  {
    id: 8,
    name: "Nike Slim ",
    price: formatPrice(15000),
    description: "high quality product",
    countInStock: 10,
  },
];

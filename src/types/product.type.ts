export default interface IProduct {
  [index: string]: {};
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  status: boolean;
}

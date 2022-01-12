
export default interface IProduct {
  // [index: string | number]:
  //   | string
  //   | number
  //   | boolean
  //   | undefined
  id?: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  status: boolean;
  id_catalog: string;
}

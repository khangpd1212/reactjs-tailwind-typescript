
export default interface IProduct {
  // [index: string | number]:
  //   | string
  //   | number
  //   | boolean
  //   | undefined
  //   | Blob
  //   | MediaSource;
  id?: string;
  name: string;
  nameImage: string;
  price: number;
  description: string;
  status: boolean;
  id_catalog: string;
}

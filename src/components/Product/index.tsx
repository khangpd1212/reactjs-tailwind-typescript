import { onValue } from "firebase/database";
import { useEffect, useState } from 'react';
import servicesProduct from "../../services/product.service";
import "../../styles/toggle.css";
import IProduct from "../../types/product.type";
import AddForm from "./AddForm";
import HeadingTable from "../Table/HeadingTable";
import MainTable from "../Table/MainTable";
import { mapArray } from "utils/mapArray";
const title = [
  "Image",
  "Name",
  "Price",
  "Description",
  "Status",
]

export default function Product() {
  const [productList, setProductList] = useState<IProduct>();
  useEffect(() => {
    onValue(servicesProduct.getAll(), (snapshot) => {
      const response = snapshot.val();
      const data = mapArray(response);
      setProductList(data);
    });
  }, []);

  console.log(productList);

  return (
    <div className="main-content flex flex-col flex-grow p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-700">Product</h1>
        <AddForm/>
      </div>
      <div className="flex flex-col mt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <HeadingTable title={title} />
                <MainTable productList={productList} />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


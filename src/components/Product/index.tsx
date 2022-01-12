import { onValue } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import servicesProduct from "../../services/product.service";
import "../../styles/toggle.css";
import IProduct from "../../types/product.type";
import AddForm from "./AddForm";
import HeadingTable from "../Table/HeadingTable";
import { mapObject } from "utils/mapObject";
import EditForm from "./EditForm";
const title = [
  "Image",
  "Name",
  "Price",
  "Description",
  "Status",
]
interface StringArray {
  [index: string]: boolean;
}
export default function Product() {
  const [productList, setProductList] = useState<IProduct>();
  const [showEdit, setShowEdit] = useState(false);
  const id_product = useRef<string>("");

  useEffect(() => {
    onValue(servicesProduct.getAll(), (snapshot) => {
      const response = snapshot.val();
      const data = response && mapObject(response);
      setProductList(data);
    });
  }, []);

  console.log(productList);
  const changeStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number | string
  ): void => {
    const status = e.target.checked;
    let updates: StringArray = {};
    updates[`/${id}/status`] = status;
    servicesProduct.update(updates);
  };

  const handleDeleteProduct = (id: string) => {
    return servicesProduct.delete(id);
  };

  const handleShowEdit = (id: string) => {
    id_product.current = id
    setShowEdit(true);
  };
  return (
    <>
      <EditForm
        open={showEdit}
        setOpen={setShowEdit}
        id_product={id_product.current}
      />
      <div className="main-content flex flex-col flex-grow p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl text-gray-700">Product</h1>
          <AddForm />
        </div>
        <div className="flex flex-col mt-4">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <HeadingTable title={title} />
                  {productList &&
                    Object.values(productList).map((item) => (
                      <tbody key={item.id}>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={item.imageUrl}
                                  alt={item.imageUrl}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-normal">
                            <div className="text-sm text-gray-900">
                              {item.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ${item.price}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-normal">
                            <div className="text-sm text-gray-900">
                              {item.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <label
                              htmlFor={`checked-${item.id}`}
                              className="relative inline-block w-11 mr-2 align-middle select-none transition duration-200 ease-in"
                            >
                              <input
                                checked={item.status}
                                type="checkbox"
                                name="toggle"
                                id={`checked-${item.id}`}
                                onChange={(e) => changeStatus(e, item.id)}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300"
                              />
                              <div className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></div>
                            </label>
                          </td>
                          <td className="px-6 py-4 w-32 text-right text-sm font-medium cursor-pointer">
                            <span
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => handleShowEdit(item.id)}
                            >
                              Edit
                            </span>
                            <span> / </span>
                            <span
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDeleteProduct(item.id)}
                            >
                              Delete
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


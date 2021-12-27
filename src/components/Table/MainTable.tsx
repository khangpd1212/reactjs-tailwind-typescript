import { ref, child, get, update, set, onValue, off } from "firebase/database";
import "../../styles/toggle.css";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import services from "../../services/product.service";
import Product from "../../types/product.type";
interface StringArray {
  [index: string]: {},
}
export default function MainTable():JSX.Element {
  const [productList, setProductList] = useState<Product[] | undefined | void>([]);
  const [message, setMessage] = useState('');
  const dbRef = ref(db);
  useEffect(() => {
    onValue(services.getAll(), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setProductList(data);
    });

  }, [dbRef, message]);
  
  console.log(productList);

  const changeStatus = (e: React.ChangeEvent<HTMLInputElement>, item: Product, key: number) => {
    const status = e.target.checked;  
    const data = {
      ...item,
      status: status,
    }
    let updates: StringArray = {};
    set(ref(db, 'product/' + key), data).then(() => {
      return setMessage('Update is success')
    }).catch((error) => {
      console.log(error)
    })
    // updates[`/product/${key}`] = data;
    // update(ref(db), updates);
  }
  return (
    <>
      {productList &&
        productList.map((item, key) => (
          <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img className="h-10 w-10 rounded-full" src={item.image} alt={item.image}/>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-normal">
              <div className="text-sm text-gray-900">{item.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">${item.price}</div>
            </td>
            <td className="px-6 py-4 whitespace-normal">
              <div className="text-sm text-gray-900">{item.description}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <label
                htmlFor={item.id}
                className="relative inline-block w-11 mr-2 align-middle select-none transition duration-200 ease-in"
              >
                <input
                  checked={item.status}
                  type="checkbox"
                  name="toggle"
                  id={item.id}
                  onChange={(e) => changeStatus(e, item, key)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300"
                />
                <div className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></div>
              </label>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
            </td>
          </tr>
        ))}
    </>
  );
}


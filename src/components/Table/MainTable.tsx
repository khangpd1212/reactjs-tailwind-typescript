import servicesProduct from "../../services/product.service";
import "../../styles/toggle.css";
import IProduct from "../../types/product.type";
interface StringArray {
  [index: string]: boolean;
}
interface Props {
  productList: IProduct[];
}
export default function MainTable({ productList }: Props): JSX.Element {

  const changeStatus = (e: React.ChangeEvent<HTMLInputElement>, key: number): void => {
    const status = e.target.checked;
    let updates: StringArray = {};
    updates[`/${key}/status`] = status;
    servicesProduct.update(updates);
  }

  const handleDeleteProduct = (key: number) => {
    return servicesProduct.delete(key)
  }

  return (
    <>
      {productList &&
        productList.map((item, key) => (
          <tbody key={item.id}>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={item.image} alt={item.image} />
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
                    onChange={(e) => changeStatus(e, key)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300"
                  />
                  <div className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></div>
                </label>
              </td>
              <td className="px-6 py-4 w-32 text-right text-sm font-medium cursor-pointer">
                <span className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </span>
                <span> / </span>
                <span className="text-red-600 hover:text-red-900" onClick={() => handleDeleteProduct(key)}>
                  Delete
                </span>
              </td>
            </tr>
          </tbody>
        ))}
    </>
  );
}


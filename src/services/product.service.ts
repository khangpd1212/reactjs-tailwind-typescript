import { ref, remove, update, push, child } from "firebase/database";
import { db } from "../firebase";
import IProduct from "../types/product.type";
class servicesProduct {
  getAll() {
    return ref(db, 'products/');
  }
  create(product: Partial<IProduct>){
    return push(child(ref(db), "products/"), product);
  }
  update(updates: Partial<IProduct>) {
    return update((ref(db, 'products/')), updates);
  }
  delete(key: number) {
    return remove(ref(db, "products/" + key));
  }
}
export default new servicesProduct()

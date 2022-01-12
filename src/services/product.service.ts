import { ref, remove, update, push, child } from "firebase/database";
import { db } from "../firebase";
import IProduct from "../types/product.type";
const servicesProduct = {
  getAll() {
    return ref(db, 'products/');
  },
  getById(id: string){
    return ref(db, 'products/' + id)
  },
  create(product: Partial<IProduct>){
    return push(child(ref(db), "products/"), product);
  },
  update(updates: Partial<IProduct>) {
    return update((ref(db, 'products/')), updates);
  },
  delete(id: string) {
    return remove(ref(db, "products/" + id));
  },
}
export default servicesProduct

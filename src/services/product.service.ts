import { ref, remove, set, update } from "firebase/database";
import { db } from "../firebase";
import IProduct from "../types/product.type";

const dbRef = ref(db, 'product/');
class servicesProduct {
  getAll() {
    return dbRef;
  }
  create(product: IProduct) {
    return set(dbRef, product);
  }
  update(updates: object) {
    return update(dbRef, updates);
  }
  delete(key: number) {
    return remove(ref(db, "product/" + key));
  }
}
export default new servicesProduct()

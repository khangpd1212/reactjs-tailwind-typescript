import { ref, remove, set, update } from "firebase/database";
import { db } from "../firebase";
import Product from "../types/product.type";

const dbRef = ref(db, 'product/');
class servicesProduct {
  getAll() {
    return dbRef;
  };
  create(product: Product){
    return set(dbRef, product)
  };
  update(updates: Partial<Product>){
    return update(dbRef, updates)
  };
  delete(key: number){
    return remove(ref(db, 'product/' + key))
  }
}
export default new servicesProduct()

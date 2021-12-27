import { ref, child, get, update, set, onValue, push } from "firebase/database";
import { db } from "../firebase";
import Product from "../types/product.type";

const dbRef = ref(db, 'product/');
class services {
  getAll() {
    return dbRef;
  }
  create(product: Product){
    return set(dbRef, product)
  };
}
export default new services

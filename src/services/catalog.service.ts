import { ref, remove, set, update } from "firebase/database";
import { db } from "../firebase";
import ICatalog from "../types/catalog.type";

const dbRef = ref(db, "catalogs/");
class servicesCatalog {
  getAll() {
    return dbRef;
  }
  create(catalog: ICatalog) {
    return set(dbRef, catalog);
  }
  update(updates: object) {
    return update(dbRef, updates);
  }
  delete(key: number) {
    return remove(ref(db, "catalogs/" + key));
  }
}
export default new servicesCatalog();

import { ref, remove, update, push, child } from "firebase/database";
import { db } from "../firebase";
import ICatalog from "../types/catalog.type";

const servicesCatalog = {
  getAll() {
    return ref(db, "catalogs/");
  },
  getById(id: string) {
    return ref(db, "catalogs/" + id);
  },
  create(product: Partial<ICatalog>) {
    return push(child(ref(db), "catalogs/"), product);
  },
  update(updates: Partial<ICatalog>) {
    return update(ref(db, "catalogs/"), updates);
  },
  delete(id: string) {
    return remove(ref(db, "catalogs/" + id));
  },
};
export default servicesCatalog;

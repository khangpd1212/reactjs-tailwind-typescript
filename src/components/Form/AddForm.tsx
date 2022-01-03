/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { onValue } from "firebase/database";
import { Fragment, useEffect, useState } from "react";
import servicesCatalog from "services/catalog.service";
import ICatalog from "types/catalog.type";
import InputUpload from "./InputUpload";

export default function AddForm() {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<ICatalog>();
  const [catalogList, setCatalogList] = useState<ICatalog[]>([]);
  
  const handleShowModal = () => {
    setOpen(true);
  };
  
  useEffect(() => {
    onValue(servicesCatalog.getAll(), (snapshot) => {
      const data = snapshot.val();
      setCatalogList(data);
      setSelected(data[0]);
    });
  }, []);

  return (
    <>
      <button
        onClick={handleShowModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
        data-modal-toggle="popup-modal"
      >
        Add product
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="p-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="mb-6 w-full">
                  <label
                    htmlFor="input-name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="input-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-offset-0 focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5"
                  />
                </div>

                <div className="flex justify-around gap-4">
                  <div className="mb-6 w-full">
                    <label
                      htmlFor="input-catalog"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Catalog
                    </label>
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative" id="input-catalog">
                        <Listbox.Button className="relative w-full p-2.5 text-left bg-gray-50 rounded-lg border border-gray-300 cursor-default outline-offset-0  focus-visible:outline-blue-500 sm:text-sm">
                          <span className="block truncate">
                            {selected?.name}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                              className="w-5 h-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {catalogList.map((person, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `${
                                    active
                                      ? "text-blue-900 bg-blue-100"
                                      : "text-gray-900"
                                  }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                }
                                value={person}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`${
                                        selected ? "font-medium" : "font-normal"
                                      } block truncate`}
                                    >
                                      {person.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`${
                                          active
                                            ? "text-blue-500"
                                            : "text-blue-500"
                                        }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                      >
                                        <CheckIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <div className="mb-6 w-full">
                    <label
                      htmlFor="input-price"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      id="input-price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-offset-0 focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="input-desc"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="input-desc"
                    rows={4}
                    className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500"
                    placeholder="Please input description..."
                  ></textarea>
                </div>

                <InputUpload title="Upload Image" />

                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-800 focus-visible:outline-blue-500  sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

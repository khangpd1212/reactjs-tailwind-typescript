import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import ICatalog from "types/catalog.type";

interface SelectProps {
  title: string;
  listItem?: ICatalog;
  selected: ICatalog;
  setSelected: React.Dispatch<React.SetStateAction<ICatalog>>;
}
export function SelectComponent({
  title,
  listItem,
  selected,
  setSelected,
}: SelectProps) {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor="input-catalog"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative" id="input-catalog">
          <Listbox.Button className="relative w-full p-2.5 text-left bg-gray-50 rounded-lg border border-gray-300 cursor-default outline-offset-0  focus-visible:outline-blue-500 sm:text-sm">
            <span className="block truncate">{selected?.name}</span>
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
              {listItem &&
                Object.values(listItem).map((list, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `${active ? "text-blue-900 bg-blue-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={list}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {list.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-blue-500" : "text-blue-500"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
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
  );
}
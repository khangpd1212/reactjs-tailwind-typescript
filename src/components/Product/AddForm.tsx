/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { onValue } from 'firebase/database';
import React, { Fragment, memo, useEffect, useState, useCallback } from 'react';
import servicesCatalog from 'services/catalog.service';
import servicesProduct from 'services/product.service';
import ICatalog from 'types/catalog.type';
import { InputComponent, InputUpload, SelectComponent, TextareaComponent } from 'components/Form';
import Button from 'components/Button';
import IProduct from 'types/product.type';
import { mapObject } from 'utils/mapObject';
function AddForm() {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<ICatalog>({
    id: '',
    name: '',
    status: true,
  });
  const [catalogList, setCatalogList] = useState<ICatalog>();
  const [inputValue, setInputValue] = useState<IProduct>({
    name: '',
    price: 1,
    description: '',
    imageUrl: '',
    status: true,
    id_catalog: selected.id,
  });

  // load full data product
  useEffect(() => {
    onValue(servicesCatalog.getAll(), (snapshot) => {
      let response = snapshot.val();
      const data = mapObject(response);
      setCatalogList(data);
      let keyFirst = Object.keys(data)[0];
      setSelected(data[keyFirst]);
    });
  }, []);

  // upload file catalog
  useEffect(() => {
    setInputValue({ ...inputValue, id_catalog: selected.id });
  }, [selected.id]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === 'price') {
      setInputValue({
        ...inputValue,
        [name]: Number(e.target.value),
      });
    }else{
      setInputValue({
        ...inputValue,
        [name]: e.target.value,
      });
    }
  };

  // upload file image
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const reader = new FileReader();
    fileList && reader.readAsDataURL(fileList?.[0]);

    reader.addEventListener('load', (event) => {
      if (!event.target) return;
      if (typeof event.target.result === 'string') {
        return setInputValue({
          ...inputValue,
          imageUrl: event.target.result,
        });
      }
    });
  };

  console.log(inputValue);
  const handleAddProduct = useCallback(() => {
    servicesProduct
      .create(inputValue)
      .then(() => {
        setOpen(false);
        setInputValue({
          name: '',
          price: 1,
          description: '',
          imageUrl: '',
          status: true,
          id_catalog: selected.id,
        });
      })
      .catch((err) => console.log(err));
  },[]);

  const handleShowModal = () => {
    setOpen(true);
  };
  
  const handleCancel = useCallback(() => {
    setOpen(false);
    setInputValue({
      name: '',
      price: 1,
      description: '',
      imageUrl: '',
      status: true,
      id_catalog: selected.id,
    });
  }, []);
  return (
    <>
      <button
        onClick={handleShowModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Add product
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
          <form className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
                <InputComponent
                  title="Name"
                  typeInput="text"
                  placehoder="Please input product name"
                  change={handleChangeInput}
                  value={inputValue.name}
                />

                <div className="flex justify-around gap-4">
                  <SelectComponent
                    title="Catalog"
                    listItem={catalogList}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <InputComponent
                    title="Price"
                    typeInput="number"
                    placehoder="Please input price"
                    min={1}
                    max={100}
                    change={handleChangeInput}
                    value={inputValue.price}
                  />
                </div>

                <TextareaComponent
                  title="Description"
                  placehoder="Please input description..."
                  change={handleChangeInput}
                  value={inputValue.description}
                />

                <InputUpload
                  title="Upload Image"
                  change={handleChangeImage}
                  imageUrl={inputValue.imageUrl}
                  ultImage={inputValue.name}
                />

                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button label="Add" nameStyle="primary" click={handleAddProduct} />
                  <Button label="Cancel" nameStyle="secondary" click={handleCancel} />
                </div>
              </div>
            </Transition.Child>
          </form>
        </Dialog>
      </Transition.Root>
    </>
  );
}
export default memo(AddForm);

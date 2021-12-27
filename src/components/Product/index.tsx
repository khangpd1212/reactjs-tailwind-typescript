import React from 'react'
import HeadingTable from "../Table/HeadingTable";
import MainTable from "../Table/MainTable";

export default function Product() {
  const title = [
    "Image",
    "Name",
    "Price",
    "Description",
    "Status",
  ]
  return (
    <div className="main-content flex flex-col flex-grow p-4">
      <h1 className="font-bold text-2xl text-gray-700">Product</h1>
      <div className="flex flex-col mt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <HeadingTable title={title} />
                <MainTable />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

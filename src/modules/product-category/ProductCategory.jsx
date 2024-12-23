import { Pagination } from "antd";
import React from "react";
import { Status } from "../../components/Status";
import { useTranslation } from "react-i18next";
import { useProductsCategoryHook } from "./hooks/useProductsCategoryHook";
import { AddNewProductCategeory } from "./AddNewProductCategeory";
import { DeleteProductCategory } from "./DeleteProductCategory";
import { EditProductCategory } from "./EditProductCategory";

export const ProductCategory = () => {
  const { t } = useTranslation();
  const {
    productCategories,
    pageCount,
    setSearchTerm,
    setCurrentPage,
  } = useProductsCategoryHook();

  // console.log(productCategories.isActive);
  
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative overflow-x-auto w-full px-10 my-20 pb-2 sm:rounded-lg">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          {t("Product category")}
        </h1>
        <AddNewProductCategeory />
      </div>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">fillter</h4>
        <div className="flex items-center gap-4">
          <input type="search" name="search" id="search" placeholder="search"
            className="border rounded outline-none py-1 px-3 w-[400px]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">{"name"}</th>
              <th scope="col" className="px-6 py-3">{"isActive"}</th>
              <th scope="col" className="px-6 py-3">{"action"}</th>
            </tr>
          </thead>
          <tbody>
            {productCategories && productCategories.map((productCategory, index) => ( 
            <tr className="bg-white border-b" key={index}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {productCategory.name}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Status value={productCategory.isActive} activeText={"yes"} inactiveText={"no"}/>
              </th>
              <td className="px-6 py-4 flex gap-3">
                <DeleteProductCategory productCategoryId={productCategory.productCategoryId} />
                <EditProductCategory productCategoryId={productCategory.productCategoryId} />
              </td>
            </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          current={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};

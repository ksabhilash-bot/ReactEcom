import React, { Fragment, useEffect, useState } from "react";
import { filterOptions, sortOptions } from "../../formconfig/index.js";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { Button } from "@/components/ui/button.jsx";
import { ArrowDownUp } from "lucide-react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/index.js";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "./productTile.jsx";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "./ProductDetails.jsx";
import { addToCart, fetchCart } from "@/store/shop/cartSlice.js";
import { toast } from "sonner";
function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}
const ShoppingListing = () => {
  const {user}=useSelector(state=>state.auth)
 
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    setSort("pricelowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);
  useEffect(() => {
    if (productDetails !== null) {
      setOpen(true);
    }
  }, [productDetails]);
  function handleAddToCart(ProductId) {
    dispatch(addToCart({userId:user.id,productId:ProductId,quantity:1})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchCart({userId:user.id}))
        toast.success("Product added to cart");
      }
    });

  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  const handleSort = (value) => {
    setSort(value);
    // Dispatch sorting logic if needed
  };

  const handleFilter = (sectionId, optionId) => {
    const newFilters = { ...filters };
    if (!newFilters[sectionId]) {
      newFilters[sectionId] = [optionId];
    } else {
      const index = newFilters[sectionId].indexOf(optionId);
      if (index === -1) {
        newFilters[sectionId].push(optionId);
      } else {
        newFilters[sectionId].splice(index, 1);
        if (newFilters[sectionId].length === 0) {
          delete newFilters[sectionId];
        }
      }
    }
    setFilters(newFilters);
    sessionStorage.setItem("filters", JSON.stringify(newFilters));
  };

  const ProductFilter = ({ filters, handleFilter }) => {
    return (
      <div className="bg-background rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Filter</h2>
        </div>
        <div className="p-4 space-y-4">
          {Object.keys(filterOptions).map((keyItem) => (
            <Fragment key={keyItem}>
              <div>
                <h3 className="font-bold">{keyItem}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option) => (
                    <label key={option.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={
                          filters &&
                          filters[keyItem] &&
                          filters[keyItem].includes(option.id)
                        }
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                        className="border border-black"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background rounded-lg shadow-sm w-full">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {productList.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-2 flex items-center gap-2"
                >
                  <ArrowDownUp />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem
                      key={item.id}
                      value={item.id}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 
  md:max-h-[70vh] lg:max-h-[75vh] overflow-auto"
        >
          {productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                handleAddToCart={handleAddToCart}
                product={productItem}
                handleGetProductDetails={handleGetProductDetails}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              No products found.
            </div>
          )}
        </div>
      </div>
      {productDetails && (
        <ProductDetailsDialog
          open={open}
          setOpen={setOpen}
          productDetails={productDetails}
        />
      )}
      
    </div>
  );
};

export default ShoppingListing;

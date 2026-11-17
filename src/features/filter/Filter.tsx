"use client";

import { Heading } from "@/components";
import { AVAILABILITY, SORT } from "@/constants/products";
import { getProductList, parseListOptions } from "../products/product-list";
import { ProductType } from "@/types/product-type";
import { Box, Label, Select } from "./components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use } from "react";

interface FilterProps {
  productsPromise: Promise<ProductType[]>;
}

const Filter = ({ productsPromise }: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const products = use(productsPromise);
  const options = parseListOptions(searchParams);
  const { total } = getProductList(products, options);

  const handleSelectChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // a new filter can leave the current page empty, so it starts again from page 1
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="py-8 grid grid-cols-4 grid-rows-2 gap-4 lg:grid-cols-[160px_repeat(3,1fr)] lg:grid-rows-1">
      <div>
        <Heading tag="h1">Shop / All</Heading>
      </div>

      <div className="row-start-2 col-span-full flex items-center gap-4 lg:row-start-1 lg:col-span-2 lg:col-start-2 lg:col-end-4">
        <Box>
          <Label htmlFor="filter">Filter</Label>
          <Select
            id="filter"
            value={options.availability ?? ""}
            onChange={(e) => handleSelectChange("availability", e.target.value)}
          >
            <option value="">Availability</option>
            <option value={AVAILABILITY.IN_STOCK}>In Stock</option>
            <option value={AVAILABILITY.OUT_OF_STOCK}>Out of Stock</option>
          </Select>
        </Box>

        <Box>
          <Label htmlFor="sort">Sort</Label>
          <Select
            id="sort"
            value={options.sort ?? ""}
            onChange={(e) => handleSelectChange("sort", e.target.value)}
          >
            <option value="">Featured</option>
            <option value={SORT.PRICE_ASC}>Price ↑</option>
            <option value={SORT.PRICE_DESC}>Price ↓</option>
          </Select>
        </Box>
      </div>

      <div className="col-start-3 col-end-5 flex justify-end lg:col-start-4">
        <span className="text-xs">{total} Products</span>
      </div>
    </section>
  );
};

export default Filter;

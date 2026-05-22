"use client";

import { Heading } from "@/components";
import { Box, Label, Select } from "./components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterProps {
  totalProducts?: number;
}

const Filter = ({ totalProducts = 0 }: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentAvailability = searchParams.get("availability") || "";
  const currentSort = searchParams.get("sort") || "";

  const handleSelectChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

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
            value={currentAvailability}
            onChange={(e) => handleSelectChange("availability", e.target.value)}
          >
            <option value="">Availability</option>
            <option value="inStock">In Stock</option>
            <option value="outStock">Out of Stock</option>
          </Select>
        </Box>

        <Box>
          <Label htmlFor="sort">Sort</Label>
          <Select
            id="sort"
            className="appearance-none"
            value={currentSort}
            onChange={(e) => handleSelectChange("sort", e.target.value)}
          >
            <option value="">Featured</option>
            <option value="mayor">Price ↑</option>
            <option value="minus">Price ↓</option>
          </Select>
        </Box>
      </div>

      <div className="col-start-3 col-end-5 flex justify-end lg:col-start-4">
        <span className="text-xs">{totalProducts} Products</span>
      </div>
    </section>
  );
};

export default Filter;

"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

interface FiltersProps {
  onFilterChange?: (filters: { search: string; status: string }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const handleChange = (newSearch: string, newStatus: string) => {
    setSearch(newSearch);
    setStatus(newStatus);
    onFilterChange?.({ search: newSearch, status: newStatus });
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="ابحث عن هاكاثون..."
            value={search}
            onChange={(e) => handleChange(e.target.value, status)}
            className="pr-10"
          />
        </div>
        <div className="flex gap-2">
          {["all", "upcoming", "ongoing", "completed"].map((statusOption) => (
            <Button
              key={statusOption}
              variant={status === statusOption ? "default" : "outline"}
              onClick={() => handleChange(search, statusOption)}
            >
              {statusOption === "all" && "الكل"}
              {statusOption === "upcoming" && "قادم"}
              {statusOption === "ongoing" && "جاري"}
              {statusOption === "completed" && "منتهي"}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

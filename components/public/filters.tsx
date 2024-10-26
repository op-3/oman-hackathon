"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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

  const statusOptions = [
    { value: "all", label: "الكل" },
    { value: "upcoming", label: "قادم" },
    { value: "ongoing", label: "جاري" },
    { value: "completed", label: "منتهي" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-sm bg-background/80 rounded-xl p-4 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            placeholder="ابحث عن هاكاثون..."
            value={search}
            onChange={(e) => handleChange(e.target.value, status)}
            className="pr-10 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
          />
        </div>

        <div className="flex gap-2">
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 ml-2" />
                  {statusOptions.find((opt) => opt.value === status)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {statusOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleChange(search, option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden sm:flex gap-2">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={status === option.value ? "default" : "outline"}
                onClick={() => handleChange(search, option.value)}
                className="min-w-[80px] transition-all duration-200 hover:scale-105"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

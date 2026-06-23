"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Block {
  id: string;
  name: string;
}

interface BedFilterClientProps {
  blocks: Block[];
}

export function BedFilterClient({ blocks }: BedFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(filterType, value);
    } else {
      params.delete(filterType);
    }
    startTransition(() => {
      router.push(`/beds?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    startTransition(() => {
      router.push("/beds");
    });
  };

  return (
    <section className="sticky top-[64px] z-40 bg-background py-2 border-b border-outline-variant">
      <div className="flex items-center gap-2 px-4 md:px-6 overflow-x-auto max-w-6xl mx-auto">
        <button
          onClick={handleClearFilters}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-full font-label-caps text-xs whitespace-nowrap shadow-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Filters
        </button>
        <div className="h-6 w-px bg-outline-variant mx-1"></div>
        <button
          onClick={() =>
            handleFilterChange("status", searchParams.get("status") ? "" : "available")
          }
          disabled={isPending}
          className="px-4 py-2 border border-outline-variant rounded-full font-label-caps text-xs whitespace-nowrap text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container transition-colors active:scale-95 disabled:opacity-50"
        >
          Status
        </button>
        <button
          onClick={() =>
            handleFilterChange("block", searchParams.get("block") ? "" : "blockA")
          }
          disabled={isPending}
          className="px-4 py-2 border border-outline-variant rounded-full font-label-caps text-xs whitespace-nowrap text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container transition-colors active:scale-95 disabled:opacity-50"
        >
          Block
        </button>
        <button
          onClick={() =>
            handleFilterChange("gender", searchParams.get("gender") ? "" : "mixed")
          }
          disabled={isPending}
          className="px-4 py-2 border border-outline-variant rounded-full font-label-caps text-xs whitespace-nowrap text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container transition-colors active:scale-95 disabled:opacity-50"
        >
          Gender
        </button>
        <button
          onClick={() => router.push("/beds")}
          disabled={isPending}
          className="px-4 py-2 border border-outline-variant rounded-full font-label-caps text-xs whitespace-nowrap text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container transition-colors active:scale-95 disabled:opacity-50"
        >
          Price
        </button>
      </div>
    </section>
  );
}

"use client"

import { Cross1Icon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"
import { useEffect } from "react"

import { Button } from "~/components/ui/button"
import { useColumnFilters } from "~/context/column-filter-context"
import { useBreeds } from "~/hooks/dogs/useBreeds"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { data: breeds } = useBreeds()
  const { setColumnFilters } = useColumnFilters()

  const tableColumnFilters = table.getState().columnFilters

  useEffect(
    () => setColumnFilters(tableColumnFilters),
    [setColumnFilters, tableColumnFilters]
  )

  const isFiltered = tableColumnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("breed") && (
          <DataTableFacetedFilter
            column={table.getColumn("breed")}
            title="Breed"
            options={breeds}
          />
        )}
        {table.getColumn("age") && (
          <DataTableFacetedFilter
            column={table.getColumn("age")}
            title="Age"
            options={[...Array(15).keys()].map((age) => age.toString())}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross1Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

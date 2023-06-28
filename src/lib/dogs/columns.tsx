"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Dog } from "~/lib/interfaces"

export const columns: ColumnDef<Dog>[] = [
  {
    accessorKey: "img",
    header: "Image",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "breed",
    header: "Breed",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "zip_code",
    header: "ZIP Code",
  },
]

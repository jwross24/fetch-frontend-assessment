"use client"

import { type ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { type Dog } from "~/lib/interfaces"

export const columns: ColumnDef<Dog>[] = [
  {
    accessorKey: "img",
    header: "Image",
    cell: ({ row }) => {
      const imgUrl: string = row.getValue("img")
      const name: string = row.getValue("name")

      return (
        <Image
          src={imgUrl}
          alt={name}
          width={100}
          height={0}
          className="h-auto rounded-md"
        />
      )
    },
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

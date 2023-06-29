"use client"

import { type ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { type Dog } from "~/lib/interfaces"
import { DataTableColumnHeader } from "./data-table-column-header"

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
          width={96}
          height={0}
          className="h-auto w-24 rounded-md"
        />
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "breed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Breed" />
    ),
    cell: ({ row }) => <div className="w-[210px]">{row.getValue("breed")}</div>,
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("age")}</div>,
  },
  {
    id: "zipCode",
    accessorKey: "zip_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ZIP Code" />
    ),
    enableSorting: false,
  },
]

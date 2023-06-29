import { type ColumnFiltersState } from "@tanstack/react-table"
import React from "react"

type State = ColumnFiltersState

interface ColumnFilterProviderProps {
  children: React.ReactNode
}

const ColumnFilterStateContext = React.createContext<
  | {
      columnFilters: State
      setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
    }
  | undefined
>(undefined)

function ColumnFilterProvider({ children }: ColumnFilterProviderProps) {
  const [columnFilters, setColumnFilters] = React.useState<State>([])
  const value = { columnFilters, setColumnFilters }

  return (
    <ColumnFilterStateContext.Provider value={value}>
      {children}
    </ColumnFilterStateContext.Provider>
  )
}

function useColumnFilters() {
  const context = React.useContext(ColumnFilterStateContext)

  if (context === undefined) {
    throw new Error(
      "useColumnFilters must be used within a ColumnFilterProvider"
    )
  }

  return context
}

export { ColumnFilterProvider, useColumnFilters }

import React from "react"

type Action =
  | { type: "PAGE_CHANGED"; payload: number }
  | { type: "PAGE_SIZE_CHANGED"; payload: number }
  | { type: "TOTAL_COUNT_CHANGED"; payload: number }

type Dispatch = (action: Action) => void

interface State {
  pageIndex: number
  pageSize: number
  totalCount: number
}

interface PaginationProviderProps {
  children: React.ReactNode
}

const PaginationStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

function paginationReducer(state: State, { type, payload }: Action) {
  switch (type) {
    case "PAGE_CHANGED": {
      return { ...state, pageIndex: payload }
    }
    case "PAGE_SIZE_CHANGED": {
      return { ...state, pageSize: payload }
    }
    case "TOTAL_COUNT_CHANGED": {
      return { ...state, totalCount: payload }
    }
  }
}

function PaginationProvider({ children }: PaginationProviderProps) {
  const [state, dispatch] = React.useReducer(paginationReducer, {
    pageIndex: 0,
    pageSize: 25,
    totalCount: -1,
  })
  const value = { state, dispatch }

  return (
    <PaginationStateContext.Provider value={value}>
      {children}
    </PaginationStateContext.Provider>
  )
}

function usePagination() {
  const context = React.useContext(PaginationStateContext)

  if (context === undefined) {
    throw new Error("usePagination must be used within a PaginationProvider")
  }

  return context
}

export { PaginationProvider, usePagination }

import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons"
import { useState } from "react"

import { Button } from "~/components/ui/button"

interface FavoriteButtonProps {
  id: string
}

export function FavoriteButton({ id }: FavoriteButtonProps) {
  const [storageItem, setStorageItem] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  )

  const isFavorited = storageItem.includes(id)

  const handleToggleFavorite = () => {
    if (!isFavorited) {
      const newStorageItem = [...storageItem, id]
      setStorageItem(newStorageItem)
      localStorage.setItem("favorites", JSON.stringify(newStorageItem))
    } else {
      const newStorageItem = storageItem.filter((savedId) => savedId !== id)
      setStorageItem(newStorageItem)
      localStorage.setItem("favorites", JSON.stringify(newStorageItem))
    }
  }

  return (
    <Button
      variant="ghost"
      className="p-0 transition-transform duration-100 hover:scale-110"
      onClick={handleToggleFavorite}
    >
      {isFavorited ? (
        <HeartFilledIcon className="text-red-700" />
      ) : (
        <HeartIcon className="text-red-700" />
      )}
    </Button>
  )
}

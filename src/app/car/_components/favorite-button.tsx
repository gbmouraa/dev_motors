"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoHeartFill } from "react-icons/go";
import { AuthContext } from "@/context/auth-context";
import {
  addCarToFavorites,
  getFavoriteCarsID,
  removeCarFromFavorites,
} from "@/lib/firebase/car";
import { toast } from "sonner";

interface FavoriteButtonProps {
  carId: string;
  userUid: string;
}

export function FavoriteButton({ carId, userUid }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      if (!user?.uid) return;

      const snapshot = await getFavoriteCarsID(user.uid);
      setIsFavorite(snapshot.includes(carId));
    };

    fetch();
  }, [user?.uid]);

  const handleFavoriteCar = async () => {
    if (!user) {
      router.push("/register");
      return;
    }

    if (isFavorite) {
      try {
        await removeCarFromFavorites(carId, user.uid);
        setIsFavorite(false);
        toast.success("Removido de favoritos");
      } catch (err) {
        toast.error("Não foi possível concluir essa ação no momento.");
        console.error(err);
      }
      return;
    }

    try {
      await addCarToFavorites(carId, user.uid);
      setIsFavorite(true);
      toast.success("Adicionado aos favoritos");
    } catch (err) {}
  };

  return (
    <div>
      {user?.uid !== userUid && (
        <button
          className={`absolute top-8 right-10 cursor-pointer transition-colors ${
            isFavorite ? "text-red-500" : "text-gray-300"
          } ${!isFavorite && "hover:text-red-500"}`}
          onClick={handleFavoriteCar}
        >
          <GoHeartFill size={24} />
        </button>
      )}
    </div>
  );
}

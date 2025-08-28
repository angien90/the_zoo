import { useState, useEffect } from "react";
import type { Animal } from "../models/Animal";

export const useAnimal = (id: string | undefined) => {
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch("/animals.json")
      .then(res => res.json())
      .then((data: Animal[]) => {
        const found = data.find(a => a.id === Number(id)) || null;
        setAnimal(found);
      })
      .catch(console.error);
  }, [id]);

  return animal;
};
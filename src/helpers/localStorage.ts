export const saveAnimalData = (animalId: number, key: "lastFed" | "lastPetted", value: number) => {
  localStorage.setItem(`animal-${animalId}-${key}`, value.toString());
};

export const getAnimalData = (animalId: number, key: "lastFed" | "lastPetted"): number | null => {
  const value = localStorage.getItem(`animal-${animalId}-${key}`);
  return value ? parseInt(value) : null;
};
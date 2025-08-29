// Gör så att mata och klappa statusen sparas i localhost. Även om datorn startas om eller sidan uppdateras kan man fortsätta ta hand om djuren.

export const saveAnimalData = (animalId: number, key: "lastFed" | "lastPetted", value: number) => {
  localStorage.setItem(`animal-${animalId}-${key}`, value.toString());
};

export const getAnimalData = (animalId: number, key: "lastFed" | "lastPetted"): number | null => {
  const value = localStorage.getItem(`animal-${animalId}-${key}`);
  return value ? parseInt(value) : null;
};
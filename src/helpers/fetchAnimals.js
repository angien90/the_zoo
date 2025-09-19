// Används för att ladda ner Animals från API:t till animals.json

import fs from "fs";
import fetch from "node-fetch";

const url = "https://animals.azurewebsites.net/api/animals";

const fetchAndSaveAnimals = async () => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    fs.writeFileSync("animals.json", JSON.stringify(data, null, 2));
    console.log("Datan sparad i animals.json ✅");
  } catch (err) {
    console.error("Fel vid hämtning eller skrivning av filen:", err);
  }
};

fetchAndSaveAnimals();
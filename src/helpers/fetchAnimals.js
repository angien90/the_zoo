// Används för att ladda ner Animals från API:t till animals.json

import fs from "fs";
import fetch from "node-fetch";

const url = "https://animals.azurewebsites.net/api/animals";

fetch(url)
  .then(res => res.json())
  .then(data => {
    fs.writeFileSync("animals.json", JSON.stringify(data, null, 2));
    console.log("Datan sparad i animals.json ✅");
  })
  .catch(err => console.error(err));
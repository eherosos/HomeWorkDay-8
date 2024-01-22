const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let products = [
   {
      id: 1,
      price: 300,
   },
];
let mainIndex = 1;

app.get("/", (req, res) => {
   res.json("its home");
});

app.get("/products", (req, res) => {
   res.json(products);
});

app.post("/products", (req, res) => {
   products.push({
      id: ++mainIndex,
      ...req.body,
   });
   res.json(products);
});

app.put("/products/:id", (req, res) => {
   const id = req.params.id;
   const index = products.findIndex((p) => p.id == id);
   if (index < 0) res.json("Updated");
   products[index] = {
      id: products[index].id,
      ...req.body,
   };
   res.json(products);
});

app.delete("/products/:id", (req, res) => {
   const id = req.params.id;
   products = products.filter((p) => p.id != id);
   res.json(products);
});

app.listen(port, () => {
   console.log(`running on port: ${port}`);
});

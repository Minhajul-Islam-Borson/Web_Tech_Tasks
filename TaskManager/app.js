const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [];
let idCounter = 1;

app.post("/api/products", (req, res) => {
  const { name, quantity, description, status } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Product name is required" });
  }
  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({ error: "Quantity must be a non-negative number" });
  }

  const newProduct = {
    id: idCounter++,
    name,
    quantity,
    description: description || "",
    status: status || "Available"
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.patch("/api/products/:id/status", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });

  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "Status is required" });

  product.status = status;
  res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
  const productIndex = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ error: "Product not found" });

  const deletedProduct = products.splice(productIndex, 1);
  res.json({ message: "Product deleted", product: deletedProduct[0] });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

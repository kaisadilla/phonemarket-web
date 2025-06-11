export async function fetchProductList () {
  console.log("Fetch product list.");
  const res = await fetch("https://itx-frontend-test.onrender.com/api/product");

  if (!res.ok) {
    throw new Error("Request error. Status: " + res.status);
  }

  const products = await res.json();
  return products.filter(p => p.price); // Remove products with no price, as they can't be sold.
}

export async function fetchProduct (id) {
  console.log("Fetch product.");
  const res = await fetch(
    "https://itx-frontend-test.onrender.com/api/product/" + id
  );

  if (!res.ok) {
    throw new Error("Request error. Status: " + res.status);
  }

  return await res.json();
}

export async function addToCart (id, color, storage) {
  console.log("Add to cart.", id, color, storage);
  const res = await fetch('https://itx-frontend-test.onrender.com/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      colorCode: color,
      storageCode: storage,
    })
  });

  if (!res.ok) {
    throw new Error("Request error. Status: " + res.status);
  }

  return await res.json();
}
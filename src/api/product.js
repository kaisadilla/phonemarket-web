const ENDPOINT_URL = import.meta.env.VITE_API_BASE_URL;
  
export async function fetchProductList () {
  console.info("REQUEST: Fetch product list.");
  const res = await fetch(`${ENDPOINT_URL}/product`);

  if (!res.ok) {
    throw new Error("Request error. Status: " + res.status);
  }

  const products = await res.json();
  return products.filter(p => p.price); // Remove products with no price, as they can't be sold.
}

export async function fetchProduct (id) {
  console.info("REQUEST: Fetch product.", id);
  const res = await fetch(`${ENDPOINT_URL}/product/${id}`);

  if (!res.ok) {
    throw new Error("Request error. Status: " + res.status);
  }

  return await res.json();
}

export async function addToCart (id, color, storage) {
  console.info("REQUEST: Add to cart.", id, color, storage);
  const res = await fetch(`${ENDPOINT_URL}/cart`, {
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
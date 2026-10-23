import coffee from "../data/coffee";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// Replace these with fetch() calls when you have a real API.
export async function getCoffees() {
  await delay(200);
  return coffee;
}

export async function getCoffeeById(id) {
  await delay(100);
  return coffee.find((c) => c.id === Number(id)) ?? null;
}
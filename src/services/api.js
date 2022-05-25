export async function getCategories() {
  // Implemente aqui
  const fetchCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const jsonCategories = await fetchCategories.json();
  return jsonCategories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const fetchproducts = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId} &q=${query}`);
  const jsonProducts = await fetchproducts.json();
  return jsonProducts;
}

export async function getProductsFromID(PRODUCT_ID) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const fetchproducts = await fetch(`https://api.mercadolibre.com/items/${PRODUCT_ID}`);
  const jsonProducts = await fetchproducts.json();
  return jsonProducts;
}

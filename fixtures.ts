import { test as base } from "@playwright/test";
import { SearchProductsPage } from "./src/pages/search-products.page";

export const test = base.extend<{ searchProductsPage: SearchProductsPage }>({
  searchProductsPage: async ({ page }, use) => {
    await use(new SearchProductsPage(page));
  },
});

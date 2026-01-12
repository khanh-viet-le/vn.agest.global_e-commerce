import { expect } from "playwright/test";
import searchData from "../data/searchData.json";
import { test } from "../fixtures";

test.describe("Search Functionality", () => {
  for (const searchItem of searchData) {
    test(`Search test for ${searchItem.term}`, async ({
      searchProductsPage,
    }) => {
      // Go to the /products page.
      await searchProductsPage.goto();

      // Enter the search term from the JSON.
      await searchProductsPage.searchProduct(searchItem.term);

      // Verify the "Searched Products" title is visible.
      await expect
        .soft(await searchProductsPage.getTitle())
        .toBe("Searched Products");

      // Count the product items and compare with expectedCount.
      await expect(await searchProductsPage.getProductItemsCount()).toBe(
        searchItem.expectedCount
      );
    });
  }
});

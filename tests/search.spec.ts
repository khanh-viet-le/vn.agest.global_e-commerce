import test, { expect } from "playwright/test";
import searchData from "../data/searchData.json";

test.describe("Search Functionality", () => {
  for (const searchItem of searchData) {
    test(`Search test for ${searchItem.term}`, async ({ page }) => {
      // Go to the /products page.
      await page.goto("/products");

      // Enter the search term from the JSON.
      await page.fill("#search_product", searchItem.term);

      // Click the search button (Note: on mobile, you might need to ensure the element is visible).
      await page.click("#submit_search");

      // Verify the "Searched Products" title is visible.
      await expect(
        page.locator("//h2[contains(@class, 'title')]")
      ).toBeVisible();

      // Count the product items and compare with expectedCount.
      await expect(page.locator("//*[@class= 'single-products']")).toHaveCount(
        searchItem.expectedCount
      );
    });
  }
});

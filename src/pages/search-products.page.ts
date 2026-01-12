import { Locator, Page } from "@playwright/test";

export class SearchProductsPage {
  private static route = "/products";
  private page: Page;
  private searchInputLocator: Locator;
  private submitSearchButtonLocator: Locator;
  private searchedProductsTitleLocator: Locator;
  private productItemsLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInputLocator = page.locator("#search_product");
    this.submitSearchButtonLocator = page.locator("#submit_search");
    this.searchedProductsTitleLocator = page.locator(
      "//h2[contains(@class, 'title')]"
    );
    this.productItemsLocator = page.locator("//*[@class= 'single-products']");
  }

  async goto() {
    await this.page.goto(SearchProductsPage.route);
  }

  async searchProduct(term: string) {
    await this.searchInputLocator.fill(term);
    await this.submitSearchButtonLocator.click();
  }

  async getTitle(): Promise<string> {
    return this.searchedProductsTitleLocator.evaluate((el) => el.textContent);
  }

  async getProductItemsCount(): Promise<number> {
    return this.productItemsLocator.count();
  }
}

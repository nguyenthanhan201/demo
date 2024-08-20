import { expect, test } from '@playwright/test';

test.describe('Product Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/catalog');
  });

  test('should have title "Danh sách sản phẩm"', async ({ page }) => {
    await expect(page).toHaveTitle('Danh sách sản phẩm');

    // listCatalog.forEach(async (item) => {
    //   await expect(page.locator('div').filter({ hasText: new RegExp(`^${item}$`) })).toBeVisible();
    // });
  });

  test('should render list products', async ({ page }) => {
    // catalog - list - products;
    const listProducts = page.locator('#catalog-list-products');

    const childs = await listProducts.locator('img').count();
    // console.log('👌  childs:', childs);

    expect(childs).toBeGreaterThan(0);
  });

  test('should have filter', async ({ page }) => {
    const checkbox = page.locator('.custom-checkbox').nth(0);
    const realCheckbox = page.locator('.custom-checkbox input').nth(0);
    console.log('👌  realCheckbox:', realCheckbox);

    await checkbox.check();

    await expect(realCheckbox).toBeChecked();
  });
});

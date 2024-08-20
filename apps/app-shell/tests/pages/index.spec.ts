import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have title "Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi"', async ({
    page
  }) => {
    await expect(page).toHaveTitle('Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi');

    await expect(
      page.getByRole('link', {
        name: 'Sản phẩm'
      })
    ).toBeVisible();
  });

  test('should render list brands', async ({ page }) => {
    const listBrands = await page.locator('#list-brands');

    const childs = await listBrands.locator('a').count();
    // console.log('👌  childs:', childs);

    expect(childs).toBeGreaterThan(0);
  });

  test('should direct to product page when click on "Sản phẩm" link', async ({ page }) => {
    await page
      .getByRole('link', {
        name: 'Sản phẩm'
      })
      .click();
    await expect(page).toHaveTitle('Danh sách sản phẩm');
  });
});

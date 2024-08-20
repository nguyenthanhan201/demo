import { testHttp } from '@/lib/msw/testHttp';
import { productData } from '@/utils/index';

testHttp.get('api/v1/product', {
  data: productData.getAllProducts()
});

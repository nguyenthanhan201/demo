import { testHttp } from '@/lib/msw/testHttp';
import { brandData } from '@/utils/index';

testHttp.get('api/v1/brand', {
  data: brandData.getAllBrands()
});

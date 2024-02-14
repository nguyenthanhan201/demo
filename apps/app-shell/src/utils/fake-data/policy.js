import { CreditCardOutlined as CreditCardOutlinedIcon } from '@repo/icons/src/CreditCardOutlined';
import { DiamondOutlined as DiamondOutlinedIcon } from '@repo/icons/src/DiamondOutlined';
import { LocalMallOutlined as LocalMallOutlinedIcon } from '@repo/icons/src/LocalMallOutlined';
import { VolunteerActivismOutlined as VolunteerActivismOutlinedIcon } from '@repo/icons/src/VolunteerActivismOutlined';

const policy = [
  {
    name: 'Miễn phí giao hàng',
    description: 'Miễn phí ship với đơn hàng > 239K',
    icon: <LocalMallOutlinedIcon fontSize='inherit' />
  },
  {
    name: 'Thanh toán COD',
    description: 'Thanh toán khi nhận hàng (COD)',
    icon: <CreditCardOutlinedIcon fontSize='inherit' />
  },
  {
    name: 'Khách hàng VIP',
    description: 'Ưu đãi dành cho khách hàng VIP',
    icon: <DiamondOutlinedIcon fontSize='inherit' />
  },
  {
    name: 'Hỗ trợ bảo hành',
    description: 'Đổi, sửa đồ tại tất cả store trên toàn quốc',
    icon: <VolunteerActivismOutlinedIcon fontSize='inherit' />
  }
];

export default policy;

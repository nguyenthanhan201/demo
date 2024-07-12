import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import Button from '@/components/shared/Button';
import Img from '@/components/shared/Img/Img';
import { PaymentTypes } from '@/types/order.type';

type SelectPaymentProps = {
  value: PaymentTypes;
  setValue: (value: PaymentTypes) => void;
  btnOrderProps: ComponentPropsWithoutRef<'button'>;
};

const SelectPayment = ({ btnOrderProps, setValue, value }: SelectPaymentProps) => {
  return (
    <div className='flex flex-col'>
      <FormControl>
        <p className='mb-2'>Chọn phương thức thanh toán</p>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='female'
          name='radio-buttons-group'
          onChange={(e) => setValue(e.target.value as PaymentTypes)}
          value={value}
        >
          <FormControlLabel
            control={<Radio />}
            label={
              <Img
                alt='https://pay.vnpay.vn/images/brands/logo-en.svg'
                height={36}
                src='https://pay.vnpay.vn/images/brands/logo-en.svg'
                width={131}
              />
            }
            value='vnpay'
          />
          <FormControlLabel
            control={<Radio />}
            label={
              <Img
                alt='https://developers.momo.vn/v3/img/logo.svg'
                height={40}
                src='https://developers.momo.vn/v3/img/logo.svg'
                width={40}
              />
            }
            value='momo'
          />
          <FormControlLabel
            control={<Radio />}
            label={
              <Img
                alt='https://docs.zalopay.vn/images/logo-zalopay.svg'
                height={42}
                src='https://docs.zalopay.vn/images/logo-zalopay.svg'
                width={86}
              />
            }
            value='zalopay'
          />
        </RadioGroup>
      </FormControl>
      <div className='mt-4 space-x-2'>
        <Button size='block' {...btnOrderProps}>
          đặt hàng
        </Button>
        <Link href='/' prefetch={false}>
          <Button size='block'>tiếp tục mua hàng</Button>
        </Link>
      </div>
    </div>
  );
};

export default SelectPayment;

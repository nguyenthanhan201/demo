import { useRouter } from 'next/router';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input/Input';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { ICreateBrandResponse } from '@/types/brand.type';

const Page = () => {
  const router = useRouter();

  const { auth } = useAuthStore(['auth']);

  const formSubmit = async (e: any) => {
    e.preventDefault();
    const { name, logo } = e.target;
    if (!auth?._id) return;

    try {
      const BrandServices = await import('@/lib/repo/brand.repo').then((res) => res.BrandServices);

      const newBrand: ICreateBrandResponse = await BrandServices.createBrand({
        name: name.value,
        logo: logo.value,
        createdByUserId: auth._id
      });

      router.push(`/builder/${newBrand.createdByUserId}`);
    } catch (error) {
      console.log('error', error);
      alert('Tạo thương hiệu thất bại');
    }
  };

  return (
    <form onSubmit={formSubmit}>
      <Input label='name' name='name' placeholder='Tên thương hiệu' required type='text' />

      <Input
        label='logo'
        name='logo'
        pattern='https?://.+'
        placeholder='Nhập url logo'
        required
        title='Nhập đúng định dạng url'
        type='text'
      />
      <Button style={{ width: '100%', marginTop: '20px' }} type='submit'>
        Tạo
      </Button>
    </form>
  );
};

export default Page;
Page.Layout = DefaultLayout;

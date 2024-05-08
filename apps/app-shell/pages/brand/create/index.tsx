import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input/Input';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { BrandServices } from '@/lib/repo/brand.repo';
import { registerBrandSchema } from '@/lib/schema/formSchema';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { Brand, ICreateBrandResponse } from '@/types/brand.type';

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Brand>({
    resolver: yupResolver(registerBrandSchema),
    defaultValues: {
      logo: '',
      name: ''
    }
  });
  const router = useRouter();

  const { auth } = useAuthStore(['auth']);

  const formSubmit = async (data: Brand) => {
    if (!auth?._id) return;

    try {
      const newBrand: ICreateBrandResponse = await BrandServices.createBrand({
        ...data,
        createdByUserId: auth._id
      });

      router.push(`/builder/${newBrand.createdByUserId}`);
    } catch (error) {
      console.log('error', error);
      alert('Tạo thương hiệu thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <Input
        {...register('name')}
        error={errors.name?.message}
        label='name'
        name='name'
        placeholder='Tên thương hiệu'
        type='text'
      />

      <Input
        {...register('logo')}
        error={errors.logo?.message}
        label='logo'
        name='logo'
        placeholder='logo'
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

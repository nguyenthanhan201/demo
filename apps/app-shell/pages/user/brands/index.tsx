import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import Button from '@/components/shared/Button';
import Img from '@/components/shared/Img/Img';
import UserLayout from '@/layouts/user-layout/UserLayout';
import { setContext } from '@/lib/axios/http';
import { BrandServices } from '@/lib/repo/brand.repo';
import { Brand } from '@/types/brand.type';
import { NextPageWithLayout } from '@/types/index';

const Page: NextPageWithLayout<{
  data: Brand[];
}> = ({ data }) => {
  // console.log('👌  data:', data);
  if (data.length === 0)
    return (
      <Link href='/brand/create'>
        <Button>tham gia hợp tác</Button>
      </Link>
    );

  return (
    <table className='table'>
      <tbody>
        {data.map((brand) => (
          <tr className='table__item' key={brand._id}>
            <td>{brand.name}</td>
            <td>
              <Img alt={brand.logo} height={100} src={brand.logo} width={100} />
            </td>
            <td>
              <div className='flex justify-center items-center gap-3'>
                <Link href={`/brand/${brand._id}/edit`}>Sửa</Link>
                Xoá
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Page;
Page.Layout = UserLayout;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  setContext(ctx);
  const res = await BrandServices.getBrandsByUserId();

  if (res.code === 'SUCCESS') return { props: { data: res.data } };
  return { props: { data: [] } };
}

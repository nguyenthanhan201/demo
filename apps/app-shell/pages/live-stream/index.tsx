import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query';

import Button from '@/components/shared/Button';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { queryClient } from '@/lib/react-query/queryClient';
import { LiveStream } from '@/lib/redux/types/liveStream.type';
import { LiveStreamServices } from '@/lib/repo/live-stream';

const Page = (pageProps: PageProps<{ rooms: LiveStream[] }>) => {
  const { dehydratedState } = pageProps;
  const rooms: LiveStream[] = dehydratedState.queries.at(0)?.state.data;
  const router = useRouter();

  return (
    <div className='justify-center flex gap-2 py-4'>
      {rooms?.map((room) => (
        <Button
          key={room._id}
          onClick={() => {
            router.push(`/live-stream/${room.roomId}`);
          }}
          type='button'
        >
          Tham gia phòng {room.roomId}
        </Button>
      ))}
    </div>
  );
};

export async function getServerSideProps(_ctx: NextPageContext) {
  await queryClient.prefetchQuery('roomsQuery', async () => await LiveStreamServices.getAllRooms());
  return {
    props: JSON.parse(
      JSON.stringify({
        dehydratedState: dehydrate(queryClient)
      })
    ) as PageProps<{ rooms: LiveStream[] }>
  };
}

export default Page;
Page.Layout = DefaultLayout;

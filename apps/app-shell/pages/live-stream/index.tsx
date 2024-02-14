import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import Button from '@/components/shared/Button';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { setContext } from '@/lib/axios/requests';
import { LiveStreamServices } from '@/lib/repo/live-stream';
import { NextPageWithLayout } from '@/types/index';
import { LiveStream } from '@/types/liveStream.type';

const Page: NextPageWithLayout<{
  rooms: LiveStream[];
}> = ({ rooms }) => {
  const router = useRouter();

  return (
    <div className='justify-center flex gap-2 py-4'>
      {rooms?.map((room) => (
        <Button
          key={room._id}
          onClick={() => router.push(`/live-stream/${room.roomId}`)}
          type='button'
        >
          Tham gia phòng {room.roomId}
        </Button>
      ))}
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  setContext(ctx);

  const rooms = await LiveStreamServices.getAllRooms();
  return {
    props: {
      rooms
    }
  };
}

export default Page;
Page.Layout = DefaultLayout;

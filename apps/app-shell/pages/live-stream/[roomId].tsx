import { HMSRoomProvider } from '@100mslive/react-sdk';
import { GetServerSidePropsContext } from 'next';

import LiveStreamPage from '@/components/index/livestream/LiveStreamPage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { setContext } from '@/lib/axios/requests';
import { LiveStreamServices } from '@/lib/repo/live-stream';
import { NextPageWithLayout } from '@/types/index';
import { LiveStream } from '@/types/liveStream.type';

const Page: NextPageWithLayout<{
  rooms: LiveStream[];
}> = ({ rooms }) => {
  return (
    <HMSRoomProvider>
      <LiveStreamPage rooms={rooms} />
    </HMSRoomProvider>
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

import { HMSRoomProvider } from '@100mslive/react-sdk';
import { NextPageContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import LiveStreamPage from '@/components/index/livestream/LiveStreamPage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { LiveStreamServices } from '@/lib/repo/live-stream';
import { LiveStream } from '@/types/liveStream.type';

const Page = (pageProps: PageProps<{ rooms: LiveStream[] }>) => {
  const { dehydratedState } = pageProps;
  const rooms: LiveStream[] = dehydratedState.queries.at(0)?.state.data;
  return (
    <HMSRoomProvider>
      <LiveStreamPage rooms={rooms} />
    </HMSRoomProvider>
  );
};

export async function getServerSideProps(_ctx: NextPageContext) {
  const queryClient = new QueryClient();
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

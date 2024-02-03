import { NextPageContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import LiveStreamPage from '@/components/index/livestream/LiveStreamPage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { LiveStream } from '@/lib/redux/types/liveStream.type';
import { LiveStreamServices } from '@/lib/repo/live-stream';

const Page = (pageProps: PageProps<{ rooms: LiveStream[] }>) => {
  const { dehydratedState } = pageProps;
  const rooms: LiveStream[] = dehydratedState.queries.at(0)?.state.data;
  return <LiveStreamPage rooms={rooms} />;
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

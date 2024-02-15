import dynamic from 'next/dynamic';
import { selectIsConnectedToRoom, useHMSStore } from 'nextjs-module-livestream/100mslive';

import { LiveStream } from '@/types/liveStream.type';

const JoinRoom = dynamic(() => import('./components/JoinRoom'), { ssr: false });
const Room = dynamic(() => import('./components/Room'), { ssr: false });

const LiveStreamPage = ({ rooms }: { rooms: LiveStream[] }) => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  return <>{isConnected ? <Room /> : <JoinRoom rooms={rooms} />}</>;
};

export default LiveStreamPage;

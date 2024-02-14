import { selectIsConnectedToRoom, useHMSStore } from '@100mslive/react-sdk';
import dynamic from 'next/dynamic';

import { LiveStream } from '@/types/liveStream.type';

const JoinRoom = dynamic(() => import('./components/JoinRoom'), { ssr: false });
const Room = dynamic(() => import('./components/Room'), { ssr: false });

const LiveStreamPage = ({ rooms }: { rooms: LiveStream[] }) => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  // const hmsActions = useHMSActions();

  // useEffect(() => {
  //   window.onunload = () => {
  //     if (isConnected) {
  //       hmsActions.leave();
  //     }
  //   };
  // }, [hmsActions, isConnected]);

  return <>{isConnected ? <Room /> : <JoinRoom rooms={rooms} />}</>;
};

export default LiveStreamPage;

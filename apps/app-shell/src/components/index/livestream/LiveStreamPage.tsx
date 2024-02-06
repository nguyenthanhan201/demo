import { selectIsConnectedToRoom, useHMSStore } from '@100mslive/react-sdk';
import dynamic from 'next/dynamic';

import { LiveStream } from '@/types/liveStream.type';

const JoinRoom = dynamic(() => import('./components/JoinRoom'));
const Room = dynamic(() => import('./components/Room'));

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

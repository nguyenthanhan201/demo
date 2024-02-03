import { selectIsConnectedToRoom, useHMSStore } from '@100mslive/react-sdk';

import { LiveStream } from '@/lib/redux/types/liveStream.type';

import JoinRoom from './components/JoinRoom';
import Room from './components/Room';

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

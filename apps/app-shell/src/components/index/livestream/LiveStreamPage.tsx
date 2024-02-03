import { selectIsConnectedToRoom, useHMSStore } from '@100mslive/react-sdk';

import JoinRoom from './components/JoinRoom';
import Room from './components/Room';

const LiveStreamPage = () => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  // const hmsActions = useHMSActions();

  // useEffect(() => {
  //   window.onunload = () => {
  //     if (isConnected) {
  //       hmsActions.leave();
  //     }
  //   };
  // }, [hmsActions, isConnected]);

  return <>{isConnected ? <Room /> : <JoinRoom />}</>;
};

export default LiveStreamPage;

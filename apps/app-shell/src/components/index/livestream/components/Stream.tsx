import { selectLocalPeer, selectPeers, useHMSStore } from '@100mslive/react-sdk';

import HlsView from './HlsView';
import VideoTile from './VideoTile';

// type CustomHMSPeerType = HMSPeer & {
//   roleName: RoleLiveStream;
// };

const Stream = () => {
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);

  return (
    <>
      {localPeer?.roleName === 'viewer-realtime' ? <HlsView /> : null}
      <div className='stream'>
        {localPeer?.roleName === 'broadcaster'
          ? peers
              .filter((peer) => peer.roleName === 'broadcaster')
              .map((peer) => <VideoTile key={peer.id} peer={peer} peers={peers} />)
          : null}
      </div>
    </>
  );
};

export default Stream;

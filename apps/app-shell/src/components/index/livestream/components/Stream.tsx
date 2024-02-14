import { selectLocalPeer, selectPeers, useHMSStore } from '@100mslive/react-sdk';
import dynamic from 'next/dynamic';

import VideoTile from './VideoTile';

// type CustomHMSPeerType = HMSPeer & {
//   roleName: RoleLiveStream;
// };

const DynamicHlsView = dynamic(() => import('./HlsView'), { ssr: false });

const Stream = () => {
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);

  return (
    <>
      {localPeer?.roleName === 'viewer-realtime' ? <DynamicHlsView /> : null}
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

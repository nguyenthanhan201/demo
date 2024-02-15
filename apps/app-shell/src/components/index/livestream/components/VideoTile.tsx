import { HMSPeer, useVideo } from 'nextjs-module-livestream/100mslive';

const VideoTile = ({ peer, peers }: { peer: HMSPeer; peers: HMSPeer[] }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack
  });

  const numberOfBroadCasters = () => {
    const broadcasters = peers.filter((peer) => {
      return peer.roleName === 'broadcaster';
    });
    return broadcasters.length;
  };

  return (
    <video
      autoPlay
      className={numberOfBroadCasters() >= 2 ? 'video' : ''}
      muted
      playsInline
      ref={videoRef}
    />
  );
};

export default VideoTile;

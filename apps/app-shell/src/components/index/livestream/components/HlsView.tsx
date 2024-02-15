import { selectHLSState, useHMSStore } from 'nextjs-module-livestream/100mslive';
import Hls from 'nextjs-module-livestream/Hls';
import { ElementRef, useEffect, useRef } from 'react';

const HlsView = () => {
  const videoRef = useRef<ElementRef<'video'>>(null);
  const hlsState = useHMSStore(selectHLSState);
  const hlsUrl = hlsState.variants[0]?.url;
  useEffect(() => {
    if (videoRef.current && hlsUrl) {
      const browserHasNativeHLSSupport = videoRef.current.canPlayType(
        'application/vnd.apple.mpegurl'
      );
      if (Hls.isSupported()) {
        let hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(videoRef.current);
      } else if (browserHasNativeHLSSupport) {
        videoRef.current.src = hlsUrl;
      }
    }
  }, [hlsUrl]);
  return <video autoPlay controls ref={videoRef} />;
};

export default HlsView;

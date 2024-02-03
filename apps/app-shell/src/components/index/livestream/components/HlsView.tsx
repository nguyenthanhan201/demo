import { selectHLSState, useHMSStore } from '@100mslive/react-sdk';
import Hls from 'hls.js';
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

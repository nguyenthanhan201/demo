import {
  selectHLSState,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectLocalPeer,
  useHMSActions,
  useHMSStore
} from '@100mslive/react-sdk';
import {
  LogoutOutlined,
  MicNoneOutlined,
  MicOffOutlined,
  PodcastsOutlined,
  StopCircleOutlined,
  VideocamOffOutlined,
  VideocamOutlined
} from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

const Controls = () => {
  const hmsActions = useHMSActions();
  const hlsState = useHMSStore(selectHLSState);
  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const localPeer = useHMSStore(selectLocalPeer);

  const startHLSStreaming = async () => {
    try {
      await hmsActions.startHLSStreaming();
    } catch (err) {
      alert(`failed to start hls ${err}`);
    }
  };

  const stopHLSStreaming = async () => {
    try {
      await hmsActions.stopHLSStreaming();
    } catch (err) {
      alert(`failed to stop hls ${err}`);
    }
  };

  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!audioEnabled);
  };

  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!videoEnabled);
  };

  const leaveRoom = async () => {
    await hmsActions.setLocalAudioEnabled(!audioEnabled);
    await hmsActions.setLocalVideoEnabled(!videoEnabled);
    if (localPeer?.roleName === 'broadcaster') {
      hmsActions.leave();
      await hmsActions.stopHLSStreaming();
    } else {
      hmsActions.leave();
    }
  };

  return (
    <div className='controls'>
      {localPeer?.roleName === 'broadcaster' ? (
        <>
          <IconButton onClick={toggleAudio}>
            {audioEnabled ? <MicNoneOutlined /> : <MicOffOutlined />}
          </IconButton>
          <IconButton onClick={toggleVideo}>
            {videoEnabled ? <VideocamOutlined /> : <VideocamOffOutlined />}
          </IconButton>
          <Button className='leave' disableElevation onClick={leaveRoom} variant='contained'>
            <LogoutOutlined /> Leave Room
          </Button>
          {hlsState.running ? (
            <Button
              className='leave'
              disableElevation
              onClick={stopHLSStreaming}
              variant='contained'
            >
              <StopCircleOutlined /> Stop Streaming
            </Button>
          ) : (
            <Button disableElevation onClick={startHLSStreaming} variant='contained'>
              <PodcastsOutlined /> Go Live
            </Button>
          )}
        </>
      ) : (
        <Button className='leave' disableElevation onClick={leaveRoom} variant='contained'>
          <LogoutOutlined /> Leave Room
        </Button>
      )}
    </div>
  );
};

export default Controls;

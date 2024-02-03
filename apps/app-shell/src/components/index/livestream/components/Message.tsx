import { HMSMessage, selectLocalPeer, useHMSStore } from '@100mslive/react-sdk';

const Message = ({ message }: { message: HMSMessage }) => {
  const localPeer = useHMSStore(selectLocalPeer);

  return (
    <div className={`message ${message.senderUserId === localPeer?.customerUserId && 'myMessage'}`}>
      <span>{message.senderName}</span>
      <p>{message.message}</p>
    </div>
  );
};

export default Message;

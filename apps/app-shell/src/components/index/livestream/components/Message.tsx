import type { HMSMessage } from 'nextjs-module-livestream/100mslive';
import { selectLocalPeer, useHMSStore } from 'nextjs-module-livestream/100mslive';

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

import dynamic from 'next/dynamic';
import {
  HMSPeer,
  selectHMSMessages,
  selectPeers,
  useHMSActions,
  useHMSStore
} from 'nextjs-module-livestream/100mslive';
import { useState } from 'react';

const DynamicMessage = dynamic(() => import('./Message'), { ssr: false });

const ChatNdParticipants = () => {
  const messages = useHMSStore(selectHMSMessages);
  const hmsActions = useHMSActions();
  const peers: Array<HMSPeer> = useHMSStore(selectPeers);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hmsActions.sendBroadcastMessage(message);
    setMessage('');
  };

  const [selectedOption, setSelectedOption] = useState('chat');
  const [message, setMessage] = useState('');

  return (
    <div className='rightBox md:w-full'>
      <div className='rightBox__head'>
        <span
          className={selectedOption === 'chat' ? 'selected' : ''}
          onClick={() => setSelectedOption('chat')}
        >
          Chat
        </span>
        <span
          className={selectedOption === 'participants' ? 'selected' : ''}
          onClick={() => setSelectedOption('participants')}
        >
          Participants
        </span>
      </div>
      <div className='rightBox__optionView'>
        {selectedOption === 'chat' ? (
          <>
            <div className='rightBox__chats'>
              {/* Messages */}
              {messages.length >= 1
                ? messages.map((msg: any) => <DynamicMessage key={msg.id} message={msg} />)
                : null}
            </div>
            <form name='send-messge' onSubmit={handleSubmit}>
              <input
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Write your message'
                value={message}
              />
            </form>
          </>
        ) : null}
        {selectedOption === 'participants' ? (
          <div className='rightBox__participants'>
            {/* Participants */}
            {peers.map((peer) => (
              <div className='rightBox__participant' key={peer.id}>
                {peer.name}
                <p>{peer.roleName}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatNdParticipants;

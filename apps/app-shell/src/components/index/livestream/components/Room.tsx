import ChatNdParticipants from './ChatNdParticipants';
import Controls from './Controls';
import Stream from './Stream';

const Room = () => {
  return (
    <div className='room md:flex-col'>
      <div className='room__streamSpace'>
        <Stream />
        <Controls />
      </div>
      <ChatNdParticipants />
    </div>
  );
};

export default Room;

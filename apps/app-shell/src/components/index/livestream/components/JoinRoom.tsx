import { useHMSActions } from '@100mslive/react-sdk';
import { useRouter } from 'next/router';

import Button from '@/components/shared/Button';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { LiveStreamServices } from '@/lib/repo/live-stream';

const JoinRoom = () => {
  const { roomId } = useRouter().query;
  const hmsActions = useHMSActions();
  const auth = useAppSelector((state) => state.auth.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let roomData = null;
      if (auth) {
        roomData = await LiveStreamServices.getRoomData();
      }

      const isBroadcaster = auth ? roomData?.userId === auth?._id : false;

      const response = await fetch(`${process.env.NEXT_PUBLIC_100MS_TOKEN_ENDPOINT}api/token`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: `${Date.now()}`,
          role: isBroadcaster ? 'broadcaster' : 'viewer-realtime',
          type: 'app',
          room_id: roomId
        })
      });
      const { token } = await response.json();
      // Joining the room
      hmsActions.join({
        userName: auth?.name || 'Anonymous',
        authToken: token
      });
    } catch (error) {
      console.log('error', error);
      alert(error);
    }
  };

  return (
    <form className='w-full flex' onSubmit={handleSubmit}>
      {/* <input
        type='text'
        required
        placeholder='Enter name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <select
        type='text'
        required
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        placeholder='Select Role'
      >
        <option>broadcaster</option>
        <option>viewer-realtime</option>
      </select> */}
      <Button className='mx-auto' type='submit'>
        Tham gia phòng
      </Button>
    </form>
  );
};

export default JoinRoom;

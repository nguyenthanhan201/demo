import { useRouter } from 'next/router';
import { useHMSActions } from 'nextjs-module-livestream/100mslive';

import Button from '@/components/shared/Button';
import { LiveStreamServices } from '@/lib/repo/live-stream';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { LiveStream } from '@/types/liveStream.type';

const JoinRoom = ({ rooms }: { rooms: LiveStream[] }) => {
  const router = useRouter();
  const { roomId } = router.query;
  const hmsActions = useHMSActions();
  const { auth } = useAuthStore(['auth']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let roomData = null;
      if (auth) {
        roomData = await LiveStreamServices.getRoomData();
      }

      const isBroadcaster = auth ? roomData?.metadata.userId === auth?._id : false;

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
    <>
      <div className='justify-center flex gap-2 py-4'>
        {rooms?.map((room) => (
          <Button
            key={room._id}
            onClick={() => router.push(`/live-stream/${room.roomId}`)}
            type='button'
          >
            Tham gia phòng {room.roomId}
          </Button>
        ))}
      </div>
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
    </>
  );
};

export default JoinRoom;

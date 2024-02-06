import { LiveStream } from '../../types/liveStream.type';
import { get } from '../axios/requests';

export class LiveStreamRepository {
  async getRoomData() {
    const res = await get<LiveStream>(`/live-stream`);

    if (res.code === 'SUCCESS') {
      return res.data;
    }

    return undefined;
  }

  async getAllRooms() {
    const res = await get<LiveStream[]>(`/live-stream/all`);

    if (res.code === 'SUCCESS') {
      return res.data;
    }

    console.log('Error fetching all rooms', res.error);
    return undefined;
  }
}
export const LiveStreamServices = new LiveStreamRepository();

import { LiveStream } from '../../types/liveStream.type';
import { get } from '../axios/requests';

export class LiveStreamRepository {
  async getRoomData() {
    const res = await get<LiveStream>(`api/v1/live-stream`);

    if (res.code === 'ERROR') throw new Error(res.error.message);

    return res.data;
  }

  async getAllRooms() {
    const res = await get<LiveStream[]>(`api/v1/live-stream/all`);

    if (res.code === 'ERROR') throw new Error(res.error.message);

    return res.data;
  }
}
export const LiveStreamServices = new LiveStreamRepository();

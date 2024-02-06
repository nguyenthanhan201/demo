import { BasedModel } from '.';

export type RoleLiveStream = 'broadcaster' | 'viewer-realtime';

export interface LiveStream extends BasedModel {
  roomId: string;
  userId: string;
}

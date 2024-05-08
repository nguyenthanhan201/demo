import axios from 'axios';

import { SightengineResponse } from '@/types/sightengine';

export class SightengineRepository {
  async validateImage(imageUrl: string): Promise<boolean> {
    return axios
      .get<SightengineResponse>('https://api.sightengine.com/1.0/check.json', {
        params: {
          url: imageUrl,
          models: 'nudity-2.0',
          api_user: '477573814',
          api_secret: 'sHLVWd9chFBubfoSiZ6Yin6fFxYQqCyu'
        }
      })
      .then((response) => {
        if (response.data.nudity.none >= 0.9) return true;
        else return false;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}
export const SightengineServices = new SightengineRepository();

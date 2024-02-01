import { useRouter } from 'next/router';

import en from '../../../public/lang/en';
import vi from '../../../public/lang/vi';

export type TranslatedHeader = keyof typeof vi.header;

const useTrans = () => {
  const { locale } = useRouter();

  const trans = locale === 'vi' ? vi : en;

  return trans;
};

export default useTrans;

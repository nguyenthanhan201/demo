import Typography from '@mui/material/Typography';
import { memo } from 'react';

import { colors } from '@/lib/theme/theme';

type HeaderProps = {
  title: string;
  subtitle: string;
};
const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className='mb-[30px]'>
      <Typography color={colors.grey[100]} fontWeight='bold' sx={{ m: '0 0 5px 0' }} variant='h2'>
        {title}
      </Typography>
      <Typography color={colors.greenAccent[400]} variant='h5'>
        {subtitle}
      </Typography>
    </div>
  );
};

export default memo(Header);

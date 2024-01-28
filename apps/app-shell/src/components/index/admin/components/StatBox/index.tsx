import { Box, Typography, useTheme } from '@mui/material';

import { tokens } from '../../../../../lib/theme/theme';
import ProgressCircle from '../ProgressCircle';

type StatBoxProps = {
  title: string;
  subtitle: string;
  icon: any;
  progress: string;
  increase: string;
};

const StatBox = ({ title, subtitle, icon, progress, increase }: StatBoxProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m='0 30px' width='100%'>
      <Box display='flex' justifyContent='space-between'>
        <Box>
          {icon}
          <Typography fontWeight='bold' sx={{ color: colors.grey[100] }} variant='h4'>
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display='flex' justifyContent='space-between' mt='2px'>
        <Typography sx={{ color: colors.greenAccent[500] }} variant='h5'>
          {subtitle}
        </Typography>
        <Typography fontStyle='italic' sx={{ color: colors.greenAccent[600] }} variant='h5'>
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;

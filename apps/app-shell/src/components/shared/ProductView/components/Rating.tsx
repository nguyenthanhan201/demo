import RatingMUI, { RatingProps } from '@mui/material/Rating';
import { memo } from 'react';

const Rating = (props: RatingProps) => <RatingMUI {...props} />;

export default memo(Rating);

import Avatar from '@mui/material/Avatar';
import RatingMUI from '@mui/material/Rating';

import { formatDate } from '@/lib/helpers/time';
import { Rating } from '@/types/rating.type';

import Modal from '../../Modal/Modal';

type Props = {
  ratings: Rating[];
  onClose: () => void;
  open: boolean;
};
const ModalSeeComments = ({ ratings, onClose, open }: Props) => {
  // console.log('👌  ratings:', ratings);
  return (
    <Modal handleClose={onClose} open={open}>
      <>
        {ratings.length > 0 ? (
          <>
            <h1 className='mb-3'>Đánh giá sản phẩm</h1>
            <div>
              {ratings.map((item, index: number) => (
                <div className='product-rating' key={index}>
                  <Avatar sx={{ width: 24, height: 24 }}>{item.idAuth.name.charAt(0)}</Avatar>
                  <div className='product-rating__main'>
                    <div>
                      <p>{item.idAuth.name}</p>
                      <RatingMUI readOnly size='small' value={item.rating} />
                      <p className='product-rating__time'>{formatDate(item.updatedAt, 'date')}</p>
                    </div>
                    {/* eslint-disable-next-line react/no-danger */}
                    <p dangerouslySetInnerHTML={{ __html: item.comment }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </>
    </Modal>
  );
};

export default ModalSeeComments;

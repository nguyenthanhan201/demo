import ModalMUI from '@mui/material/Modal';
import React from 'react';

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  children: any;
};

const Modal = React.forwardRef((props: ModalProps, _ref) => {
  return (
    <ModalMUI keepMounted={false} onClose={props.handleClose} open={props.open}>
      <div className='modal'>{props.children}</div>
    </ModalMUI>
  );
});

Modal.displayName = 'Modal';

export default Modal;

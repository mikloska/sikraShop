import * as React from 'react';
import {Box, Modal, Button, Typography} from '@material-ui/core';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SizeModal =({modalOpen, handleModalOpen, handleModalClose, img, text})=> {

  return (
    <div>
      <Button style={{marginTop:10, margin:0}} variant='contained' onClick={handleModalOpen}>{`${text} Size Guide`}</Button>
      <Modal open={modalOpen} onClose={handleModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <img style={{width:'100%'}} src={img}/>
        </Box>
      </Modal>
    </div>
  );
}

export default SizeModal
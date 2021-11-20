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

const NecklaceModal =({modalOpen, handleModalOpen, handleModalClose})=> {

  return (
    <div>
      <Button variant='contained' onClick={handleModalOpen}>Chain Size Guide</Button>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img style={{width:'100%'}}src='https://sikra.s3.us-east-2.amazonaws.com/necklaces/necklace-guide.jpg'/>
        </Box>
      </Modal>
    </div>
  );
}

export default NecklaceModal
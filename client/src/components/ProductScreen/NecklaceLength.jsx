import React, {useState} from 'react'
import{FormControl, Select, MenuItem, InputLabel}  from '@material-ui/core/'
 import SizeModal from './SizeModal';

const NecklaceLength = ({formControlClass, setLength}) => {
    //For necklace sizing modal
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
  return(
    <div>
      <FormControl className={formControlClass} value={length} >
        <InputLabel>Length</InputLabel>
        <Select defaultValue='15' onChange={e=>setLength(e.target.value)}>
          <MenuItem value={15}>15"</MenuItem>
          <MenuItem value={16}>16"</MenuItem>
          <MenuItem value={18}>18"</MenuItem>
        </Select>
      </FormControl>
    <SizeModal modalOpen={modalOpen} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} img={'https://sikra.s3.us-east-2.amazonaws.com/necklaces/necklace-guide.jpg'}/>
  </div>
  )
}

export default NecklaceLength
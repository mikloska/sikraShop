import React, {useState} from 'react'
import{List, FormControl, Select, MenuItem, FormLabel}  from '@material-ui/core/'
 import SizeModal from './SizeModal';

const NecklaceLength = ({formControlClass, setLength}) => {
    //For necklace sizing modal
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
  return(
    <div>
      <List>
        <FormControl className={formControlClass} value={length} >
          <FormLabel>Length</FormLabel>
          <Select defaultValue='18' onChange={e=>setLength(e.target.value)}>
            <MenuItem value={15}>15"</MenuItem>
            <MenuItem value={16}>16"</MenuItem>
            <MenuItem value={18}>18"</MenuItem>
          </Select>
        </FormControl>
      </List>
    <SizeModal modalOpen={modalOpen} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} 
    img={'https://sikra.s3.us-east-2.amazonaws.com/necklaces/necklace-guide.jpg'} text={'Chain'}/>
  </div>
  )
}

export default NecklaceLength
import React, {useState} from 'react'
import{ListItem, FormControl, Select, MenuItem, InputLabel}  from '@material-ui/core/'
 import NecklaceModal from './NecklaceModal';

const NecklaceLength = ({formControlClass, setLength}) => {
    //For necklace sizing modal
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
  return(
    <div>
    <ListItem>
      <FormControl className={formControlClass} value={length} >
        <InputLabel>Length</InputLabel>
        <Select defaultValue='15' onChange={e=>setLength(e.target.value)}>
          <MenuItem value={15}>15"</MenuItem>
          <MenuItem value={16}>16"</MenuItem>
          <MenuItem value={18}>18"</MenuItem>
        </Select>
      </FormControl>
    </ListItem>
    <NecklaceModal modalOpen={modalOpen} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} />
  </div>
  )
}

export default NecklaceLength
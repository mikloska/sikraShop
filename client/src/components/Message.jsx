import React, {useState} from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';

const Message = ({severity, children}) => {
  const [alertTitle, setAlertTitle] = useState('Error')
  return (
    <Alert severity={severity} style={{width:'100%'}}>{children}</Alert>
    // <Alert severity={severity}><AlertTitle>{alertTitle}</AlertTitle>{children}</Alert>
  )
}

Message.defaultProps={severity: 'info'}
export default Message
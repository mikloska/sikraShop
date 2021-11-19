import React from 'react'
import{Button}  from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    background:'linear-gradient(120deg, #28ccc4, #067e78)',
    margin: theme.spacing(3, 0, 2),
  },

}));

const CustomButton = ({text, onClick, disabled}) => {
  const classes = useStyles();
  return(
    <div>
      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={onClick} disabled={disabled}>
        {text}
      </Button>
    </div>
  )
}

export default CustomButton
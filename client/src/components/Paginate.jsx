import React, {useState, useEffect} from 'react'
import {Pagination, PaginationItem} from '@material-ui/lab';
import { useHistory } from "react-router-dom";
import { Grid } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '', handleScrollClick }) => {
  let history = useHistory();
  const [paginationPage, setpaginationPage] = React.useState(page);
  const handleChange = (event, value) => {
    // history.push()
    if(!isAdmin){
      if(keyword){
        history.push(`/search/${keyword}/page${value}`)
        // setpaginationPage(value);
      }else{
        history.push(`/page${value}`)
      }
    }else if(isAdmin && keyword){
      history.push(`/admin/productlist/${keyword}/page${value}`)
    }else{
      history.push(`/admin/productlist/page${value}`)
    }

    handleScrollClick()
    setpaginationPage(value);
    
  };
  // useEffect
  return (
    pages > 1 && (
      <Grid item lg={11} md={11} style={{display:'flex',justifyContent:'center'}} >
        <Pagination count={pages} page={page} onChange={handleChange}/>
      </Grid>

    )
  )
}

export default Paginate
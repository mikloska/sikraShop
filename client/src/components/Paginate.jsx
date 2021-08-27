import React, {useState, useEffect} from 'react'
import {Pagination, PaginationItem} from '@material-ui/lab';
import { useHistory } from "react-router-dom";
import { Link } from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  let history = useHistory();
  const [paginationPage, setpaginationPage] = React.useState(page);
  const handleChange = (event, value) => {
    // history.push()
    if(!isAdmin){
      if(keyword){
        history.push(`/search/${keyword}/page/${value}`)
        // setpaginationPage(value);
      }else{
        history.push(`/page/${value}`)
      }
    }else{
      history.push(`/admin/productlist/${value}`)
    }

    
    setpaginationPage(value);
    
  };
  // useEffect
  return (
    pages > 1 && (
      <Pagination count={pages} page={page} onChange={handleChange}/>

    )
  )
}

export default Paginate
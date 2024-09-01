import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const Paginate = ({pageNumber,totalNumberOfPages,isAdmin=false,keyword}) => {
  return (
    totalNumberOfPages > 1 && (
        <Pagination>
          {
             [...Array(totalNumberOfPages).keys()].map((x)=>(
                <LinkContainer 
                key={x+1}
                to={isAdmin? `/admin/productList/${x+1}` :keyword ? `/search/${keyword}/page/${x+1}`: `/page/${x+1}`}>
                    <Pagination.Item active={x+1 === pageNumber}>{x+1}</Pagination.Item>
                </LinkContainer>
             ))
          }
        </Pagination>
    )
  )
}

export default Paginate
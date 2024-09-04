import React from 'react'
import { Helmet } from 'react-helmet-async'
const Meta = ({title='Welcome to Perennial Mart',description='A reliable and continously available ecommerce site',keywords='fast,perenial,mart,ecommerce'}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
    </Helmet>
  )
}

export default Meta

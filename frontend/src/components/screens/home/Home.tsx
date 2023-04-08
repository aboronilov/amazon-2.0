import React, { FC } from 'react'

import Meta from '@/ui/Meta'
import Catalog from '@/ui/catalog/Catalog'
import { TypePaginationProducts } from '@/types/product.interface'

const Home: FC<TypePaginationProducts> = ({products}) => {
  return (
    <Meta title="Home">
      {/* Carousel */}
      <Catalog products={products} title="Trending now" />
    </Meta>
  )
}

export default Home
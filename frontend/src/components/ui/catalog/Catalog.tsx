import React from 'react'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'
import Loader from '../Loader'
import ProductItem from './product-item/ProductItem'
import Heading from '../Heading'

interface ICatalog {
   products: IProduct[]
   isLoading?: boolean
   title?: string
}

const Catalog: FC<ICatalog> = ({
	products,
	isLoading,
   title,
}) => {
	if (isLoading) {
		return <Loader />
	}
	return (
		<section>
         {title ? <Heading>{title}</Heading> : null}
			{products?.map(item => (
				<ProductItem key={item.id} product={item} />
			))}
		</section>
	)
}

export default Catalog

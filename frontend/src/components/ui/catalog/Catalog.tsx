import React from 'react'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import Heading from '../Heading'
import Loader from '../Loader'

import ProductItem from './product-item/ProductItem'

interface ICatalog {
	products: IProduct[]
	isLoading?: boolean
	title?: string
}

const Catalog: FC<ICatalog> = ({ products, isLoading, title }) => {
	if (isLoading) {
		return <Loader />
	}
	return (
		<section>
			{title ? <Heading className='mb-4'>{title}</Heading> : null}
			<div className='grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
				{products?.map(item => (
					<ProductItem key={item.id} product={item} />
				))}
			</div>
		</section>
	)
}

export default Catalog

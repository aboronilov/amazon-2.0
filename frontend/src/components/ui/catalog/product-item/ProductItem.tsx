import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import { getRating } from '@/utils/getRating'

import AddToCartButton from './AddToCartButton'
import ProductRating from './ProductRating'

const DynamicFavoriteButton = dynamic(() => import('./FavoriteButton'), {
	ssr: false
})

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	const { id, name, slug, price, images, category, reviews, about } = product
	const rating = getRating()
	const reviewsCounter = reviews?.length || 0
	const description = about.split('|').slice(0, 3)
	return (
		<div>
			<div className='bg-white rounded-xl relative'>
            <div className="absolute top-2 right-2 z-10">
               <DynamicFavoriteButton productId={id} />
               <AddToCartButton product={product} />
            </div>
				<Link href={`/products/${slug}`}>
					<Image src={images[0]} width={300} height={300} alt={slug} />
				</Link>
			</div>

			<Link href={`/products/${slug}`}>
				<h3 className='mb-1'>{name}</h3>
				<div className='text-xs my-2 cursor-pointer'>
					<ul>
						{description.map((item, i) => (
							<li key={i} className='list-disc list-inside text-xs'>
								{item}
							</li>
						))}
					</ul>
				</div>
			</Link>

			<Link
				href={`/category/${category.slug}`}
				className='capitalize text-aqua text-sm mb-2'
			>
				{category.name}
			</Link>

			<div>
				<ProductRating rating={rating} />
				{reviewsCounter > 0 ? <span>({reviewsCounter} reviews)</span> : null}
			</div>
			<div>{price}</div>
		</div>
	)
}

export default ProductItem

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'
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
		<div className='hover:scale-105 hover:opacity-90 transition'>
			<div className='bg-white rounded-xl relative overflow-hidden'>
				<div className='absolute top-2 right-3 z-10 flex gap-2'>
					<DynamicFavoriteButton productId={id} />
					<AddToCartButton product={product} />
				</div>
				<Link href={`/products/${slug}`}>
					<div className='h-56'>
						<Image
							src={images[0]}
							fill
							alt={slug}
							style={{ objectFit: 'contain' }}
						/>
					</div>
				</Link>
			</div>

			<Link
				href={`/category/${category.slug}`}
				className='text-aqua text-xs my-2'
			>
				{category.name.toLocaleUpperCase()}
			</Link>

			<Link href={`/products/${slug}`}>				
				<h3 className='my-2 h-20 max-h-full line-clamp-3 font-semibold'>
					{name}
				</h3>
				<div className='text-xs my-2 cursor-pointer'>
					<ul>
						{description.map((item, i) => (
							<li
								key={i}
								className='list-disc list-inside text-xs line-clamp-1'
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			</Link>

			<div className='flex items-center'>
				<ProductRating rating={rating} />
				<span className='text-secondary ml-1 text-sm mt-1'>
					{rating.toFixed(1)}
				</span>
				{reviewsCounter > 0 ? (
					<span className='text-xs'>({reviewsCounter} reviews)</span>
				) : null}
			</div>

			<div className='text-xl font-bold'>{convertPrice(price)}</div>
		</div>
	)
}

export default ProductItem

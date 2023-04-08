import React, { FC } from 'react'
import { RiShoppingCartLine, RiShoppingCartFill } from 'react-icons/ri'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/types/product.interface'

const AddToCartButton: FC<{ product: IProduct }> = ({ product }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()
	const currentElement = items.find(item => item.product.id === product.id)
	return (
		<div>
			<button
            className='text-primary'
				onClick={() =>
					currentElement
						? removeFromCart({ id: currentElement.id })
						: addToCart({
								product,
								quantity: 1,
                        price: product.price
						  })
				}
			>
				{currentElement ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
			</button>
		</div>
	)
}

export default AddToCartButton

import React, { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

const ProductRating: FC<{ rating: number }> = ({ rating }) => {
	return (
		<span>
			<Rating
				readonly
				initialValue={rating}
				SVGstyle={{ display: 'inline-block' }}
				size={20}
				allowFraction
				transition
			/>
		</span>
	)
}

export default ProductRating

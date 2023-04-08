import React, { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

const ProductRating: FC<{ rating: number }> = ({ rating }) => {
	return (
		<div>
			<span>
				<Rating
					readonly
					initialValue={rating}
					SVGstyle={{ display: 'inline-block' }}
					size={34}
					allowFraction
					transition
				/>
				<span className='text-red '>{rating.toFixed(1)}</span>
			</span>
		</div>
	)
}

export default ProductRating

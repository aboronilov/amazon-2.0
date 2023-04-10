import React, { Dispatch, SetStateAction } from 'react';
import { EnumProductSort } from '@/services/product/product.types';


type Props = {
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

const SortDropdown = ({ sortType, setSortType }: Props) => {
	return (
		<div className='text-right'>
			<select 
				className='mb-4 text-sm px-1 py-1 rounded-md opacity-70 text-primary cursor-pointer transition'
				value={sortType} 
				onChange={(e) => setSortType(e.target.value as any)}			
			>
				{(
					Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
				).map(item => {
					return (
						<option 
							key={item} 
							value={EnumProductSort[item]}
							// selected={sortType === EnumProductSort[item]}
							// onChange={() => setSortType(EnumProductSort[item])}
						>
							{EnumProductSort[item]}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default SortDropdown
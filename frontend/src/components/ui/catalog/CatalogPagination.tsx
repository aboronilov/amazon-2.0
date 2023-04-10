import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FC } from 'react';
import { IProduct, TypePaginationProducts } from '@/types/product.interface';
import Heading from '../Heading';
import Loader from '../Loader';
import Button from '../button/Button';
import SortDropdown from './SortDropdown';
import ProductItem from './product-item/ProductItem';
import { ProductService } from '@/services/product/product.service';
import { EnumProductSort, TypeData } from '@/services/product/product.types';


interface ICatalogPagination {
	data: TypePaginationProducts
	title?: string
	isPagination?: boolean
}

const Catalog: FC<ICatalogPagination> = ({
	data,
	title,
	isPagination = false
}) => {
	const [sortType, setSortType] = useState<EnumProductSort>(EnumProductSort.NEWEST)
	// const [page, setPage] = useState(1)

	const {data:response, isLoading} = useQuery(
		['products', sortType],
		() => ProductService.getAll({
			// page,
			// perPage: 4,
			sort: sortType
		}),
		{
			initialData: data,
			// keepPreviousData: true
		}
	)

	if (isLoading) {
		return <Loader />
	}
	return (
		<section>
			{title ? <Heading className='mb-4'>{title}</Heading> : null}
			{isPagination ? <SortDropdown setSortType={setSortType} sortType={sortType}/> : null}
			{response?.products.length ? (
				<>
					<div className='grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
						{response?.products?.map(item => (
							<ProductItem key={item.id} product={item} />
						))}
					</div>
					<div className='text-center mt-12'>
						{/* {isPagination ? (
							<Button 
								variant='orange' 
								size="sm"
								onClick={() => setPage(page + 1)}
							>
								Load more
							</Button>
							) : null} */}
					</div>
				</>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default Catalog
import React, { FC } from 'react'

import Meta from '@/ui/Meta'
import CatalogPagination from '@/ui/catalog/CatalogPagination'
import Layout from '@/ui/layout/layout'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { TypePaginationProducts } from '@/types/product.interface'
import Catalog from '@/ui/catalog/Catalog'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
	const { user } = useAuth()
	const { logout } = useActions()
	return (
		<Meta title='Home'>
			<Layout>
				{!!user && <button onClick={() => logout()}>Logout</button>}
				<CatalogPagination data={{products, length}} title='Trending now' isPagination />
				{/* <Catalog products={products} title='Trending now'/> */}
			</Layout>
		</Meta>
	)
}

export default Home

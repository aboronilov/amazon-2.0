import * as React from 'react'

import Header from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

const Layout: React.FunctionComponent<React.PropsWithChildren<unknown>> = ({
	children
}) => {
	return (
		<div
			className='grid grid-cols-2'
			style={{ gridTemplateColumns: '1fr 4fr' }}
		>
			<Sidebar />
			<div>
				<Header />
				<main className='p-12'>{children}</main>
			</div>
		</div>
	)
}

export default Layout

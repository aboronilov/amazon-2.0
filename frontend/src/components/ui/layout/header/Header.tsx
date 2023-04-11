import Search from '@/../pages/q'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = props => {
	return (
		<header 
			className='bg-secondary w-full p-6 grid' 
			style={{gridTemplateColumns: "1fr 3fr 1.2fr"}}
		>
			<Link href="/">
				<Image 
					src='/logotype.png'
					width={150}
					height={30}
					alt="Amazon logo"
					// style={{opacity:"90%"}}
				/>
			</Link>
			<Search />
			<div className="flex items-center justify-end gap-10">
				<Link href="/favorites" className="text-white">
					<AiOutlineHeart size={28} />
				</Link>
				<HeaderCart />
				<HeaderProfile />
			</div>			
		</header>
	)
}

export default Header

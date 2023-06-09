import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from './auth-pages.type'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyUser },
	children
}) => {
	const { user } = useAuth()
	const router = useRouter()

	if (user && isOnlyUser) {
		return <>{children}</>
	} else {
      router.pathname !== 'auth' && router.replace('/auth')
      return null
   }
}

export default CheckRole

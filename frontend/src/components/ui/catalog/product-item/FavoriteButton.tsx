import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { userProfile } from '@/hooks/useProfile'

import { UserService } from '@/services/user.service'

const FavoriteButton: FC<{ productId: string }> = ({ productId }) => {
	const { profile } = userProfile()
	const isExist = profile?.favorites?.some(item => item.id === productId)
	const queryClient = useQueryClient()
	const { mutate } = useMutation(
		['toggle favorite'],
		() => UserService.toggleFavorite(productId),
		{
			onSuccess() {
				queryClient.invalidateQueries(['get profile'])
			}
		}
	)

	if (!profile) {
		return null
	}
	return (
		<div>
			<button onClick={() => mutate()} className='text-primary'>
				{isExist ? <AiFillHeart /> : <AiOutlineHeart />}
			</button>
		</div>
	)
}

export default FavoriteButton

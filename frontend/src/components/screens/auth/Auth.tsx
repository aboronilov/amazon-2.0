import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'

import Heading from '@/ui/Heading'
import Loader from '@/ui/Loader'
import Meta from '@/ui/Meta'
import Button from '@/ui/button/Button'
import Field from '@/ui/input/Field'

import { IEmailPassword } from '@/store/user/user.interface'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { validEmail } from './valid-email'
import { useAuthRedirect } from './useAuthRedurect'

type Props = {}

const Auth = (props: Props) => {
   useAuthRedirect()

	const { isLoading } = useAuth()
	const { login, register } = useActions()
	const [type, setType] = useState<'login' | 'register'>('login')
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IEmailPassword> = data => {
		if (type === 'login') {
			login(data)
		} else {
			register(data)
		}
		reset()
	}

	return (
		<Meta title='Auth'>
			<section className='flex h-screen'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='rounded-lg bg-white shadow-sm p-8 m-auto'
				>
					<Heading className='capitalize text-center mb-4'>{type}</Heading>

					<Field
						{...formRegister('email', {
							required: 'Email is required',
							pattern: {
								value: validEmail,
								message: 'Please enter valid email'
							}
						})}
						placeholder='Email'
						error={errors.email?.message}
					/>
					<Field
						{...formRegister('password', {
							required: 'password is required',
							minLength: {
								value: 6,
								message: 'Min length should be 6 characters'
							}
						})}
						type='password'
						placeholder='Password'
						error={errors.password?.message}
					/>
					<Button
						type="submit"
						variant='orange'
						className={`${
							isLoading
								? 'bg-gray text-secondary opacity-30 cursor-not-allowed'
								: ''
						} block mx-auto`}
					>
						Continue
					</Button>
					{isLoading ? <Loader /> : null}
					<button
                  type="button"
						className='block opacity-20 mt-4 text-sm mx-auto'
						onClick={() => setType(type === 'login' ? 'register' : 'login')}
					>
						{type === 'login' ? 'register' : 'login'}
					</button>
				</form>
			</section>
		</Meta>
	)
}

export default Auth

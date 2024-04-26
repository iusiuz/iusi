'use client'

import { updateDirection } from '@/actions/direction.action'
import { IDirection } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { priceSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function Price(direction: IDirection) {
	const { state, onToggle } = useToggleEdit()

	return (
		<Card>
			<CardContent className='relative p-6'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Change price</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <Edit2 />}
					</Button>
				</div>
				<Separator className='my-3' />

				{state ? (
					<Forms onToggle={onToggle} direction={direction} />
				) : (
					<div className='flex flex-col space-y-2'>
						<div className='flex items-center gap-2'>
							<span className='font-space-grotesk font-bold text-muted-foreground'>
								Old price:
							</span>
							<span className='font-medium'>
								{direction.oldPrice.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<span className='font-space-grotesk font-bold text-muted-foreground'>
								Current price:
							</span>
							<span className='font-medium'>
								{direction.currentPrice.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</span>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default Price

interface FormsProps {
	direction: IDirection
	onToggle: () => void
}
function Forms({ direction, onToggle }: FormsProps) {
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()

	const form = useForm<z.infer<typeof priceSchema>>({
		resolver: zodResolver(priceSchema),
		defaultValues: {
			oldPrice: `${direction.oldPrice}`,
			currentPrice: `${direction.currentPrice}`,
		},
	})

	function onSubmit(values: z.infer<typeof priceSchema>) {
		setIsLoading(true)
		const { currentPrice, oldPrice } = values
		const promise = updateDirection(
			direction._id,
			{ currentPrice: +currentPrice, oldPrice: +oldPrice },
			pathname
		)
			.then(() => onToggle())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully updated!',
			error: 'Something went wrong!',
		})
	}
	return (
		<>
			{isLoading && <FillLoading />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
					<FormField
						control={form.control}
						name='oldPrice'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Old price<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-secondary'
										disabled={isLoading}
										type='number'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='currentPrice'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Current price<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-secondary'
										disabled={isLoading}
										type='number'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoading}>
						Save
					</Button>
				</form>
			</Form>
		</>
	)
}

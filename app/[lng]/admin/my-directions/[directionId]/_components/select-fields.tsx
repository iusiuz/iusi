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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
	directionCategory,
	directionLanguage,
	directionLevels,
} from '@/constants'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { selectFieldsSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function SelectFields(direction: IDirection) {
	const { state, onToggle } = useToggleEdit()

	return (
		<Card>
			<CardContent className='relative p-6'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Select fields</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <Edit2 />}
					</Button>
				</div>
				<Separator className='my-3' />

				{state ? (
					<Forms direction={direction} onToggle={onToggle} />
				) : (
					<div className='flex flex-col space-y-2'>
						<div className='flex items-center gap-2'>
							<span className='font-space-grotesk font-bold text-muted-foreground'>
								Language:
							</span>
							<span className='font-medium'>{direction.language}</span>
						</div>
						<div className='flex items-center gap-2'>
							<span className='font-space-grotesk font-bold text-muted-foreground'>
								Category:
							</span>
							<span className='font-medium'>{direction.category}</span>
						</div>
						<div className='flex items-center gap-2'>
							<span className='font-space-grotesk font-bold text-muted-foreground'>
								Level:
							</span>
							<span className='font-medium'>{direction.level}</span>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default SelectFields

interface FormsProps {
	direction: IDirection
	onToggle: () => void
}
function Forms({ direction, onToggle }: FormsProps) {
	const [isLoading, setIsLoading] = useState(false)

	const pathname = usePathname()

	const form = useForm<z.infer<typeof selectFieldsSchema>>({
		resolver: zodResolver(selectFieldsSchema),
		defaultValues: {
			level: direction.level,
			language: direction.language,
			category: direction.category,
		},
	})

	const onSubmit = (values: z.infer<typeof selectFieldsSchema>) => {
		setIsLoading(true)
		const promise = updateDirection(direction._id, values, pathname)
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
						name='language'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Language<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
										disabled={isLoading}
									>
										<SelectTrigger className='w-full bg-secondary'>
											<SelectValue placeholder={'Select'} />
										</SelectTrigger>
										<SelectContent>
											{directionLanguage.map(item => (
												<SelectItem key={item} value={item}>
													{item}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Category<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
										disabled={isLoading}
									>
										<SelectTrigger className='w-full bg-secondary'>
											<SelectValue placeholder={'Select'} />
										</SelectTrigger>
										<SelectContent>
											{directionCategory.map(item => (
												<SelectItem key={item} value={item}>
													{item}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='level'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Level<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
										disabled={isLoading}
									>
										<SelectTrigger className='w-full bg-secondary'>
											<SelectValue placeholder={'Select'} />
										</SelectTrigger>
										<SelectContent>
											{directionLevels.map(item => (
												<SelectItem key={item} value={item}>
													{item}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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

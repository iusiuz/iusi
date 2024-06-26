'use client'

import CustomImage from '@/components/shared/custom-image'
import { Card, CardContent } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import useTranslate from '@/hooks/use-translate'
import Link from '@/node_modules/next/link'
import Autoplay from 'embla-carousel-autoplay'
import { SlActionRedo } from 'react-icons/sl'

function Directions() {
	const t = useTranslate()

	const items = [
		{
			key: '1',
			title: 'Filologiya va tillarni o’qitish (Ingliz tili)',
			brand: '/majors/1.jpg',
			url: '1',
		},
		{
			key: '2',
			title: 'Filologiya va tillarni o’qitish (Yapon tili)',
			brand: '/majors/2.jpg',
			url: '2',
		},
		{
			key: '3',
			title: 'Filologiya va tillarni o’qitish (Koreys tili)',
			brand: '/majors/3.jpg',
			url: '3',
		},
		{
			key: '4',
			title: 'Filologiya va tillarni o’qitish (Xitoy tili)',
			brand: '/majors/4.jpg',
			url: '4',
		},
		{
			key: '5',
			title: 'Boshlang’ich ta’lim',
			brand: '/majors/5.jpg',
			url: '5',
		},
		{
			key: '6',
			title: 'O’zbek tili va adabiyoti',
			brand: '/majors/6.jpg',
			url: '6',
		},
		{ key: '8', title: 'Iqtisodiyot', brand: '/majors/8.jpg', url: '8' },
		{
			key: '9',
			title: 'Buxgalteriya va audit',
			brand: '/majors/9.jpg',
			url: '9',
		},
		{
			key: '10',
			title: 'Bank ishi va audit',
			brand: '/majors/10.jpg',
			url: '10',
		},
		{
			key: '11',
			title: 'Moliya va moliyaviy texnologiyalar',
			brand: '/majors/11.jpg',
			url: '11',
		},
		{
			key: '12',
			title: 'Soliq va soliqqa tortish',
			brand: '/majors/12.jpg',
			url: '12',
		},
		{
			key: '13',
			title: 'Yurisprudensiya (biznes huquqi)',
			brand: '/majors/13.jpg',
			url: '13',
		},
		{
			key: '14',
			title: 'Axborot texnologiyalar (dasturiy injiniring)',
			brand: '/majors/14.jpg',
			url: '14',
		},
		{
			key: '19',
			title: 'Axborot xavfsizligi',
			brand: '/majors/19.jpg',
			url: '19',
		},
		{
			key: '20',
			title: 'Sun’iy intellekt',
			brand: '/majors/20.jpg',
			url: '20',
		},
		{
			key: '15',
			title: 'Siyosatshunoslik',
			brand: '/majors/15.jpg',
			url: '15',
		},
		{
			key: '16',
			title: 'Xalqaro jurnalistika',
			brand: '/majors/16.jpg',
			url: '16',
		},
		{
			key: '17',
			title: 'Raqamli iqtisodiyot (Magistratura)',
			brand: '/majors/17.jpg',
			url: '17',
		},
		{
			key: '18',
			title: 'Lingvistika (ingliz tili) (Magistratura)',
			brand: '/majors/18.jpg',
			url: '18',
		},
	]

	return (
		<>
			<div className='container mx-auto max-w-6xl py-12'>
				<div className='flex items-center justify-between max-md:flex-col max-md:items-start'>
					<div className='flex flex-col space-y-1'>
						<h1 className='font-space-grotesk text-3xl font-bold'>
							{t('Ta`lim yo`nalishlari')}
						</h1>
					</div>
				</div>

				<Carousel
					className='mt-6 w-full md:flex'
					opts={{ align: 'start', loop: true }}
					plugins={[Autoplay({ delay: 3000 })]}
				>
					<CarouselContent className='w-full'>
						{items.map(item => (
							<CarouselItem
								key={item.key}
								className='basis-full md:basis-1/2 lg:basis-1/4'
							>
								<Link href={'major/' + item.url}>
									<Card className='group w-full'>
										<CardContent className='relative h-56 w-full'>
											<CustomImage src={item.brand} alt={'brand'} />
										</CardContent>
										<div className='my-4 flex flex-col space-y-2 px-2'>
											<Separator />
											<h2 className='line-clamp-4 font-space-grotesk text-2xl font-bold'>
												{t(item.title)}
											</h2>
											<Separator />
											<p className='font-space-grotesk text-1xl font-bold flex items-center justify-center text-blue-500 underline'>
												{t('Batafsil')}
												<span className='ml-1'>
													<SlActionRedo />
												</span>
											</p>
										</div>
									</Card>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>

			<Separator className='my-3' />
		</>
	)
}

export default Directions

import { authMiddleware } from '@clerk/nextjs'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
	locales: ['en', 'ru', 'uz', 'tr'],
	defaultLocale: 'uz',
})

export default authMiddleware({
	beforeAuth: req => intlMiddleware(req),
	publicRoutes: [
		'/:lng',
		'/:lng/major/:url',
		'/:lng/major/:key',
		'/:lng/news',
		'/:lng/news/:slug',
		'/:lng/page',
		'/:lng/page/:slug',
		'/:lng/direction-bachelor',
		'/:lng/direction-bachelor/:slug',
		'/:lng/bachelor',
		'/:lng/bachelor/:slug',
		'/:lng/book',
		'/:lng/directions',
		'/:lng/directions/:directionId',
		'/:lng/directions/:slug',
		'/:lng/direction/:slug',
		'/:lng/courses',
		'/:lng/course/:slug',
		'/:lng/blogs',
		'/:lng/blogs/:slug',
		'/:lng/contacts',
		'/:lng/instructors',
		'/:lng/instructors/:instructorId',
		'/:lng/shopping/cart',
		'/:lng/sign-in',
		'/:lng/sign-up',
		'/:lng/ai',
	],
	ignoredRoutes: ['/en/api/webhook'],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

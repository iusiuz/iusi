import { IUser } from '@/app.types'

export interface ICreateCourse {
	title: string
	description: string
	learning: string
	requirements: string
	level: string
	category: string
	language: string
	oldPrice: number
	currentPrice: number
	previewImage: string
}

export interface ICreateDirection {
	title: string
	titleru: string
	titleen: string
	previewImage: string
}

export interface ICreateUser {
	clerkId: string
	fullName: string
	email: string
	picture: string
}
export interface IUpdateUser {
	clerkId: string
	path?: string
	updatedData: Partial<IUser>
}

export interface IUpdateSection {
	lists: { _id: string; position: number }[]
	path: string
}

export interface IUpdateScience {
	lists: { _id: string; position: number }[]
	path: string
}

export interface ILessonFields {
	title: string
	content: string
	videoUrl: string
	hours: string
	minutes: string
	seconds: string
	free: boolean
}

export interface IBookFields {
	title: string
	url: string
	free: boolean
}

export interface ICreateLesson {
	lesson: ILessonFields
	section: string
	path: string
}

export interface ICreateBook {
	book: IBookFields
	science: string
	path: string
}

export interface IUpdatePosition {
	lists: { _id: string; position: number }[]
	path: string
}

export interface GetCoursesParams {
	clerkId: string
	page?: number
	pageSize?: number
}
export interface GetDirectionsParams {
	clerkId: string
	page?: number
	pageSize?: number
}

export interface GetAllCoursesParams {
	page?: number
	pageSize?: number
	searchQuery?: string
	filter?: string
}

export interface GetAllBooksParams {
	page?: number
	pageSize?: number
	searchQuery?: string
	filter?: string
}

export interface GetAllDirectionsParams {
	page?: number
	pageSize?: number
	searchQuery?: string
	filter?: string
}

export interface GetAllDirectionParams {
	page?: number
	pageSize?: number
	searchQuery?: string
	filter?: string
}

export interface GetReviewParams {
	clerkId: string
	page?: number
	pageSize?: number
}

export interface GetPaginationParams {
	page?: number
	pageSize?: number
}

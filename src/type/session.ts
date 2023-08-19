import type { User } from './user';

export interface Session {
	id: string;
	title: string;
	description: string;
	users: Partial<User>[];
	latitude: number;
	longitude: number;
	startAt: number;
	endAt: number;
}

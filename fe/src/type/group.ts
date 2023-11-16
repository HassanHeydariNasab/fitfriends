import type { User } from './user';

export interface Group {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	users: Partial<User>[];
	usersCount: number;
}

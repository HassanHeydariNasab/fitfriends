import type { User } from './user';

export interface Group {
	id: string;
	title: string;
	description: string;
	avatarUrl: string;
	users: Partial<User>[];
}

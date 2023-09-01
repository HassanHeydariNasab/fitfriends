import type { User } from './user';

export interface Group {
	id: string;
	title: string;
	description: string;
	users: Partial<User>[];
}

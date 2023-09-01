import type { Group } from './group';
import type { User } from './user';

export interface Session {
	id: string;
	group: Group;
	description: string;
	users: Partial<User>[];
	latitude: number;
	longitude: number;
	address: string;
	startAt: number;
	endAt: number;
}

import type { Session } from '@type/session';
import { mockedUsers } from './users.mock';
import { mockedGroups } from './groups.mock';

export const mockedSessions: Session[] = [
	{
		id: '1',
		group: mockedGroups[0],
		description: "Let's run together at Azadi Complex.",
		users: [mockedUsers[0], mockedUsers[1]],
		latitude: 35.798,
		longitude: 51.441,
		address: 'Azadi Complex',
		startAt: 1625014800000,
		endAt: 1625018400000
	},
	{
		id: '2',
		group: mockedGroups[0],
		description: "Let's run together at Prison Complex.",
		users: [mockedUsers[1]],
		latitude: 35.79,
		longitude: 51.43,
		address: 'Prison Complex',
		startAt: 1635014000000,
		endAt: 1635018400000
	},
	{
		id: '3',
		group: mockedGroups[1],
		description: 'وضو فراموش نشود.',
		users: [mockedUsers[0], mockedUsers[1]],
		latitude: 35.8,
		longitude: 51.44,
		address: 'آستان جردن',
		startAt: 1665014000000,
		endAt: 1675018400000
	}
];

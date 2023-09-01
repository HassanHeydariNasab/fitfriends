import type { Session } from '@src/type/session';
import { mockedUsers } from './users.mock';

export const mockedSessions: Session[] = [
	{
		id: '1',
		group: {
			id: '1',
			title: 'Road Runners',
			description:
				'Running and jogging on the road with friends. We are a group of people who love running and jogging on the road. We are a group of people who love running and jogging on the road.',
			users: [mockedUsers[0], mockedUsers[1], mockedUsers[2]]
		},
		description: "Let's run together at Azadi Complex",
		users: [mockedUsers[0], mockedUsers[1]],
		latitude: 35.7992447038,
		longitude: 51.4408664171,
		address: 'Azadi Complex',
		startAt: 1625014800000,
		endAt: 1625018400000
	},
	{
		id: '2',
		group: {
			id: '1',
			title: 'Road Runners',
			description:
				'Running and jogging on the road with friends. We are a group of people who love running and jogging on the road. We are a group of people who love running and jogging on the road.',
			users: [mockedUsers[0], mockedUsers[1], mockedUsers[2]]
		},
		description: "Let's run together at Azadi Complex",
		users: [mockedUsers[1]],
		latitude: 35.7992447038,
		longitude: 51.4408664171,
		address: 'Azadi Complex',
		startAt: 1635014000000,
		endAt: 1635018400000
	}
];

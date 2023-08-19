import type { Session } from '@src/type/session';

export const mockedSessions: Session[] = [
	{
		id: '1',
		title: 'Road Runners',
		description: 'Running and jogging on the road',
		users: [{ id: '1' }, { id: '2' }],
		latitude: 35.7992447038,
		longitude: 51.4408664171,
		startAt: 1625014800000,
		endAt: 1625018400000
	}
];

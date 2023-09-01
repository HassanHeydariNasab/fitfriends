import type { User } from '@src/type/user';

export const mockedUsers: User[] = [
	{
		id: '1',
		name: 'Hassan',
		bio: "I'm a road runner",
		latitude: 35.7992447038,
		longitude: 51.4408664171,
		avatarUrl: '/avatars/sample-avatar-0.png'
	},
	{
		id: '2',
		name: 'Saeed',
		bio: "I'm a serious road runner",
		latitude: 35.7992447039,
		longitude: 51.4408664171,
		avatarUrl: '/avatars/sample-avatar-1.png'
	},

	{
		id: '3',
		name: 'John',
		bio: "I'm a lazy road runner",
		latitude: 35.799244704,
		longitude: 51.4408664171,
		avatarUrl: '/avatars/sample-avatar-2.png'
	}
];

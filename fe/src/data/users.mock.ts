import type { User } from '@src/type/user';

export const mockedUsers: User[] = [
	{
		id: '1',
		name: 'Hassan',
		bio: "I'm a road runner. I usually run 10km every day, except for Sundays. I'm looking for a running partner.",
		tags: ['basketball', 'running', 'football', 'swimming', 'cycling', 'gym'],
		latitude: 35.7992447038,
		longitude: 51.4408664171,
		avatarUrl: '/avatars/sample-avatar-0.png'
	},
	{
		id: '2',
		name: 'Pablo',
		bio: "I'm a serious road runner",
		tags: ['running', 'football'],
		latitude: 35.7992447039,
		longitude: 51.4408664171,
		avatarUrl: '/avatars/sample-avatar-1.png'
	},

	{
		id: '3',
		name: 'Maria',
		bio: "I'm a lazy road runner who is looking for good persons to walk with.",
		tags: ['running', 'basketball', 'walking'],
		latitude: 35.799244704,
		longitude: 51.4408664171,
		avatarUrl: '/avatars/sample-avatar-2.png'
	}
];

import type { Group } from '@type/group';
import { mockedUsers } from './users.mock';

export const mockedGroups: Group[] = [
	{
		id: '1',
		title: 'Road Runners',
		description:
			'Running and jogging on the road with friends. We are a group of people who love running and jogging on the road. We are a group of people who love running and jogging on the road.',
		users: [mockedUsers[0], mockedUsers[1], mockedUsers[2]],
		avatarUrl: '/avatars/group-0.jpg'
	},
	{
		id: '2',
		title: 'بسکتبالیست‌های جنوب شرق',
		description: 'ما جمعی از دلدادگان آستان جردن هستیم که جمعه‌ها در آستان جردن جک‌ور‌جک می‌کنیم.',
		users: [mockedUsers[0], mockedUsers[1]],
		avatarUrl: '/avatars/group-1.jpg'
	}
];

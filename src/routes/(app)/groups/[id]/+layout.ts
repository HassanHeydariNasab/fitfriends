import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import { mockedGroups } from '@data/groups.mock';

export const load: PageLoad = ({ params }) => {
	const group = mockedGroups.find((group) => group.id === params.id);
	if (!group) {
		throw error(404, 'group_not_found');
	}
	return { group };
};

import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import { mockedGroups } from '@data/groups.mock';

export const load: PageLoad = ({ params }) => {
	// TODO: check if user has permission to edit this group, before revealing sensitive information
	const group = mockedGroups.find((group) => group.id === params.id);
	if (!group) {
		throw error(404, 'group_not_found');
	}
	return { group };
};

import { error } from '@sveltejs/kit';

import type { LayoutLoad } from './$types';
import { mockedSessions } from '@data/sessions.mock';

export const load: LayoutLoad = ({ params }) => {
	const session = mockedSessions.find((session) => session.id === params.id);
	if (!session) {
		throw error(404, 'session_not_found');
	}
	return { session };
};

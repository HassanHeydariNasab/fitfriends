import { writable } from 'svelte/store';

import type { User } from '@src/type/user';
import { mockedUsers } from '@src/data/users.mock';

export const token = writable<string>(undefined);
export const currentUser = writable<User | undefined>(mockedUsers[0]);
export const administratedGroupsIds = writable<string[]>(['1']);

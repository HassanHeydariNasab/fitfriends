import type { Business } from './business';

export interface Booking {
	id: string;
	businessId: string;
	startAt: string;
	endAt: string;
	business: Business;
	description: string;
}

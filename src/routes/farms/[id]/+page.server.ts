import type Farm from '../../../lib/Farm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { farms } = await parent();
	const farm = farms.find((f) => f.id === params.id);
	if (farm === undefined) {
		throw error(404, 'Farm not Found.');
	}

	return {
		farm
	};
}) satisfies PageServerLoad;

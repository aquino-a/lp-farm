import { farms } from '../../lib/Farm';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	return {
		farms
	};
}) satisfies LayoutServerLoad;

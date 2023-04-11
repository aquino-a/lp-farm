import type { PageLoad } from './$types';
import getDetails from '../../../lib/chain';

export const load = (async ({ data }) => {
	const { farm } = data;

	const farmDetails = await getDetails(farm);

	return {
		...data,
		farmDetails
	};
}) satisfies PageLoad;

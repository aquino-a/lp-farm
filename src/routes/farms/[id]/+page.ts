import type { PageLoad } from './$types';
//
import getDetails from '../../../lib/chain';
import { browserRunner } from '$lib/chain.store';
import { get } from 'svelte/store';

export const load = (async ({ data }) => {
	const { farm } = data;

	const farmDetails = await getDetails(farm, get(browserRunner) ?? undefined);

	return {
		...data,
		farmDetails
	};
}) satisfies PageLoad;

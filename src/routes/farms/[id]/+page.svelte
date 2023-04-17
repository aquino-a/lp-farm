<script lang="ts">
	import { get } from 'svelte/store';
	import type { PageData } from '../[id]/$types';
	//
	import { browserRunner } from '$lib/chain.store';
	import getDetails from '$lib/chain';

	export let data: PageData;

	const { farm } = data;

	const farmDetailsPromise = getDetails(farm, get(browserRunner) ?? undefined);
</script>

<div>
	<fieldset>
		<br />
		<ul>
			{#each farm.links as link}
				<li>
					<a href={link.url} target="_blank">{link.display}</a>
				</li>
			{/each}
		</ul>
		<br />
		{#await farmDetailsPromise}
			Loading...
		{:then farmDetails}
			<span>APR: </span><span>{farmDetails?.apr}%</span>
			<br />
			<span>Total {farm?.name} Staked: </span><span>{farmDetails?.totalStaked}</span>
			<br />
			<span>Total Value Locked: </span><span>${farmDetails?.totalLocked}</span>
			<br />
			<span>{farm?.name} Reward Pool: </span><span>({farmDetails?.rewardPool})</span>
		{:catch error}
			<p class="text-red-700">{error.message}</p>
		{/await}
	</fieldset>
</div>

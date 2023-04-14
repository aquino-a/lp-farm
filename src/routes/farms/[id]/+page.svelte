<script lang="ts">
	import type { PageData } from '../[id]/$types';

	export let data: PageData;

	const { farm, farmDetails } = data;
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
		<span>APR: </span><span>{farmDetails?.apr}%</span>
		<br />
		<span>Total {farm?.name} Staked: </span><span>{farmDetails?.totalStaked}</span>
		<br />
		<span>Total Value Locked: </span><span>${farmDetails?.totalLocked}</span>
		<br />
		<span>{farm?.name} Reward Pool: </span><span>({farmDetails?.rewardPool})</span>
	</fieldset>
</div>

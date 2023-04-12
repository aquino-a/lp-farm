<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<h1>Farms</h1>
<div class="py-5">
	{#each data.farms as farm}
		<a class="p-2 rounded-lg bg-zinc-200" href="/farms/{farm.id}">{farm.name}</a>
	{/each}
</div>

<slot />

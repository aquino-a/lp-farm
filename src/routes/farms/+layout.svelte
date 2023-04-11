<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<h1>Farms</h1>
<div class="submenu">
	{#each data.farms as farm}
		<a href="/farms/{farm.id}">{farm.name}</a>
	{/each}
</div>

<slot />

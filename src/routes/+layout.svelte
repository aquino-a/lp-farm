<script lang="ts">
	import { JsonRpcSigner } from 'ethers';
	//
	import { browserProviderInit, disconnectSigner, connectToWallet } from '$lib/chain';
	import { browserRunner } from '$lib/chain.store';
	import '../app.css';
	//
	import Modal from '$lib/components/Modal.svelte';
	import { onMount, setContext } from 'svelte';
	import { showErrorKey } from '$lib/components/Modal';

	let showModal: boolean = false;
	let modalMessage: string;

	const showError = (message: string) => {
		modalMessage = message;
		showModal = true;
	};

	const connect = async () => {
		try {
			await connectToWallet();
		} catch (error) {
			console.log(error);
			showError('Failed to connect wallet !!');
		}
	};

	onMount(browserProviderInit);

	setContext(showErrorKey, showError);
</script>

<div class="px-10 py-5 shadow-sm">
	<nav class="space-x-5 flex justify-center">
		<a href="/">Home</a>
		<a
			target="_blank"
			href="https://app.mute.io/swap?outputCurrency=0xA51Bc2433a33c448DD40F7074bCAB751A1922706&inputCurrency=0x5aea5775959fbc2557cc8789bc1bf90a239d9a91"
			>Buy</a
		>
		<a
			target="_blank"
			href="https://www.geckoterminal.com/zksync/pools/0xd0c991F54c54022aD5f98B1468668Da7Dc33B8Ef?utm_source=telegram&utm_medium=bubblebuybot&utm_campaign=bubblebuybot"
			>Chart</a
		>
		<a href="#">Whitepaper</a>
		<a href="#">Liquidity Locker</a>
		<a href="/farms">Farms</a>
		<a class="my-auto" target="_blank" href="https://twitter.com/zkinutoken">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="16"
				height="16"
				class="text-zinc-900"
			>
				<path
					d="M21.73 5.18a8.88 8.88 0 0 1-2.58.7 4.4 4.4 0 0 0 1.92-2.43 8.81 8.81 0 0 1-2.8 1.07 4.38 4.38 0 0 0-7.5 3.98 12.45 12.45 0 0 1-9-4.54 4.37 4.37 0 0 0 1.36 5.81 4.34 4.34 0 0 1-1.96-.59v.06a4.37 4.37 0 0 0 3.48 4.27 4.32 4.32 0 0 1-1.97.08 4.36 4.36 0 0 0 4.07 3.03 8.79 8.79 0 0 1-5.43 1.86 8.86 8.86 0 0 1-1.04-.06 12.46 12.46 0 0 0 6.81 1.99c8.07 0 12.48-6.7 12.48-12.48 0-.19 0-.38-.01-.57a8.91 8.91 0 0 0 2.18-2.28z"
					fill="currentColor"
				/>
			</svg>
		</a>
		<a class="my-auto" target="_blank" href="https://t.me/zkinutoken">Telegram</a>

		<div class="w-24 flex justify-center">
			{#if $browserRunner instanceof JsonRpcSigner}
				<button on:click={disconnectSigner}>Disconnect</button>
			{:else}
				<button on:click={connect}>Connect</button>
			{/if}
		</div>
	</nav>
</div>

<div class="container my-5 text-center">
	<slot />
</div>

<Modal bind:showModal>
	<div>
		{modalMessage}
	</div>
</Modal>

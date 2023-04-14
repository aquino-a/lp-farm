import { Contract, Interface, PocketProvider, getDefaultProvider, BrowserProvider } from 'ethers';
import type { ContractRunner } from 'ethers';
import { get } from 'svelte/store';
//
import type Farm from './Farm';
import type FarmDetails from './FarmDetails';
import { browserRunner } from './chain.store';

export const browserProviderInit = async () => {
	const runner = await getBrowserProvider();
	browserRunner.set(runner);
}

export const disconnectSigner = () => {
	try {
		const currentBrowserRunner = get(browserRunner);
		browserRunner.set(currentBrowserRunner?.provider ?? null);
	} catch (error) {
		console.log(error);	
	}
}

export const getDetails = async (farm: Farm, runner?: ContractRunner): Promise<FarmDetails> => {

	if (runner === undefined) {
		runner = getProvider();
	}

	const contract = new Contract(farm.address, farm.abi, runner);
	const totalSupply = await contract.totalSupply();

	return {
		apr: -1,
		rewardPool: -1,
		totalLocked: -1,
		totalStaked: -1,
		totalSupply
	};
};

export const createContract = (address: string, abiObj: any): Contract => {

	const iface = new Interface(abiObj);
	const abi = iface.format();

	const contract = new Contract(address, abi);

	return contract;
};

export const getBrowserProvider = async (): Promise<ContractRunner> => {

	if (window.ethereum == null) {

		// If MetaMask is not installed, we use the default provider,
		// which is backed by a variety of third-party services (such
		// as INFURA). They do not have private keys installed so are
		// only have read-only access
		console.log("MetaMask not installed; using read-only defaults");
		return getDefaultProvider('goerli');

	} else {
		// Connect to the MetaMask EIP-1193 object. This is a standard
		// protocol that allows Ethers access to make all read-only
		// requests through MetaMask.
		const provider = new BrowserProvider(window.ethereum);
		
		// It also provides an opportunity to request access to write
		// operations, which will be performed by the private key
		// that MetaMask manages for the user.
		const signer = await provider.getSigner();

		if (signer != undefined) {
			return signer;
		}

		return provider;
	}
}

const getProvider = (): ContractRunner => {
	return new PocketProvider('goerli');
}

export default getDetails;

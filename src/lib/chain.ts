import type Farm from './Farm';
import type FarmDetails from './FarmDetails';
import { Contract, Interface, PocketProvider, type Provider } from 'ethers';

export const getDetails = async (farm: Farm, provider?: Provider): Promise<FarmDetails> => {
	
	if (provider === undefined) {
		provider = getProvider();
	}
	
	const contract = new Contract(farm.address, farm.abi, provider);
	const totalSupply = await contract.totalSupply();

	return {
		apr: -1,
		rewardPool: -1,
		totalLocked: -1,
		totalStaked: -1,
		totalSupply
	};
};

export const createContract = (address: string, abiObj): Contract => {

	const iface = new Interface(abiObj);
	const abi = iface.format();

	const contract = new Contract(address, abi);

	return contract;
};

const getProvider = () => {
	return new PocketProvider('goerli');
}

export default getDetails;

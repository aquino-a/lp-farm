/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, it, expect } from 'vitest';
import getDetails, { createContract } from './chain';
import zkfarmContract from './contracts/zkfarm-abi.json';
import { farms } from './Farm';
import { Interface, PocketProvider } from 'ethers';

describe('create contract test', () => {
	it('creates a zkfarm contract', async () => {
		const address = farms.find((f) => f.id === 'zinu')!.address;
		expect(address).not.toBeUndefined();

		const contract = createContract(address!, zkfarmContract);

		expect(await contract.getAddress()).toStrictEqual(address);

		const abi = contract.interface.format(true);

		expect(abi).not.toBeNull();
		expect(abi.length).toBeGreaterThan(0);
	});
});

describe('farm details test', () => {
	it('gets the farm details from the chain', async () => {
		const farm = farms.find((f) => f.id === 'zinu')!;
		expect(farm).not.toBeUndefined();

		const testProvider = new PocketProvider('goerli');
		const details = await getDetails(farm, testProvider);

		expect(details).not.toBeUndefined();
		expect(details.totalSupply).toBeGreaterThan(-1);
		expect(details.apr).toBeGreaterThan(-1);
		expect(details.rewardPool).toBeGreaterThan(-1);
		expect(details.totalStaked).toBeGreaterThan(-1);
		expect(details.totalLocked).toBeGreaterThan(-1);
	});
});

describe('not a test', () => {
	it('converts a json abi to human-readable abi', () => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const abiObj = require('./contracts/MasterChef-abi.json');

		const iface = new Interface(abiObj);
		const abi = iface.format();
		console.log(JSON.stringify(abi));
	});
});

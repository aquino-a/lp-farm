import zkfarmContract from './contracts/zkfarm-abi.json';

export default interface Farm {
	id: string;
	name: string;
	links: { display: string; url: string }[];
	address: string;
	abi: any;
}

export const farms: Farm[] = [
	{
		id: 'zinu',
		name: '$ZINU',
		links: [
			{
				display: 'Buy $ZINU',
				url: 'https://app.mute.io/swap?outputCurrency=0xA51Bc2433a33c448DD40F7074bCAB751A1922706&inputCurrency=0x5aea5775959fbc2557cc8789bc1bf90a239d9a91'
			},
			{
				display: 'Farm Contract',
				url: 'https://explorer.zksync.io/address/0x949986Ab58DA5c23F06eaFA6A06777aDcD895339'
			}
		],
		address: '0x5CcCEf751c0e1C9824Cb4Ed4048142418102e21b',
		abi: zkfarmContract
	}
];

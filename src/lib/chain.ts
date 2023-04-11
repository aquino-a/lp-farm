import type Farm from './Farm';
import type FarmDetails from './FarmDetails';

const getDetails = async (farm: Farm): Promise<FarmDetails> => {
	return Promise.resolve({
		apr: 1000,
		rewardPool: 120,
		totalLocked: 200,
		totalStaked: 300
	});
};

export default getDetails;

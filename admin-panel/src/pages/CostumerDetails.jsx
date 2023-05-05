import { useGlobalContext } from '../contexts';

const CostumerDetails = () => {
	const { costumer } = useGlobalContext();

	console.log(costumer);

	return <h2>{costumer.name}</h2>;
};

export default CostumerDetails;

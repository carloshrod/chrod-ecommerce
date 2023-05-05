import { useGlobalContext } from '../contexts';

const ProductDetails = () => {
	const { product } = useGlobalContext();

	console.log(product);

	return <h2>{product.name}</h2>;
};

export default ProductDetails;

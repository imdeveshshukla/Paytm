// Filename - loader.js

import { TailSpin } from "react-loader-spinner";
const Loader = () => {
	return (
		<TailSpin
			height="25"
			width="25"
			color="#FFFFFF"
			ariaLabel="tail-spin-loading"
			radius="2"
			wrapperStyle={{}}
			wrapperClass=""
			visible={true}
            
		/>
	);
}; 
export default Loader;

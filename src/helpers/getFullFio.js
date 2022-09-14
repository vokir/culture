const getFullFio = (...args) => {
	 args = args.filter((el)=>{
		if(el !== null){
			return true
		}
	})
	return args.join(' ')
};

export default getFullFio;

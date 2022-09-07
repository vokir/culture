const getApproacheNumber = (s) => {
	if(s.split('№').length > 1){
		s = s.split('№')[1]
	}
	else{
		return s
	}
  return parseInt(s)
};

export default getApproacheNumber;

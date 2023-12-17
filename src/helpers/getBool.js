const getBool = (value, trueValue = 'Да', falseValue = 'Нет') => {
  if (value.toLowerCase() === trueValue.toLowerCase()) {
    return 1;
  } else if (value.toLowerCase() === falseValue.toLowerCase()) {
    return 0;
  } else {
    return undefined;
  }
};

export default getBool;

const createInfo = (data, fields) => {
  const info = [];

  Object.keys(fields).forEach((field) => {
    Object.keys(data).forEach((key) => {
      if (field === key) {
        if (key === 'houses') {
          info.push({
            title: fields[key],
            value: data[key].length
          });
          return;
        }
        info.push({
          title: fields[key],
          value: data[key]
        });
      }
    });
  });
  return info;
};

export default createInfo;

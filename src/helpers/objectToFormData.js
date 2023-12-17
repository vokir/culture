const objectToFormData = (object) => {
  if (typeof object !== 'object') return;

  const formData = new FormData();
  for (let key in object) {
    if (object[key]) {
      formData.append(key, object[key]);
    }
  }
  return formData;
};

export default objectToFormData;

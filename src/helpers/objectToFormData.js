const objectToFormData = (object) => {
  if (typeof object !== 'object') return;

  const formData = new FormData();
  for (let key in object) {
    if (key === 'documents') {
      object[key].forEach((doc) => {
        formData.append('documents[]', doc.realId);
      });
      continue;
    }
    if (key === 'accommodationPolicy') {
      object[key].forEach((doc) => {
        formData.append('accommodationPolicy[]', doc.realId);
      });
      continue;
    }
    if (object[key]) {
      formData.append(key, object[key]);
    }
  }
  return formData;
};

export default objectToFormData;

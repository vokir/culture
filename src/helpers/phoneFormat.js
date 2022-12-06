const computePhone = (s) => {
  if (!s) return
  let phone = s.replace(/[^0-9]/g, "");
  if (phone.length === 11) {
    phone = phone.substr(1);
  }
  return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `+7 ($1) $2-$3-$4`);
};

export default computePhone

const mapColumns = (item) => ({
  id: item.name,
  title: item.readableName,
  checked: true,
  editing: true,
  default: true
});

const mapAccounts = (item) => ({
  id: item.realId,
  number: item.number.toString(),
  userName: item.users[0]?.name,
  email: item.users[0]?.email,
  phone: item.users[0]?.phone
});

export { mapColumns, mapAccounts };

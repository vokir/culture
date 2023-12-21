const mapColumns = (item) => ({
  id: item.name,
  title: item.readableName,
  checked: true,
  editing: true,
  default: true
});

export { mapColumns };

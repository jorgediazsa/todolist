const todoBuilder = (fields) => ({
  title: "",
  complete: false,
  createdOn: Date.now(),
  completedOn: false,
  ...fields,
});

export { todoBuilder };

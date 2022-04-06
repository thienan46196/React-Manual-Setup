export const getClasses = (classes: Object) => {
  let returnStatements = '';
  for (const [key, value] of Object.entries(classes)) {
    if (value === true) {
      returnStatements = returnStatements + key + '';
    }
  }
  return returnStatements.trim();
};

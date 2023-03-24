/**
 * This function takes in an event object and what's going on with the row
 * then produce an event according to the changes and the row in the chart
 * of accounts.
 * @param {*} user
 * @param {*} change
 * @returns event object
 */
const cellUpdateEvent = (user, change) => {
  const changeEvent = {
    field: change.field,
    row: change.row,
    previous: change.formattedValue,
  };
  return {
    eventDate: new Date(),
    change: changeEvent,
    user: user,
  };
};

/**
 * This is a universal function that returns an event accoutding to
 * the type of the event passed to the function
 * It will use one of the functions above to product an event object
 * and return the object to the caller.
 * @param {*} user
 * @param {*} change
 * @param {*} whatChange
 * @returns event object
 */
export const createEvent = (user, change, whatChange) => {
  switch (whatChange) {
    case "cell":
      return cellUpdateEvent(user, change);
    default:
      break;
  }
};

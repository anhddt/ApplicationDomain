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
    type: "modify",
    field: change.field,
    row: change.row,
    previous: change.formattedValue,
  };
  return {
    eventDate: new Date().toISOString(),
    change: changeEvent,
    user: user,
  };
};

/**
 * When an account is created, a create account event is created or deleted
 * an event is created here.
 * @param {*} user
 * @param {*} change
 * @param {*} type
 * @returns
 */
const itemCreatedEvent = (user, change, type) => {
  const changeEvent = {
    type: type,
    field: "",
    row: {
      id: change.id,
      name: change.name,
    },
    previous: "",
  };
  return {
    eventDate: new Date().toISOString(),
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
    case "new":
      return itemCreatedEvent(user, change, "create");
    case "delete":
      return itemCreatedEvent(user, change, "delete");
    default:
      break;
  }
};

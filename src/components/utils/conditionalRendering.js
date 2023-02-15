/**
 * This function shows the component if the argument is true.
 * shows nothing if the argument is false
 */
export const showIf = (arg, Component) => {
  if (!arg) {
    return;
  }
  return Component;
};

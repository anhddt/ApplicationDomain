export const showIf = (arg, Component) => {
  if (!arg) {
    return;
  }
  return Component;
};

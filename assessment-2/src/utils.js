export const Validate = {
  prop: {
    greaterThanZero(props, propName, _componentName) {
      const componentName = _componentName || "ANONYMOUS";
      if (props[propName]) {
        let value = props[propName];
        if (typeof value === "number") {
          return value > 0
            ? null
            : new Error(
                `${propName} in ${componentName} must be greater than 0: ${value}"`
              );
        }
      }
      return null;
    },
    instanceOfSet(props, propName, _componentName) {
      const componentName = _componentName || "ANONYMOUS";
      if (props[propName]) {
        let value = props[propName];
        return value instanceof Set
          ? null
          : new Error(
              `${propName} in ${componentName} must be instanceof Set()"`
            );
      }
    }
  }
};

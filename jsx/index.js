// jsx

function Main() {
  return createElement(
    "div",
    { className: "wrapper", ref: "main", key: "main" },
    createElement("h1", null, "Hello World"),
    createElement("h2", null, "ReactChild")
  );
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

// important
const ReactCurrentOwner = {
  current: null,
};

function createElement(type, config, children) {
  let propName;
  const props = {};
  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    if (config.ref) {
      ref = config.ref;
    }

    if (config.key) {
      key = config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;

    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  );
}

const REACT_ELEMENT_TYPE = Symbol.for("react.element");

function ReactElement(type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,

    type: type,
    key: key,
    ref: ref,
    props: props,

    _owner: owner,
  };

  return element;
}

const element = Main();

// render
console.log(element);

function render(element, container, callback) {
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback
  );
}

function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: Container,
  forceHydrate: boolean,
  callback: ?Function
) {
  let root = container._reactRootContainer;
  let fiberRoot;
  if (!root) {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    );
  }
}

function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  const shouldHydrate = forceHydrate;

  if (!shouldHydrate) {
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling);
    }
  }
  return createLegacyRoot(
    container,
    shouldHydrate
      ? {
          hydrate: true,
        }
      : undefined
  );
}

function createLegacyRoot(container, options) {
  const LegacyRoot = 0;
  return new ReactDOMBlockingRoot(container, LegacyRoot, options);
}

function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options);
}

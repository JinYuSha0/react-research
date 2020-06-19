const __DEV__ = false;

let REACT_ELEMENT_TYPE = 0xeac7;
let REACT_PORTAL_TYPE = 0xeaca;
let REACT_FRAGMENT_TYPE = 0xeacb;
let REACT_STRICT_MODE_TYPE = 0xeacc;
let REACT_PROFILER_TYPE = 0xead2;
let REACT_PROVIDER_TYPE = 0xeacd;
let REACT_CONTEXT_TYPE = 0xeace;
let REACT_FORWARD_REF_TYPE = 0xead0;
let REACT_SUSPENSE_TYPE = 0xead1;
let REACT_SUSPENSE_LIST_TYPE = 0xead8;
let REACT_MEMO_TYPE = 0xead3;
let REACT_LAZY_TYPE = 0xead4;
let REACT_BLOCK_TYPE = 0xead9;
let REACT_SERVER_BLOCK_TYPE = 0xeada;
let REACT_FUNDAMENTAL_TYPE = 0xead5;
let REACT_RESPONDER_TYPE = 0xead6;
let REACT_SCOPE_TYPE = 0xead7;
let REACT_OPAQUE_ID_TYPE = 0xeae0;
let REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
let REACT_OFFSCREEN_TYPE = 0xeae2;
let REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

class Main extends Component {
  wrapper = null;

  state = {
    h1: "Hello",
    h2: "React",
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // console.log("prevState ->", prevState);
  // }

  componentWillUpdate() {
    console.log("Main will update");
  }

  componentDidMount() {
    setTimeout(() => {
      this.reverse();
    }, 1000);
    console.log("did mount", this.wrapper, this.updater);
  }

  reverse = () => {
    this.setState((state) => ({
      h1: state.h1.split("").reverse().join(""),
      h2: state.h2.split("").reverse().join(""),
    }));
  };

  render() {
    return createElement(
      "div",
      {
        className: "wrapper",
        ref: (ref) => (this.wrapper = ref),
        key: "main",
      },
      createElement("h1", null, this.state.h1),
      createElement("h2", null, this.state.h2),
      createElement("button", { onClick: this.reverse }, "click")
    );
  }
}

// class Wrapper extends Component {
//   componentWillUpdate() {
//     console.log("Wrapper will update");
//   }

//   render() {
//     return createElement(Main, null);
//   }
// }

// class Wrapper2 extends Component {
//   render() {
//     return createElement(Wrapper, null);
//   }
// }

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

const element = createElement(Main, null);
const body = document.querySelector("#body");

// createRoot(body).render(element);
render(element, body);

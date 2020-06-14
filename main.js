function consoleDeep(...args) {
  args = args.map((arg) => _.cloneDeep(arg));
  console.log.apply(null, args);
}

const emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};

// render
const LegacyRoot = 0;
const BlockingRoot = 1;
const ConcurrentRoot = 2;

const TotalLanes = 31;
const NoLanes = 0b0000000000000000000000000000000;
const NoLane = 0b0000000000000000000000000000000;
const SyncLane = 0b0000000000000000000000000000001;
const SyncUpdateRangeEnd = 1;
const SyncBatchedLane = 0b0000000000000000000000000000010;
const SyncBatchedUpdateRangeEnd = 2;
const InputDiscreteHydrationLane = 0b0000000000000000000000000000100;
const InputDiscreteLanes = 0b0000000000000000000000000011100;
const InputDiscreteUpdateRangeStart = 3;
const InputDiscreteUpdateRangeEnd = 5;
const InputContinuousHydrationLane = 0b0000000000000000000000000100000;
const InputContinuousLanes = 0b0000000000000000000000011100000;
const InputContinuousUpdateRangeStart = 6;
const InputContinuousUpdateRangeEnd = 8;
const DefaultHydrationLane = 0b0000000000000000000000100000000;
const DefaultLanes = 0b0000000000000000011111100000000;
const DefaultUpdateRangeStart = 9;
const DefaultUpdateRangeEnd = 14;
const TransitionShortHydrationLane = 0b0000000000000000100000000000000;
const TransitionShortLanes = 0b0000000000011111100000000000000;
const TransitionShortUpdateRangeStart = 15;
const TransitionShortUpdateRangeEnd = 20;
const TransitionLongHydrationLane = 0b0000000000100000000000000000000;
const TransitionLongLanes = 0b0000011111100000000000000000000;
const TransitionLongUpdateRangeStart = 21;
const TransitionLongUpdateRangeEnd = 26;
const SelectiveHydrationLane = 0b0000110000000000000000000000000;
const SelectiveHydrationRangeEnd = 27;
// Includes all non-Idle updates
const UpdateRangeEnd = 27;
const NonIdleLanes = 0b0000111111111111111111111111111;
const IdleHydrationLane = 0b0001000000000000000000000000000;
const IdleLanes = 0b0111000000000000000000000000000;
const IdleUpdateRangeStart = 28;
const IdleUpdateRangeEnd = 30;
const OffscreenLane = 0b1000000000000000000000000000000;

const noTimeout = 0;

let threadIDCounter = 0;

const NoMode = 0b00000;
const StrictMode = 0b00001;
const BlockingMode = 0b00010;
const ConcurrentMode = 0b00100;
const ProfileMode = 0b01000;
const DebugTracingMode = 0b10000;

const FunctionComponent = 0;
const ClassComponent = 1;
const IndeterminateComponent = 2; // Before we know whether it is function or class
const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
const HostComponent = 5;
const HostText = 6;
const Fragment = 7;
const Mode = 8;
const ContextConsumer = 9;
const ContextProvider = 10;
const ForwardRef = 11;
const Profiler = 12;
const SuspenseComponent = 13;
const MemoComponent = 14;
const SimpleMemoComponent = 15;
const LazyComponent = 16;
const IncompleteClassComponent = 17;
const DehydratedFragment = 18;
const SuspenseListComponent = 19;
const FundamentalComponent = 20;
const ScopeComponent = 21;
const Block = 22;
const OffscreenComponent = 23;
const LegacyHiddenComponent = 24;

const randomKey = Math.random().toString(36).slice(2);
const internalContainerInstanceKey = "__reactContainer$" + randomKey;
const internalInstanceKey = "__reactFiber$" + randomKey;
const internalPropsKey = "__reactProps$" + randomKey;

const NoContext = 0b000000;
const BatchedContext = 0b000001;
const EventContext = 0b000010;
const DiscreteEventContext = 0b000100;
const LegacyUnbatchedContext = 0b001000;
const RenderContext = 0b010000;
const CommitContext = 0b100000;

let requestEventTime = getCurrentTime;

let currentEventTime = -1;
const initialTimeMs = Scheduler_now();
const now =
  initialTimeMs < 10000 ? Scheduler_now : () => Scheduler_now() - initialTimeMs;

let syncQueue = null;
let immediateQueueCallbackNode = null;
let isFlushingSyncQueue = false;

const SyncLanePriority = 16;
const SyncBatchedLanePriority = 15;
const InputDiscreteHydrationLanePriority = 14;
const InputDiscreteLanePriority = 13;
const InputContinuousHydrationLanePriority = 12;
const InputContinuousLanePriority = 11;
const DefaultHydrationLanePriority = 10;
const DefaultLanePriority = 9;
const TransitionShortHydrationLanePriority = 8;
const TransitionShortLanePriority = 7;
const TransitionLongHydrationLanePriority = 6;
const TransitionLongLanePriority = 5;
const SelectiveHydrationLanePriority = 4;
const IdleHydrationLanePriority = 3;
const IdleLanePriority = 2;
const OffscreenLanePriority = 1;
const NoLanePriority = 0;

const emptyContextObject = {};
const disableLegacyContext = false;

const UpdateState = 0;
const ReplaceState = 1;
const ForceUpdate = 2;
const CaptureUpdate = 3;

const RootIncomplete = 0;
const RootFatalErrored = 1;
const RootErrored = 2;
const RootSuspended = 3;
const RootSuspendedWithDelay = 4;
const RootCompleted = 5;

let executionContext = NoContext;
let workInProgressRootRenderLanes = NoLanes;
const deferRenderPhaseUpdateToNextBatch = true;
let currentEventWipLanes = NoLanes;
let workInProgressRoot = null;
let workInProgress = null;
let workInProgressRootRenderLane = NoLanes;
let subtreeRenderLanes = NoLanes;
const subtreeRenderLanesCursor = createCursor(NoLanes);
let workInProgressRootExitStatus = RootIncomplete;
let workInProgressRootFatalError = null;
let workInProgressRootLatestProcessedEventTime = -1;
let workInProgressRootLatestSuspenseTimeout = -1;
let workInProgressRootCanSuspendUsingConfig = null;
let workInProgressRootIncludedLanes = NoLanes;
let workInProgressRootSkippedLanes = NoLanes;
let workInProgressRootUpdatedLanes = NoLanes;
let workInProgressRootPingedLanes = NoLanes;

let mostRecentlyUpdatedRoot = null;

const NoSchedulerPriority = NoPriority;
const NormalSchedulerPriority = NormalPriority;
let pendingPassiveEffectsRenderPriority = NoSchedulerPriority;

const enableSchedulerTracing = false;
const enableProfilerTimer = false;

let return_highestLanePriority = DefaultLanePriority;
let return_updateRangeEnd = -1;

const ReactCurrentDispatcher = {
  current: null,
};

let currentlyRenderingFiber = null;
let lastContextDependency = null;
let lastContextWithAllBitsObserved = null;
const isPrimaryRenderer = true;

const noop = () => {};

// react hooks相关
const ContextOnlyDispatcher = {
  readContext,

  useCallback: noop, // throwInvalidHookError,
  useContext: noop, // throwInvalidHookError,
  useEffect: noop, //  throwInvalidHookError,
  useImperativeHandle: noop, //  throwInvalidHookError,
  useLayoutEffect: noop, //  throwInvalidHookError,
  useMemo: noop, //  throwInvalidHookError,
  useReducer: noop, //  throwInvalidHookError,
  useRef: noop, //  throwInvalidHookError,
  useState: noop, //  throwInvalidHookError,
  useDebugValue: noop, //  throwInvalidHookError,
  useResponder: noop, //  throwInvalidHookError,
  useDeferredValue: noop, //  throwInvalidHookError,
  useTransition: noop, //  throwInvalidHookError,
  useMutableSource: noop, //  throwInvalidHookError,
  useOpaqueIdentifier: noop, // throwInvalidHookError,
};

let spawnedWorkDuringRender = null;

let didReceiveUpdate = false;

let index = -1;
const valueStack = [];
const NO_CONTEXT = {};
const didPerformWorkStackCursor = createCursor(false);
const contextStackCursor = createCursor(NO_CONTEXT);
const contextFiberStackCursor = createCursor(NO_CONTEXT);
const rootInstanceStackCursor = createCursor(NO_CONTEXT);
function push(cursor, value, fiber) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
function pop(cursor, fiber) {
  if (index < 0) {
    return;
  }
  cursor.current = valueStack[index];
  valueStack[index] = null;
  index--;
}

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE = 11;

const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
const MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

let hasForceUpdate = false;

const reconcileChildFibers = ChildReconciler(true);
const mountChildFibers = ChildReconciler(false);

const NoEffect = /*                 */ 0b00000000000000;
const PerformedWork = /*            */ 0b00000000000001;
const Placement = /*                */ 0b00000000000010;
const Update = /*                   */ 0b00000000000100;
const PlacementAndUpdate = /*       */ 0b00000000000110;
const Deletion = /*                 */ 0b00000000001000;
const ContentReset = /*             */ 0b00000000010000;
const Callback = /*                 */ 0b00000000100000;
const DidCapture = /*               */ 0b00000001000000;
const Ref = /*                      */ 0b00000010000000;
const Snapshot = /*                 */ 0b00000100000000;
const Passive = /*                  */ 0b00001000000000;
const PassiveUnmountPendingDev = /* */ 0b10000000000000;
const Hydrating = /*                */ 0b00010000000000;
const HydratingAndUpdate = /*       */ 0b00010000000100;

const Incomplete = /*               */ 0b00100000000000;

const resetHydrationState = noop;

const isArray = Array.isArray;

const MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
const FAUX_ITERATOR_SYMBOL = "@@iterator";

const supportsMutation = true;
const enableDeprecatedFlareAPI = false;

const enableFundamentalAPI = false;

const workInProgressPrimarySources = [];
const workInProgressSecondarySources = [];

let injectedHook = null;

const unstable_ImmediatePriority = 1;
const unstable_UserBlockingPriority = 2;
const unstable_NormalPriority = 3;
const unstable_IdlePriority = 5;
const unstable_LowPriority = 4;

const Scheduler_ImmediatePriority = unstable_ImmediatePriority;

let rootWithPendingPassiveEffects = null;
let rootsWithPendingDiscreteUpdates = null;

const emptyRefsObject = new Component().refs;

const ReactCurrentBatchConfig = {
  suspense: null,
};

const enableTrustedTypesIntegration = false;

function requestCurrentSuspenseConfig() {
  return ReactCurrentBatchConfig.suspense;
}

function getNearestMountedFiber(fiber) {
  let node = fiber;
  let nearestMounted = fiber;
  if (!fiber.alternate) {
    // If there is no alternate, this might be a new tree that isn't inserted
    // yet. If it is, then it will have a pending insertion effect on it.
    let nextNode = node;
    do {
      node = nextNode;
      if ((node.effectTag & (Placement | Hydrating)) !== NoEffect) {
        // This is an insertion or in-progress hydration. The nearest possible
        // mounted fiber is the parent but we need to continue to figure out
        // if that one is still mounted.
        nearestMounted = node.return;
      }
      nextNode = node.return;
    } while (nextNode);
  } else {
    while (node.return) {
      node = node.return;
    }
  }
  if (node.tag === HostRoot) {
    // TODO: Check if this was a nested HostRoot when used with
    // renderContainerIntoSubtree.
    return nearestMounted;
  }
  // If we didn't hit the root, that means that we're in an disconnected tree
  // that has been unmounted.
  return null;
}

function isMounted(component) {
  const fiber = getInstance(component);
  if (!fiber) {
    return false;
  }
  return getNearestMountedFiber(fiber) === fiber;
}

const classComponentUpdater = {
  isMounted,
  enqueueSetState(inst, payload, callback) {
    const fiber = getInstance(inst);
    const eventTime = requestEventTime();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const lane = requestUpdateLane(fiber, suspenseConfig);

    const update = createUpdate(eventTime, lane, suspenseConfig);
    update.payload = payload;
    if (callback !== undefined && callback !== null) {
      if (__DEV__) {
        warnOnInvalidCallback(callback, "setState");
      }
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleUpdateOnFiber(fiber, lane);
  },
  enqueueReplaceState(inst, payload, callback) {
    const fiber = getInstance(inst);
    const eventTime = requestEventTime();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const lane = requestUpdateLane(fiber, suspenseConfig);

    const update = createUpdate(eventTime, lane, suspenseConfig);
    update.tag = ReplaceState;
    update.payload = payload;

    if (callback !== undefined && callback !== null) {
      if (__DEV__) {
        warnOnInvalidCallback(callback, "replaceState");
      }
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleUpdateOnFiber(fiber, lane);
  },
  enqueueForceUpdate(inst, callback) {
    const fiber = getInstance(inst);
    const eventTime = requestEventTime();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const lane = requestUpdateLane(fiber, suspenseConfig);

    const update = createUpdate(eventTime, lane, suspenseConfig);
    update.tag = ForceUpdate;

    if (callback !== undefined && callback !== null) {
      if (__DEV__) {
        warnOnInvalidCallback(callback, "forceUpdate");
      }
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleUpdateOnFiber(fiber, lane);
  },
};

function removeInstance(key) {
  key._reactInternals = undefined;
}

function getInstance(key) {
  return key._reactInternals;
}

function hasInstance(key) {
  return key._reactInternals !== undefined;
}

function setInstance(key, value) {
  key._reactInternals = value;
}

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== "object") {
    return null;
  }
  const maybeIterator =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === "function") {
    return maybeIterator;
  }
  return null;
}

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
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  let root = container._reactRootContainer;
  let fiberRoot;
  if (!root) {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    );
    fiberRoot = root._internalRoot;

    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
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
  return new ReactDOMBlockingRoot(container, LegacyRoot, options);
}

function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options);
}

function createRootImpl(container, tag, options) {
  const hydrate = options != null && options.hydrate === true;
  const hydrationCallbacks =
    (options != null && options.hydrationOptions) || null;
  const root = createContainer(container, tag, hydrate, hydrationCallbacks);
  markContainerAsRoot(root.current, container);
  const containerNodeType = container.nodeType;

  return root;
}

function createContainer(containerInfo, tag, hydrate, hydrationCallbacks) {
  return createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks);
}

function createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks) {
  const root = new FiberRootNode(containerInfo, tag, hydrate);
  // if (enableSuspenseCallback) {
  //   root.hydrationCallbacks = hydrationCallbacks;
  // }
  const uninitializedFiber = createHostRootFiber(tag);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  initializeUpdateQueue(uninitializedFiber);

  return root;
}

function unstable_getThreadID() {
  return ++threadIDCounter;
}

function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.current = null;
  this.pingCache = null;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackId = NoLanes;
  this.callbackIsSync = false;
  this.expiresAt = -1;

  this.pendingLanes = NoLanes;
  this.suspendedLanes = NoLanes;
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;
  this.mutableReadLanes = NoLanes;

  this.finishedLanes = NoLanes;

  // if (enableSchedulerTracing) {
  //   this.interactionThreadID = unstable_getThreadID();
  //   this.memoizedInteractions = new Set();
  //   this.pendingInteractionMap_new = new Map();
  // }
  // if (enableSuspenseCallback) {
  //   this.hydrationCallbacks = null;
  // }
}

function createHostRootFiber(tag) {
  let mode;
  if (tag === ConcurrentRoot) {
    mode = ConcurrentMode | BlockingMode | StrictMode;
  } else if (tag === BlockingRoot) {
    mode = BlockingMode | StrictMode;
  } else {
    mode = NoMode;
  }

  return createFiber(HostRoot, null, null, mode);
}

function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}

function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies_new = null;

  this.mode = mode;

  // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
}

function initializeUpdateQueue(fiber) {
  const queue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
    },
    effects: null,
  };
  fiber.updateQueue = queue;
}

function markContainerAsRoot(hostRoot, node) {
  node[internalContainerInstanceKey] = hostRoot;
}

function unbatchedUpdates(fn, a) {
  const preExecutionContext = executionContext;
  executionContext &= ~BatchedContext;
  executionContext |= LegacyUnbatchedContext;
  try {
    return fn(a);
  } finally {
    executionContext = preExecutionContext;
    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      flushSyncCallbackQueue();
    }
  }
}

function flushSyncCallbackQueue() {
  if (immediateQueueCallbackNode !== null) {
    const node = immediateQueueCallbackNode;
    immediateQueueCallbackNode = null;
    Scheduler_cancelCallback(node);
  }
  flushSyncCallbackQueueImpl();
}

function flushSyncCallbackQueueImpl() {
  if (!isFlushingSyncQueue && syncQueue !== null) {
    // Prevent re-entrancy.
    isFlushingSyncQueue = true;
    let i = 0;
    try {
      const isSync = true;
      const queue = syncQueue;
      runWithPriority(ImmediatePriority, () => {
        for (; i < queue.length; i++) {
          let callback = queue[i];
          do {
            callback = callback(isSync);
          } while (callback !== null);
        }
      });
      syncQueue = null;
    } catch (error) {
      // If something throws, leave the remaining callbacks on the queue.
      if (syncQueue !== null) {
        syncQueue = syncQueue.slice(i + 1);
      }
      // Resume flushing in the next tick
      Scheduler_scheduleCallback(
        Scheduler_ImmediatePriority,
        flushSyncCallbackQueue
      );
      throw error;
    } finally {
      isFlushingSyncQueue = false;
    }
  }
}

function updateContainer(element, container, parentComponent, callback) {
  const current = container.current;
  const eventTime = requestEventTime();

  const suspenseConfig = null;
  const lane = requestUpdateLane(current, suspenseConfig);

  const context = getContextForSubtree(parentComponent);

  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  const update = createUpdate(eventTime, lane, suspenseConfig);
  update.payload = { element };

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    update.callback = callback;
  }

  enqueueUpdate(container.current, update);
  scheduleUpdateOnFiber(current, lane);

  return lane;
}

function requestUpdateLane(fiber, suspenseConfig) {
  const mode = fiber.mode;
  if ((mode & BlockingMode) === NoMode) {
    return SyncLane;
  } else if ((mode & ConcurrentMode) === NoMode) {
    return SyncBatchedLane;
  } else if (
    !deferRenderPhaseUpdateToNextBatch &&
    (executionContext & RenderContext) !== NoContext &&
    workInProgressRootRenderLanes !== NoLane
  ) {
    return pickArbitraryLane(workInProgressRootRenderLanes);
  }

  if (currentEventWipLanes === NoLanes) {
    currentEventWipLanes = workInProgressRootIncludedLanes;
  }

  let lane;
  if (suspenseConfig !== null) {
  } else {
    const schedulerPriority = getCurrentPriorityLevel();

    if (
      (executionContext & DiscreteEventContext) !== NoContext &&
      schedulerPriority === UserBlockingPriority
    ) {
      lane = findUpdateLane(InputDiscreteLanePriority, currentEventWipLanes);
    } else {
      const lanePriority = schedulerPriorityToLanePriority(schedulerPriority);
      lane = findUpdateLane(lanePriority, currentEventWipLanes);
    }
  }

  return lane;
}

function pickArbitraryLane(lanes) {
  const clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
  const index = 31 - clz32(lanes);
  return index < 0 ? NoLanes : 1 << index;
}

function getCurrentPriorityLevel() {
  return Scheduler_getCurrentPriorityLevel();
}

function findUpdateLane(lanePriority, wipLanes) {
  switch (lanePriority) {
    case NoLanePriority:
      break;
    case SyncLanePriority:
      return SyncLane;
    case SyncBatchedLanePriority:
      return SyncBatchedLane;
    case InputDiscreteLanePriority: {
      let lane = findLane(
        InputDiscreteUpdateRangeStart,
        UpdateRangeEnd,
        wipLanes
      );
      if (lane === NoLane) {
        lane = InputDiscreteHydrationLane;
      }
      return lane;
    }
    case InputContinuousLanePriority: {
      let lane = findLane(
        InputContinuousUpdateRangeStart,
        UpdateRangeEnd,
        wipLanes
      );
      if (lane === NoLane) {
        lane = InputContinuousHydrationLane;
      }
      return lane;
    }
    case DefaultLanePriority: {
      let lane = findLane(DefaultUpdateRangeStart, UpdateRangeEnd, wipLanes);
      if (lane === NoLane) {
        lane = DefaultHydrationLane;
      }
      return lane;
    }
    case TransitionShortLanePriority:
    case TransitionLongLanePriority:
      // Should be handled by findTransitionLane instead
      break;
    case IdleLanePriority:
      let lane = findLane(IdleUpdateRangeStart, IdleUpdateRangeEnd, IdleLanes);
      if (lane === NoLane) {
        lane = IdleHydrationLane;
      }
      return lane;
    default:
      // The remaining priorities are not valid for updates
      break;
  }
}

function findLane(start, end, skipLanes) {
  // This finds the first bit between the `start` and `end` positions that isn't
  // in `skipLanes`.
  // TODO: This will always favor the rightmost bits. That's usually fine
  // because any bit that's pending will be part of `skipLanes`, so we'll do our
  // best to avoid accidental entanglement. However, lanes that are pending
  // inside an Offscreen tree aren't considered "pending" at the root level. So
  // they aren't included in `skipLanes`. So we should try not to favor any
  // particular part of the range, perhaps by incrementing an offset for each
  // distinct event. Must be the same within a single event, though.
  const bitsInRange = ((1 << (end - start)) - 1) << start;
  const possibleBits = bitsInRange & ~skipLanes;
  const leastSignificantBit = possibleBits & -possibleBits;
  return leastSignificantBit;
}

function schedulerPriorityToLanePriority(schedulerPriorityLevel) {
  switch (schedulerPriorityLevel) {
    case ImmediatePriority:
      return SyncLanePriority;
    case UserBlockingPriority:
      return InputContinuousLanePriority;
    case NormalPriority:
    case LowPriority:
      // TODO: Handle LowSchedulerPriority, somehow. Maybe the same lane as hydration.
      return DefaultLanePriority;
    case IdlePriority:
      return IdleLanePriority;
    default:
      return NoLanePriority;
  }
}

function getContextForSubtree(parentComponent) {
  if (!parentComponent) {
    return emptyContextObject;
  }

  const fiber = getInstance(parentComponent);
  const parentContext = findCurrentUnmaskedContext(fiber);

  if (fiber.tag === ClassComponent) {
    const Component = fiber.type;
    if (isLegacyContextProvider(Component)) {
      return processChildContext(fiber, Component, parentContext);
    }
  }

  return parentContext;
}

function getInstance(key) {
  return key._reactInternals;
}

function findCurrentUnmaskedContext(fiber) {
  if (disableLegacyContext) {
    return emptyContextObject;
  } else {
    let node = fiber;
    do {
      switch (node.tag) {
        case HostRoot:
          return node.stateNode.context;
        case ClassComponent: {
          const Component = node.type;
          if (isContextProvider(Component)) {
            return node.stateNode.__reactInternalMemoizedMergedChildContext;
          }
          break;
        }
      }
      node = node.return;
    } while (node !== null);
  }
}

function isContextProvider(type) {
  if (disableLegacyContext) {
    return false;
  } else {
    const childContextTypes = type.childContextTypes;
    return childContextTypes !== null && childContextTypes !== undefined;
  }
}

const isLegacyContextProvider = isContextProvider;

function processChildContext(fiber, type, parentContext) {
  if (disableLegacyContext) {
    return parentContext;
  } else {
    const instance = fiber.stateNode;
    const childContextTypes = type.childContextTypes;

    // TODO (bvaughn) Replace this behavior with an invariant() in the future.
    // It has only been added in Fiber to match the (unintentional) behavior in Stack.
    if (typeof instance.getChildContext !== "function") {
      return parentContext;
    }

    const childContext = instance.getChildContext();

    return { ...parentContext, ...childContext };
  }
}

function createUpdate(eventTime, lane, suspenseConfig) {
  const update = {
    eventTime,
    lane,
    suspenseConfig,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
  };
  return update;
}

function enqueueUpdate(fiber, update) {
  const updateQueue = fiber.updateQueue;
  if (updateQueue === null) {
    // Only occurs if the fiber has been unmounted.
    return;
  }

  const sharedQueue = updateQueue.shared;
  const pending = sharedQueue.pending;
  if (pending === null) {
    // This is the first update. Create a circular list.
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  sharedQueue.pending = update;
}

function scheduleUpdateOnFiber(fiber, lane) {
  const root = markUpdateLaneFromFiberToRoot(fiber, lane);

  const priorityLevel = getCurrentPriorityLevel();

  if (lane === SyncLane) {
    if (
      // Check if we're inside unbatchedUpdates
      (executionContext & LegacyUnbatchedContext) !== NoContext &&
      // Check if we're not already rendering
      (executionContext & (RenderContext | CommitContext)) === NoContext
    ) {
      // Register pending interactions on the root to avoid losing traced interaction data.
      schedulePendingInteractions(root, lane);

      // This is a legacy edge case. The initial mount of a ReactDOM.render-ed
      // root inside of batchedUpdates should be synchronous, but layout updates
      // should be deferred until the end of the batch.
      consoleDeep("root ->", root);
      performSyncWorkOnRoot(root);
    } else {
      ensureRootIsScheduled(root);
      schedulePendingInteractions(root, lane);
      if (executionContext === NoContext) {
        // Flush the synchronous work now, unless we're already working or inside
        // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
        // scheduleCallbackForFiber to preserve the ability to schedule a callback
        // without immediately flushing it. We only do this for user-initiated
        // updates, to preserve historical behavior of legacy mode.
        flushSyncCallbackQueue();
      }
    }
  }
}

function markUpdateLaneFromFiberToRoot(fiber, lane) {
  // Update the source fiber's lanes
  fiber.lanes = mergeLanes(fiber.lanes, lane);
  let alternate = fiber.alternate;
  if (alternate !== null) {
    alternate.lanes = mergeLanes(alternate.lanes, lane);
  }

  let node = fiber.return;
  let root = null;
  if (node === null && fiber.tag === HostRoot) {
    root = fiber.stateNode;
  } else {
    while (node !== null) {
      alternate = node.alternate;
      node.childLanes = mergeLanes(node.childLanes, lane);
      if (alternate !== null) {
        alternate.childLanes = mergeLanes(alternate.childLanes, lane);
      }
      if (node.return === null && node.tag === HostRoot) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  }

  if (root !== null) {
    // Mark that the root has a pending update.
    markRootUpdated(root, lane);
    if (workInProgressRoot === root) {
      // Received an update to a tree that's in the middle of rendering. Mark
      // that there was an interleaved update work on this root. Unless the
      // `deferRenderPhaseUpdateToNextBatch` flag is off and this is a render
      // phase update. In that case, we don't treat render phase updates as if
      // they were interleaved, for backwards compat reasons.
      if (
        deferRenderPhaseUpdateToNextBatch ||
        (executionContext & RenderContext) === NoContext
      ) {
        workInProgressRootUpdatedLanes = mergeLanes(
          workInProgressRootUpdatedLanes,
          lane
        );
      }
      if (workInProgressRootExitStatus === RootSuspendedWithDelay) {
        // The root already suspended with a delay, which means this render
        // definitely won't finish. Since we have a new update, let's mark it as
        // suspended now, right before marking the incoming update. This has the
        // effect of interrupting the current render and switching to the update.
        // TODO: Make sure this doesn't override pings that happen while we've
        // already started rendering.
        markRootSuspended(root, workInProgressRootRenderLanes);
      }
    }
  }

  return root;
}

function markRootUpdated(root, updateLane) {
  root.pendingLanes |= updateLane;

  // TODO: Theoretically, any update to any lane can unblock any other lane. But
  // it's not practical to try every single possible combination. We need a
  // heuristic to decide which lanes to attempt to render, and in which batches.
  // For now, we use the same heuristic as in the old ExpirationTimes model:
  // retry any lane at equal or lower priority, but don't try updates at higher
  // priority without also including the lower priority updates. This works well
  // when considering updates across different priority levels, but isn't
  // sufficient for updates within the same priority, since we want to treat
  // those updates as parallel.

  // Unsuspend any update at equal or lower priority.
  const higherPriorityLanes = updateLane - 1; // Turns 0b1000 into 0b0111
  root.suspendedLanes &= higherPriorityLanes;
  root.pingedLanes &= higherPriorityLanes;
}

function markRootSuspended(root, suspendedLanes) {
  // When suspending, we should always exclude lanes that were pinged or (more
  // rarely, since we try to avoid it) updated during the render phase.
  // TODO: Lol maybe there's a better way to factor this besides this
  // obnoxiously named function :)
  suspendedLanes = removeLanes(suspendedLanes, workInProgressRootPingedLanes);
  suspendedLanes = removeLanes(suspendedLanes, workInProgressRootUpdatedLanes);
  markRootSuspended_dontCallThisOneDirectly(root, suspendedLanes);
}

function markRootSuspended_dontCallThisOneDirectly(root, suspendedLanes) {
  root.suspendedLanes |= suspendedLanes;
  root.pingedLanes &= ~suspendedLanes;
}

function mergeLanes(a, b) {
  return a | b;
}

function removeLanes(set, subset) {
  return set & ~subset;
}

function schedulePendingInteractions() {
  if (!enableSchedulerTracing) {
    return;
  }
}

function performSyncWorkOnRoot(root) {
  flushPassiveEffects();

  let lanes;
  let exitStatus;
  if (
    root === workInProgressRoot &&
    includesSomeLane(root.expiredLanes, workInProgressRootRenderLanes)
  ) {
    // There's a partial tree, and at least one of its lanes has expired. Finish
    // rendering it before rendering the rest of the expired work.
    lanes = workInProgressRootRenderLanes;
    exitStatus = renderRootSync(root, lanes);
    if (
      includesSomeLane(
        workInProgressRootIncludedLanes,
        workInProgressRootUpdatedLanes
      )
    ) {
      // The render included lanes that were updated during the render phase.
      // For example, when unhiding a hidden tree, we include all the lanes
      // that were previously skipped when the tree was hidden. That set of
      // lanes is a superset of the lanes we started rendering with.
      //
      // Note that this only happens when part of the tree is rendered
      // concurrently. If the whole tree is rendered synchronously, then there
      // are no interleaved events.
      lanes = getNextLanes(root, lanes);
      exitStatus = renderRootSync(root, lanes);
    }
  } else {
    lanes = getNextLanes(root, NoLanes);
    exitStatus = renderRootSync(root, lanes);
  }
  if (root.tag !== LegacyRoot && exitStatus === RootErrored) {
    // If something threw an error, try rendering one more time. We'll render
    // synchronously to block concurrent data mutations, and we'll includes
    // all pending updates are included. If it still fails after the second
    // attempt, we'll give up and commit the resulting tree.
    lanes = getLanesToRetrySynchronouslyOnError(root);
    if (lanes !== NoLanes) {
      exitStatus = renderRootSync(root, lanes);
    }
  }
  if (exitStatus === RootFatalErrored) {
    const fatalError = workInProgressRootFatalError;
    prepareFreshStack(root, NoLanes);
    markRootSuspended(root, lanes);
    ensureRootIsScheduled(root);
    throw fatalError;
  }
  // We now have a consistent tree. Because this is a sync render, we
  // will commit it even if something suspended.
  const finishedWork = root.current.alternate;
  root.finishedWork = finishedWork;
  root.finishedLanes = lanes;
  consoleDeep("finishedWork ->", finishedWork);
  commitRoot(root);
  // Before exiting, make sure there's a callback scheduled for the next
  // pending level.
  ensureRootIsScheduled(root);
  return null;
}

function flushPassiveEffects() {
  if (pendingPassiveEffectsRenderPriority !== NoSchedulerPriority) {
    const priorityLevel =
      pendingPassiveEffectsRenderPriority > NormalSchedulerPriority
        ? NormalSchedulerPriority
        : pendingPassiveEffectsRenderPriority;
    pendingPassiveEffectsRenderPriority = NoSchedulerPriority;
    // todo
    return runWithPriority(priorityLevel, flushPassiveEffectsImpl);
  }
}

function getNextLanes(root, wipLanes) {
  // Early bailout if there's no pending work left.
  const pendingLanes = root.pendingLanes;
  if (pendingLanes === NoLanes) {
    return_highestLanePriority = NoLanePriority;
    return NoLanes;
  }

  let nextLanes = NoLanes;
  let nextLanePriority = NoLanePriority;
  let equalOrHigherPriorityLanes = NoLanes;

  const expiredLanes = root.expiredLanes;
  const suspendedLanes = root.suspendedLanes;
  const pingedLanes = root.pingedLanes;

  // Check if any work has expired.
  if (expiredLanes !== NoLanes) {
    nextLanes = expiredLanes;
    nextLanePriority = return_highestLanePriority = SyncLanePriority;
    equalOrHigherPriorityLanes = (getLowestPriorityLane(nextLanes) << 1) - 1;
  } else {
    // Do not work on any idle work until all the non-idle work has finished,
    // even if the work is suspended.
    const nonIdlePendingLanes = pendingLanes & NonIdleLanes;
    if (nonIdlePendingLanes !== NoLanes) {
      const nonIdleUnblockedLanes = nonIdlePendingLanes & ~suspendedLanes;
      if (nonIdleUnblockedLanes !== NoLanes) {
        nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes);
        nextLanePriority = return_highestLanePriority;
        equalOrHigherPriorityLanes = (1 << return_updateRangeEnd) - 1;
      } else {
        const nonIdlePingedLanes = nonIdlePendingLanes & pingedLanes;
        if (nonIdlePingedLanes !== NoLanes) {
          nextLanes = getHighestPriorityLanes(nonIdlePingedLanes);
          nextLanePriority = return_highestLanePriority;
          equalOrHigherPriorityLanes = (1 << return_updateRangeEnd) - 1;
        }
      }
    } else {
      // The only remaining work is Idle.
      const unblockedLanes = pendingLanes & ~suspendedLanes;
      if (unblockedLanes !== NoLanes) {
        nextLanes = getHighestPriorityLanes(unblockedLanes);
        nextLanePriority = return_highestLanePriority;
        equalOrHigherPriorityLanes = (1 << return_updateRangeEnd) - 1;
      } else {
        if (pingedLanes !== NoLanes) {
          nextLanes = getHighestPriorityLanes(pingedLanes);
          nextLanePriority = return_highestLanePriority;
          equalOrHigherPriorityLanes = (1 << return_updateRangeEnd) - 1;
        }
      }
    }
  }

  if (nextLanes === NoLanes) {
    // This should only be reachable if we're suspended
    // TODO: Consider warning in this path if a fallback timer is not scheduled.
    return NoLanes;
  }

  // If there are higher priority lanes, we'll include them even if they
  // are suspended.
  nextLanes = pendingLanes & equalOrHigherPriorityLanes;

  // If we're already in the middle of a render, switching lanes will interrupt
  // it and we'll lose our progress. We should only do this if the new lanes are
  // higher priority.
  if (
    wipLanes !== NoLanes &&
    wipLanes !== nextLanes &&
    // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (wipLanes & suspendedLanes) === NoLanes
  ) {
    getHighestPriorityLanes(wipLanes);
    const wipLanePriority = return_highestLanePriority;
    if (nextLanePriority <= wipLanePriority) {
      return wipLanes;
    } else {
      return_highestLanePriority = nextLanePriority;
    }
  }

  return nextLanes;
}

function getHighestPriorityLanes(lanes) {
  if ((SyncLane & lanes) !== NoLanes) {
    return_highestLanePriority = SyncLanePriority;
    return_updateRangeEnd = SyncUpdateRangeEnd;
    return SyncLane;
  }
  if ((SyncBatchedLane & lanes) !== NoLanes) {
    return_highestLanePriority = SyncBatchedLanePriority;
    return_updateRangeEnd = SyncBatchedUpdateRangeEnd;
    return SyncBatchedLane;
  }
  const inputDiscreteLanes = InputDiscreteLanes & lanes;
  if (inputDiscreteLanes !== NoLanes) {
    if (inputDiscreteLanes & InputDiscreteHydrationLane) {
      return_highestLanePriority = InputDiscreteHydrationLanePriority;
      return_updateRangeEnd = InputDiscreteUpdateRangeStart;
      return InputDiscreteHydrationLane;
    } else {
      return_highestLanePriority = InputDiscreteLanePriority;
      return_updateRangeEnd = InputDiscreteUpdateRangeEnd;
      return inputDiscreteLanes;
    }
  }
  const inputContinuousLanes = InputContinuousLanes & lanes;
  if (inputContinuousLanes !== NoLanes) {
    if (inputContinuousLanes & InputContinuousHydrationLane) {
      return_highestLanePriority = InputContinuousHydrationLanePriority;
      return_updateRangeEnd = InputContinuousUpdateRangeStart;
      return InputContinuousHydrationLane;
    } else {
      return_highestLanePriority = InputContinuousLanePriority;
      return_updateRangeEnd = InputContinuousUpdateRangeEnd;
      return inputContinuousLanes;
    }
  }
  const defaultLanes = DefaultLanes & lanes;
  if (defaultLanes !== NoLanes) {
    if (defaultLanes & DefaultHydrationLane) {
      return_highestLanePriority = DefaultHydrationLanePriority;
      return_updateRangeEnd = DefaultUpdateRangeStart;
      return DefaultHydrationLane;
    } else {
      return_highestLanePriority = DefaultLanePriority;
      return_updateRangeEnd = DefaultUpdateRangeEnd;
      return defaultLanes;
    }
  }
  const transitionShortLanes = TransitionShortLanes & lanes;
  if (transitionShortLanes !== NoLanes) {
    if (transitionShortLanes & TransitionShortHydrationLane) {
      return_highestLanePriority = TransitionShortHydrationLanePriority;
      return_updateRangeEnd = TransitionShortUpdateRangeStart;
      return TransitionShortHydrationLane;
    } else {
      return_highestLanePriority = TransitionShortLanePriority;
      return_updateRangeEnd = TransitionShortUpdateRangeEnd;
      return transitionShortLanes;
    }
  }
  const transitionLongLanes = TransitionLongLanes & lanes;
  if (transitionLongLanes !== NoLanes) {
    if (transitionLongLanes & TransitionLongHydrationLane) {
      return_highestLanePriority = TransitionLongHydrationLanePriority;
      return_updateRangeEnd = TransitionLongUpdateRangeStart;
      return TransitionLongHydrationLane;
    } else {
      return_highestLanePriority = TransitionLongLanePriority;
      return_updateRangeEnd = TransitionLongUpdateRangeEnd;
      return transitionLongLanes;
    }
  }
  if (lanes & SelectiveHydrationLane) {
    return_highestLanePriority = SelectiveHydrationLanePriority;
    return_updateRangeEnd = SelectiveHydrationRangeEnd;
    return SelectiveHydrationLane;
  }
  const idleLanes = IdleLanes & lanes;
  if (idleLanes !== NoLanes) {
    if (idleLanes & IdleHydrationLane) {
      return_highestLanePriority = IdleHydrationLanePriority;
      return_updateRangeEnd = IdleUpdateRangeStart;
      return IdleHydrationLane;
    } else {
      return_updateRangeEnd = IdleUpdateRangeEnd;
      return idleLanes;
    }
  }
  if ((OffscreenLane & lanes) !== NoLanes) {
    return_highestLanePriority = OffscreenLanePriority;
    return_updateRangeEnd = TotalLanes;
    return OffscreenLane;
  }
  // This shouldn't be reachable, but as a fallback, return the entire bitmask.
  return_highestLanePriority = DefaultLanePriority;
  return_updateRangeEnd = DefaultUpdateRangeEnd;
  return lanes;
}

function renderRootSync(root, lanes) {
  const prevExecutionContext = executionContext;
  executionContext |= RenderContext;
  const prevDispatcher = pushDispatcher(root);

  // If the root or lanes have changed, throw out the existing stack
  // and prepare a fresh one. Otherwise we'll continue where we left off.
  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
    prepareFreshStack(root, lanes);
    startWorkOnPendingInteractions(root, lanes);
  }

  const prevInteractions = pushInteractions(root);

  do {
    try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      console.error(thrownValue);
      handleError(root, thrownValue);
    }
  } while (true);
  resetContextDependencies();
  if (enableSchedulerTracing) {
    popInteractions(prevInteractions);
  }

  executionContext = prevExecutionContext;
  popDispatcher(prevDispatcher);

  if (workInProgress !== null) {
    // This is a sync render, so we should have finished the whole tree.
    invariant(
      false,
      "Cannot commit an incomplete root. This error is likely caused by a " +
        "bug in React. Please file an issue."
    );
  }

  // Set this to null to indicate there's no in-progress render.
  workInProgressRoot = null;
  workInProgressRootRenderLanes = NoLanes;

  return workInProgressRootExitStatus;
}

function pushDispatcher(root) {
  const prevDispatcher = ReactCurrentDispatcher.current;
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  if (prevDispatcher === null) {
    return ContextOnlyDispatcher;
  } else {
    return prevDispatcher;
  }
}

function readContext(context, observedBits) {
  if (lastContextWithAllBitsObserved === context) {
    // Nothing to do. We already observe everything in this context.
  } else if (observedBits === false || observedBits === 0) {
    // Do not observe any updates.
  } else {
    let resolvedObservedBits; // Avoid deopting on observable arguments or heterogeneous types.
    if (
      typeof observedBits !== "number" ||
      observedBits === MAX_SIGNED_31_BIT_INT
    ) {
      // Observe all updates.
      lastContextWithAllBitsObserved = context;
      resolvedObservedBits = MAX_SIGNED_31_BIT_INT;
    } else {
      resolvedObservedBits = observedBits;
    }

    const contextItem = {
      context,
      observedBits: resolvedObservedBits,
      next: null,
    };

    if (lastContextDependency === null) {
      // This is the first dependency for this component. Create a new list.
      lastContextDependency = contextItem;
      currentlyRenderingFiber.dependencies_new = {
        lanes: NoLanes,
        firstContext: contextItem,
        responders: null,
      };
    } else {
      // Append a new context item.
      lastContextDependency = lastContextDependency.next = contextItem;
    }
  }
  return isPrimaryRenderer ? context._currentValue : context._currentValue2;
}

function createCursor(defaultValue) {
  return {
    current: defaultValue,
  };
}

function prepareFreshStack(root, lanes) {
  root.finishedWork = null;
  root.finishedLanes = NoLanes;

  const timeoutHandle = root.timeoutHandle;
  if (timeoutHandle !== noTimeout) {
    // The root previous suspended and scheduled a timeout to commit a fallback
    // state. Now that we have additional work, cancel the timeout.
    root.timeoutHandle = noTimeout;
    // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
    cancelTimeout(timeoutHandle);
  }

  if (workInProgress !== null) {
    let interruptedWork = workInProgress.return;
    while (interruptedWork !== null) {
      unwindInterruptedWork(interruptedWork);
      interruptedWork = interruptedWork.return;
    }
  }
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null);
  workInProgressRootRenderLanes = subtreeRenderLanes = workInProgressRootIncludedLanes = lanes;
  workInProgressRootExitStatus = RootIncomplete;
  workInProgressRootFatalError = null;
  workInProgressRootLatestProcessedEventTime = -1;
  workInProgressRootLatestSuspenseTimeout = -1;
  workInProgressRootCanSuspendUsingConfig = null;
  workInProgressRootSkippedLanes = NoLanes;
  workInProgressRootUpdatedLanes = NoLanes;
  workInProgressRootPingedLanes = NoLanes;

  if (enableSchedulerTracing) {
    spawnedWorkDuringRender = null;
  }
}

function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  if (workInProgress === null) {
    // We use a double buffering pooling technique because we know that we'll
    // only ever need at most two versions of a tree. We pool the "other" unused
    // node that we're free to reuse. This is lazily created to avoid allocating
    // extra objects for things that are never updated. It also allow us to
    // reclaim the extra memory if needed.
    workInProgress = createFiber(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    );
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;

    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    // Needed because Blocks store data on type.
    workInProgress.type = current.type;

    // We already have an alternate.
    // Reset the effect tag.
    workInProgress.effectTag = NoEffect;

    // The effect list is no longer valid.
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;

    if (enableProfilerTimer) {
      // We intentionally reset, rather than copy, actualDuration & actualStartTime.
      // This prevents time from endlessly accumulating in new commits.
      // This has the downside of resetting values for different priority renders,
      // But works for yielding (the common case) and should support resuming.
      workInProgress.actualDuration = 0;
      workInProgress.actualStartTime = -1;
    }
  }

  workInProgress.childLanes = current.childLanes;
  workInProgress.lanes = current.lanes;

  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;

  // Clone the dependencies object. This is mutated during the render phase, so
  // it cannot be shared with the current fiber.
  const currentDependencies = current.dependencies_new;
  workInProgress.dependencies_new =
    currentDependencies === null
      ? null
      : {
          lanes: currentDependencies.lanes,
          firstContext: currentDependencies.firstContext,
          responders: currentDependencies.responders,
        };

  // These will be overridden during the parent's reconciliation
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;

  if (enableProfilerTimer) {
    workInProgress.selfBaseDuration = current.selfBaseDuration;
    workInProgress.treeBaseDuration = current.treeBaseDuration;
  }

  return workInProgress;
}

function startWorkOnPendingInteractions(root, lanes) {
  // This is called when new work is started on a root.
  if (!enableSchedulerTracing) {
    return;
  }

  // Determine which interactions this batch of work currently includes, So that
  // we can accurately attribute time spent working on it, And so that cascading
  // work triggered during the render phase will be associated with it.
  const interactions = new Set();
  root.pendingInteractionMap_new.forEach(
    (scheduledInteractions, scheduledLane) => {
      if (includesSomeLane(lanes, scheduledLane)) {
        scheduledInteractions.forEach((interaction) =>
          interactions.add(interaction)
        );
      }
    }
  );

  // Store the current set of interactions on the FiberRoot for a few reasons:
  // We can re-use it in hot functions like performConcurrentWorkOnRoot()
  // without having to recalculate it. We will also use it in commitWork() to
  // pass to any Profiler onRender() hooks. This also provides DevTools with a
  // way to access it when the onCommitRoot() hook is called.
  root.memoizedInteractions = interactions;

  if (interactions.size > 0) {
    const subscriber = __subscriberRef.current;
    if (subscriber !== null) {
      const threadID = computeThreadID(root, lanes);
      try {
        subscriber.onWorkStarted(interactions, threadID);
      } catch (error) {
        // If the subscriber throws, rethrow it in a separate task
        scheduleCallback(ImmediatePriority, () => {
          throw error;
        });
      }
    }
  }
}

function pushInteractions(root) {
  if (enableSchedulerTracing) {
    const prevInteractions = __interactionsRef.current;
    __interactionsRef.current = root.memoizedInteractions;
    return prevInteractions;
  }
  return null;
}

function workLoopSync() {
  // Already timed out, so perform work without checking if we need to yield.
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork) {
  consoleDeep("next ->", unitOfWork);

  // The current, flushed, state of this fiber is the alternate. Ideally
  // nothing should rely on this, but relying on it here means that we don't
  // need an additional field on the work in progress.
  const current = unitOfWork.alternate;

  let next;
  if (enableProfilerTimer && (unitOfWork.mode & ProfileMode) !== NoMode) {
    startProfilerTimer(unitOfWork);
    next = beginWork(current, unitOfWork, subtreeRenderLanes);
    stopProfilerTimerIfRunningAndRecordDelta(unitOfWork, true);
  } else {
    next = beginWork(current, unitOfWork, subtreeRenderLanes);
  }

  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if (next === null) {
    // If this doesn't spawn new work, complete the current work.
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }

  ReactCurrentOwner.current = null;
}

function beginWork(current, workInProgress, renderLanes) {
  const updateLanes = workInProgress.lanes;

  if (current !== null) {
    const oldProps = current.memoizedProps;
    const newProps = workInProgress.pendingProps;

    if (!includesSomeLane(renderLanes, updateLanes)) {
      didReceiveUpdate = false;
      // This fiber does not have any pending work. Bailout without entering
      // the begin phase. There's still some bookkeeping we that needs to be done
      // in this optimized path, mostly pushing stuff onto the stack.
      switch (workInProgress.tag) {
        case HostRoot:
          pushHostRootContext(workInProgress);
          resetHydrationState();
          break;
        case HostComponent:
          pushHostContext(workInProgress);
          break;
        case ClassComponent: {
          const Component = workInProgress.type;
          if (isLegacyContextProvider(Component)) {
            pushLegacyContextProvider(workInProgress);
          }
          break;
        }
        case HostPortal:
          pushHostContainer(
            workInProgress,
            workInProgress.stateNode.containerInfo
          );
          break;
        case ContextProvider: {
          const newValue = workInProgress.memoizedProps.value;
          pushProvider(workInProgress, newValue);
          break;
        }
        case Profiler:
          if (enableProfilerTimer) {
            // Profiler should only call onRender when one of its descendants actually rendered.
            const hasChildWork = includesSomeLane(
              renderLanes,
              workInProgress.childLanes
            );
            if (hasChildWork) {
              workInProgress.effectTag |= Update;
            }

            // Reset effect durations for the next eventual effect phase.
            // These are reset during render to allow the DevTools commit hook a chance to read them,
            const stateNode = workInProgress.stateNode;
            stateNode.effectDuration = 0;
            stateNode.passiveEffectDuration = 0;
          }
          break;
        case SuspenseComponent: {
          const state = workInProgress.memoizedState;
          if (state !== null) {
            if (enableSuspenseServerRenderer) {
              if (state.dehydrated !== null) {
                pushSuspenseContext(
                  workInProgress,
                  setDefaultShallowSuspenseContext(suspenseStackCursor.current)
                );
                // We know that this component will suspend again because if it has
                // been unsuspended it has committed as a resolved Suspense component.
                // If it needs to be retried, it should have work scheduled on it.
                workInProgress.effectTag |= DidCapture;
                // We should never render the children of a dehydrated boundary until we
                // upgrade it. We return null instead of bailoutOnAlreadyFinishedWork.
                return null;
              }
            }

            // If this boundary is currently timed out, we need to decide
            // whether to retry the primary children, or to skip over it and
            // go straight to the fallback. Check the priority of the primary
            // child fragment.
            const primaryChildFragment = workInProgress.child;
            const primaryChildLanes = primaryChildFragment.childLanes;
            if (includesSomeLane(renderLanes, primaryChildLanes)) {
              // The primary children have pending work. Use the normal path
              // to attempt to render the primary children again.
              return updateSuspenseComponent(
                current,
                workInProgress,
                renderLanes
              );
            } else {
              // The primary child fragment does not have pending work marked
              // on it
              pushSuspenseContext(
                workInProgress,
                setDefaultShallowSuspenseContext(suspenseStackCursor.current)
              );
              // The primary children do not have pending work with sufficient
              // priority. Bailout.
              const child = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress,
                renderLanes
              );
              if (child !== null) {
                // The fallback children have pending work. Skip over the
                // primary children and work on the fallback.
                return child.sibling;
              } else {
                return null;
              }
            }
          } else {
            pushSuspenseContext(
              workInProgress,
              setDefaultShallowSuspenseContext(suspenseStackCursor.current)
            );
          }
          break;
        }
        case SuspenseListComponent: {
          const didSuspendBefore =
            (current.effectTag & DidCapture) !== NoEffect;

          const hasChildWork = includesSomeLane(
            renderLanes,
            workInProgress.childLanes
          );

          if (didSuspendBefore) {
            if (hasChildWork) {
              // If something was in fallback state last time, and we have all the
              // same children then we're still in progressive loading state.
              // Something might get unblocked by state updates or retries in the
              // tree which will affect the tail. So we need to use the normal
              // path to compute the correct tail.
              return updateSuspenseListComponent(
                current,
                workInProgress,
                renderLanes
              );
            }
            // If none of the children had any work, that means that none of
            // them got retried so they'll still be blocked in the same way
            // as before. We can fast bail out.
            workInProgress.effectTag |= DidCapture;
          }

          // If nothing suspended before and we're rendering the same children,
          // then the tail doesn't matter. Anything new that suspends will work
          // in the "together" mode, so we can continue from the state we had.
          const renderState = workInProgress.memoizedState;
          if (renderState !== null) {
            // Reset to the "together" mode in case we've started a different
            // update in the past but didn't complete it.
            renderState.rendering = null;
            renderState.tail = null;
            renderState.lastEffect = null;
          }
          pushSuspenseContext(workInProgress, suspenseStackCursor.current);

          if (hasChildWork) {
            break;
          } else {
            // If none of the children had any work, that means that none of
            // them got retried so they'll still be blocked in the same way
            // as before. We can fast bail out.
            return null;
          }
        }
        case OffscreenComponent:
        case LegacyHiddenComponent: {
          // Need to check if the tree still needs to be deferred. This is
          // almost identical to the logic used in the normal update path,
          // so we'll just enter that. The only difference is we'll bail out
          // at the next level instead of this one, because the child props
          // have not changed. Which is fine.
          // TODO: Probably should refactor `beginWork` to split the bailout
          // path from the normal path. I'm tempted to do a labeled break here
          // but I won't :)
          workInProgress.lanes = NoLanes;
          return updateOffscreenComponent(current, workInProgress, renderLanes);
        }
      }
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    } else {
      // An update was scheduled on this fiber, but there are no new props
      // nor legacy context. Set this to false. If an update queue or context
      // consumer produces a changed value, it will set this to true. Otherwise,
      // the component will assume the children have not changed and bail out.
      didReceiveUpdate = false;
    }
  } else {
    didReceiveUpdate = false;
  }

  // Before entering the begin phase, clear pending update priority.
  // TODO: This assumes that we're about to evaluate the component and process
  // the update queue. However, there's an exception: SimpleMemoComponent
  // sometimes bails out later in the begin phase. This indicates that we should
  // move this assignment out of the common path and into each branch.
  workInProgress.lanes = NoLanes;

  switch (workInProgress.tag) {
    case IndeterminateComponent: {
      return mountIndeterminateComponent(
        current,
        workInProgress,
        workInProgress.type,
        renderLanes
      );
    }
    case LazyComponent: {
      const elementType = workInProgress.elementType;
      return mountLazyComponent(
        current,
        workInProgress,
        elementType,
        updateLanes,
        renderLanes
      );
    }
    case FunctionComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes
      );
    }
    case ClassComponent: {
      consoleDeep("ClassComponent");
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return updateClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes
      );
    }
    case HostRoot:
      consoleDeep("HostRoot");
      return updateHostRoot(current, workInProgress, renderLanes);
    case HostComponent:
      consoleDeep("HostComponent");
      return updateHostComponent(current, workInProgress, renderLanes);
    case HostText:
      return updateHostText(current, workInProgress);
    case SuspenseComponent:
      return updateSuspenseComponent(current, workInProgress, renderLanes);
    case HostPortal:
      return updatePortalComponent(current, workInProgress, renderLanes);
    case ForwardRef: {
      const type = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === type
          ? unresolvedProps
          : resolveDefaultProps(type, unresolvedProps);
      return updateForwardRef(
        current,
        workInProgress,
        type,
        resolvedProps,
        renderLanes
      );
    }
    case Fragment:
      return updateFragment(current, workInProgress, renderLanes);
    case Mode:
      return updateMode(current, workInProgress, renderLanes);
    case Profiler:
      return updateProfiler(current, workInProgress, renderLanes);
    case ContextProvider:
      return updateContextProvider(current, workInProgress, renderLanes);
    case ContextConsumer:
      return updateContextConsumer(current, workInProgress, renderLanes);
    case MemoComponent: {
      const type = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      // Resolve outer props first, then resolve inner props.
      let resolvedProps = resolveDefaultProps(type, unresolvedProps);
      if (__DEV__) {
        if (workInProgress.type !== workInProgress.elementType) {
          const outerPropTypes = type.propTypes;
          if (outerPropTypes) {
            checkPropTypes(
              outerPropTypes,
              resolvedProps, // Resolved for outer only
              "prop",
              getComponentName(type)
            );
          }
        }
      }
      resolvedProps = resolveDefaultProps(type.type, resolvedProps);
      return updateMemoComponent(
        current,
        workInProgress,
        type,
        resolvedProps,
        updateLanes,
        renderLanes
      );
    }
    case SimpleMemoComponent: {
      return updateSimpleMemoComponent(
        current,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        updateLanes,
        renderLanes
      );
    }
    case IncompleteClassComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return mountIncompleteClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes
      );
    }
    case SuspenseListComponent: {
      return updateSuspenseListComponent(current, workInProgress, renderLanes);
    }
    case FundamentalComponent: {
      if (enableFundamentalAPI) {
        return updateFundamentalComponent(current, workInProgress, renderLanes);
      }
      break;
    }
    case ScopeComponent: {
      if (enableScopeAPI) {
        return updateScopeComponent(current, workInProgress, renderLanes);
      }
      break;
    }
    case Block: {
      if (enableBlocksAPI) {
        const block = workInProgress.type;
        const props = workInProgress.pendingProps;
        return updateBlock(current, workInProgress, block, props, renderLanes);
      }
      break;
    }
    case OffscreenComponent: {
      return updateOffscreenComponent(current, workInProgress, renderLanes);
    }
    case LegacyHiddenComponent: {
      return updateLegacyHiddenComponent(current, workInProgress, renderLanes);
    }
  }
  invariant(
    false,
    "Unknown unit of work tag (%s). This error is likely caused by a bug in " +
      "React. Please file an issue.",
    workInProgress.tag
  );
}

function includesSomeLane(a, b) {
  return (a & b) !== NoLanes;
}

function prepareToReadContext(workInProgress, renderLanes) {
  currentlyRenderingFiber = workInProgress;
  lastContextDependency = null;
  lastContextWithAllBitsObserved = null;

  const dependencies = workInProgress.dependencies_new;
  if (dependencies !== null) {
    const firstContext = dependencies.firstContext;
    if (firstContext !== null) {
      if (includesSomeLane(dependencies.lanes, renderLanes)) {
        // Context list has a pending update. Mark that this fiber performed work.
        markWorkInProgressReceivedUpdate();
      }
      // Reset the work-in-progress list
      dependencies.firstContext = null;
    }
  }
}

function resetHasForceUpdateBeforeProcessing() {
  hasForceUpdate = false;
}

function checkHasForceUpdateAfterProcessing() {
  return hasForceUpdate;
}

function hasContextChanged() {
  if (disableLegacyContext) {
    return false;
  } else {
    return didPerformWorkStackCursor.current;
  }
}

function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext
) {
  const instance = workInProgress.stateNode;
  if (typeof instance.shouldComponentUpdate === "function") {
    if (__DEV__) {
      if (
        debugRenderPhaseSideEffectsForStrictMode &&
        workInProgress.mode & StrictMode
      ) {
        disableLogs();
        try {
          // Invoke the function an extra time to help detect side-effects.
          instance.shouldComponentUpdate(newProps, newState, nextContext);
        } finally {
          reenableLogs();
        }
      }
    }
    const shouldUpdate = instance.shouldComponentUpdate(
      newProps,
      newState,
      nextContext
    );

    if (__DEV__) {
      if (shouldUpdate === undefined) {
        console.error(
          "%s.shouldComponentUpdate(): Returned undefined instead of a " +
            "boolean value. Make sure to return true or false.",
          getComponentName(ctor) || "Component"
        );
      }
    }

    return shouldUpdate;
  }

  if (ctor.prototype && ctor.prototype.isPureReactComponent) {
    return (
      !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    );
  }

  return true;
}

function is(x, y) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}

const objectIs = (x, y) => (typeof Object.is === "function" ? Object.is : is);

function shallowEqual(objA, objB) {
  const hasOwnProperty = Object.prototype.hasOwnProperty;

  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}

function updateClassInstance(
  current,
  workInProgress,
  ctor,
  newProps,
  renderLanes
) {
  const instance = workInProgress.stateNode;

  cloneUpdateQueue(current, workInProgress);

  const unresolvedOldProps = workInProgress.memoizedProps;
  const oldProps =
    workInProgress.type === workInProgress.elementType
      ? unresolvedOldProps
      : resolveDefaultProps(workInProgress.type, unresolvedOldProps);
  instance.props = oldProps;
  const unresolvedNewProps = workInProgress.pendingProps;

  const oldContext = instance.context;
  const contextType = ctor.contextType;
  let nextContext = emptyContextObject;
  if (typeof contextType === "object" && contextType !== null) {
    nextContext = readContext(contextType);
  } else if (!disableLegacyContext) {
    const nextUnmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    nextContext = getMaskedContext(workInProgress, nextUnmaskedContext);
  }

  const getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  const hasNewLifecycles =
    typeof getDerivedStateFromProps === "function" ||
    typeof instance.getSnapshotBeforeUpdate === "function";

  // Note: During these life-cycles, instance.props/instance.state are what
  // ever the previously attempted to render - not the "current". However,
  // during componentDidUpdate we pass the "current" props.

  // In order to support react-lifecycles-compat polyfilled components,
  // Unsafe lifecycles should not be invoked for components using the new APIs.
  if (
    !hasNewLifecycles &&
    (typeof instance.UNSAFE_componentWillReceiveProps === "function" ||
      typeof instance.componentWillReceiveProps === "function")
  ) {
    if (
      unresolvedOldProps !== unresolvedNewProps ||
      oldContext !== nextContext
    ) {
      callComponentWillReceiveProps(
        workInProgress,
        instance,
        newProps,
        nextContext
      );
    }
  }

  resetHasForceUpdateBeforeProcessing();

  const oldState = workInProgress.memoizedState;
  let newState = (instance.state = oldState);
  processUpdateQueue(workInProgress, newProps, instance, renderLanes);
  newState = workInProgress.memoizedState;

  if (
    unresolvedOldProps === unresolvedNewProps &&
    oldState === newState &&
    !hasContextChanged() &&
    !checkHasForceUpdateAfterProcessing()
  ) {
    // If an update was already in progress, we should schedule an Update
    // effect even though we're bailing out, so that cWU/cDU are called.
    if (typeof instance.componentDidUpdate === "function") {
      if (
        unresolvedOldProps !== current.memoizedProps ||
        oldState !== current.memoizedState
      ) {
        workInProgress.effectTag |= Update;
      }
    }
    if (typeof instance.getSnapshotBeforeUpdate === "function") {
      if (
        unresolvedOldProps !== current.memoizedProps ||
        oldState !== current.memoizedState
      ) {
        workInProgress.effectTag |= Snapshot;
      }
    }
    return false;
  }

  if (typeof getDerivedStateFromProps === "function") {
    applyDerivedStateFromProps(
      workInProgress,
      ctor,
      getDerivedStateFromProps,
      newProps
    );
    newState = workInProgress.memoizedState;
  }

  const shouldUpdate =
    checkHasForceUpdateAfterProcessing() ||
    checkShouldComponentUpdate(
      workInProgress,
      ctor,
      oldProps,
      newProps,
      oldState,
      newState,
      nextContext
    );

  if (shouldUpdate) {
    // In order to support react-lifecycles-compat polyfilled components,
    // Unsafe lifecycles should not be invoked for components using the new APIs.
    if (
      !hasNewLifecycles &&
      (typeof instance.UNSAFE_componentWillUpdate === "function" ||
        typeof instance.componentWillUpdate === "function")
    ) {
      if (typeof instance.componentWillUpdate === "function") {
        instance.componentWillUpdate(newProps, newState, nextContext);
      }
      if (typeof instance.UNSAFE_componentWillUpdate === "function") {
        instance.UNSAFE_componentWillUpdate(newProps, newState, nextContext);
      }
    }
    if (typeof instance.componentDidUpdate === "function") {
      workInProgress.effectTag |= Update;
    }
    if (typeof instance.getSnapshotBeforeUpdate === "function") {
      workInProgress.effectTag |= Snapshot;
    }
  } else {
    // If an update was already in progress, we should schedule an Update
    // effect even though we're bailing out, so that cWU/cDU are called.
    if (typeof instance.componentDidUpdate === "function") {
      if (
        unresolvedOldProps !== current.memoizedProps ||
        oldState !== current.memoizedState
      ) {
        workInProgress.effectTag |= Update;
      }
    }
    if (typeof instance.getSnapshotBeforeUpdate === "function") {
      if (
        unresolvedOldProps !== current.memoizedProps ||
        oldState !== current.memoizedState
      ) {
        workInProgress.effectTag |= Snapshot;
      }
    }

    // If shouldComponentUpdate returned false, we should still update the
    // memoized props/state to indicate that this work can be reused.
    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  }

  // Update the existing instance's state, props, and context pointers even
  // if shouldComponentUpdate returns false.
  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;

  return shouldUpdate;
}

function updateClassComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  renderLanes
) {
  if (__DEV__) {
    if (workInProgress.type !== workInProgress.elementType) {
      // Lazy component props can't be validated in createElement
      // because they're only guaranteed to be resolved here.
      const innerPropTypes = Component.propTypes;
      if (innerPropTypes) {
        checkPropTypes(
          innerPropTypes,
          nextProps, // Resolved props
          "prop",
          getComponentName(Component)
        );
      }
    }
  }

  // Push context providers early to prevent context stack mismatches.
  // During mounting we don't know the child context yet as the instance doesn't exist.
  // We will invalidate the child context in finishClassComponent() right after rendering.
  let hasContext;
  if (isLegacyContextProvider(Component)) {
    hasContext = true;
    pushLegacyContextProvider(workInProgress);
  } else {
    hasContext = false;
  }
  prepareToReadContext(workInProgress, renderLanes);

  const instance = workInProgress.stateNode;
  let shouldUpdate;
  if (instance === null) {
    if (current !== null) {
      // A class component without an instance only mounts if it suspended
      // inside a non-concurrent tree, in an inconsistent state. We want to
      // treat it like a new mount, even though an empty version of it already
      // committed. Disconnect the alternate pointers.
      current.alternate = null;
      workInProgress.alternate = null;
      // Since this is conceptually a new fiber, schedule a Placement effect
      workInProgress.effectTag |= Placement;
    }
    // In the initial pass we might need to construct the instance.
    constructClassInstance(workInProgress, Component, nextProps);
    mountClassInstance(workInProgress, Component, nextProps, renderLanes);
    shouldUpdate = true;
  } else if (current === null) {
    // In a resume, we'll already have an instance we can reuse.
    shouldUpdate = resumeMountClassInstance(
      workInProgress,
      Component,
      nextProps,
      renderLanes
    );
  } else {
    shouldUpdate = updateClassInstance(
      current,
      workInProgress,
      Component,
      nextProps,
      renderLanes
    );
  }
  const nextUnitOfWork = finishClassComponent(
    current,
    workInProgress,
    Component,
    shouldUpdate,
    hasContext,
    renderLanes
  );
  if (__DEV__) {
    const inst = workInProgress.stateNode;
    if (shouldUpdate && inst.props !== nextProps) {
      if (!didWarnAboutReassigningProps) {
        console.error(
          "It looks like %s is reassigning its own `this.props` while rendering. " +
            "This is not supported and can lead to confusing bugs.",
          getComponentName(workInProgress.type) || "a component"
        );
      }
      didWarnAboutReassigningProps = true;
    }
  }
  return nextUnitOfWork;
}

function cloneChildFibers(current, workInProgress) {
  if (workInProgress.child === null) {
    return;
  }

  let currentChild = workInProgress.child;
  let newChild = createWorkInProgress(currentChild, currentChild.pendingProps);
  workInProgress.child = newChild;

  newChild.return = workInProgress;
  while (currentChild.sibling !== null) {
    currentChild = currentChild.sibling;
    newChild = newChild.sibling = createWorkInProgress(
      currentChild,
      currentChild.pendingProps
    );
    newChild.return = workInProgress;
  }
  newChild.sibling = null;
}

function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
  if (current !== null) {
    // Reuse previous dependencies
    workInProgress.dependencies_new = current.dependencies_new;
  }

  if (enableProfilerTimer) {
    // Don't update "base" render times for bailouts.
    stopProfilerTimerIfRunning(workInProgress);
  }

  markSkippedUpdateLanes(workInProgress.lanes);

  // Check if the children have any pending work.
  if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
    // The children don't have any work either. We can skip them.
    // TODO: Once we add back resuming, we should check if the children are
    // a work-in-progress set. If so, we need to transfer their effects.
    return null;
  } else {
    // This fiber doesn't have work, but its subtree does. Clone the child
    // fibers and continue.
    cloneChildFibers(current, workInProgress);
    return workInProgress.child;
  }
}

function finishClassComponent(
  current,
  workInProgress,
  Component,
  shouldUpdate,
  hasContext,
  renderLanes
) {
  // Refs should update even if shouldComponentUpdate returns false
  markRef(current, workInProgress);

  const didCaptureError = (workInProgress.effectTag & DidCapture) !== NoEffect;

  if (!shouldUpdate && !didCaptureError) {
    // Context providers should defer to sCU for rendering
    if (hasContext) {
      invalidateContextProvider(workInProgress, Component, false);
    }

    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  const instance = workInProgress.stateNode;

  // Rerender
  ReactCurrentOwner.current = workInProgress;
  let nextChildren;
  if (
    didCaptureError &&
    typeof Component.getDerivedStateFromError !== "function"
  ) {
    // If we captured an error, but getDerivedStateFromError is not defined,
    // unmount all the children. componentDidCatch will schedule an update to
    // re-render a fallback. This is temporary until we migrate everyone to
    // the new API.
    // TODO: Warn in a future release.
    nextChildren = null;

    if (enableProfilerTimer) {
      stopProfilerTimerIfRunning(workInProgress);
    }
  } else {
    if (__DEV__) {
      setIsRendering(true);
      nextChildren = instance.render();
      if (
        debugRenderPhaseSideEffectsForStrictMode &&
        workInProgress.mode & StrictMode
      ) {
        disableLogs();
        try {
          instance.render();
        } finally {
          reenableLogs();
        }
      }
      setIsRendering(false);
    } else {
      nextChildren = instance.render();
    }
  }

  // React DevTools reads this flag.
  workInProgress.effectTag |= PerformedWork;
  if (current !== null && didCaptureError) {
    // If we're recovering from an error, reconcile without reusing any of
    // the existing children. Conceptually, the normal children and the children
    // that are shown on error are two different sets, so we shouldn't reuse
    // normal children even if their identities match.
    forceUnmountCurrentAndReconcile(
      current,
      workInProgress,
      nextChildren,
      renderLanes
    );
  } else {
    reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  }

  // Memoize state using the values we just used to render.
  // TODO: Restructure so we never read values from the instance.
  workInProgress.memoizedState = instance.state;

  // The context might have changed so we need to recalculate it.
  if (hasContext) {
    invalidateContextProvider(workInProgress, Component, true);
  }

  return workInProgress.child;
}

function constructClassInstance(workInProgress, ctor, props) {
  let isLegacyContextConsumer = false;
  let unmaskedContext = emptyContextObject;
  let context = emptyContextObject;
  const contextType = ctor.contextType;

  if (__DEV__) {
    if ("contextType" in ctor) {
      const isValid =
        // Allow null for conditional declaration
        contextType === null ||
        (contextType !== undefined &&
          contextType.$$typeof === REACT_CONTEXT_TYPE &&
          contextType._context === undefined); // Not a <Context.Consumer>

      if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
        didWarnAboutInvalidateContextType.add(ctor);

        let addendum = "";
        if (contextType === undefined) {
          addendum =
            " However, it is set to undefined. " +
            "This can be caused by a typo or by mixing up named and default imports. " +
            "This can also happen due to a circular dependency, so " +
            "try moving the createContext() call to a separate file.";
        } else if (typeof contextType !== "object") {
          addendum = " However, it is set to a " + typeof contextType + ".";
        } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
          addendum = " Did you accidentally pass the Context.Provider instead?";
        } else if (contextType._context !== undefined) {
          // <Context.Consumer>
          addendum = " Did you accidentally pass the Context.Consumer instead?";
        } else {
          addendum =
            " However, it is set to an object with keys {" +
            Object.keys(contextType).join(", ") +
            "}.";
        }
        console.error(
          "%s defines an invalid contextType. " +
            "contextType should point to the Context object returned by React.createContext().%s",
          getComponentName(ctor) || "Component",
          addendum
        );
      }
    }
  }

  if (typeof contextType === "object" && contextType !== null) {
    context = readContext(contextType);
  } else if (!disableLegacyContext) {
    unmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    const contextTypes = ctor.contextTypes;
    isLegacyContextConsumer =
      contextTypes !== null && contextTypes !== undefined;
    context = isLegacyContextConsumer
      ? getMaskedContext(workInProgress, unmaskedContext)
      : emptyContextObject;
  }

  // Instantiate twice to help detect side-effects.
  if (__DEV__) {
    if (
      debugRenderPhaseSideEffectsForStrictMode &&
      workInProgress.mode & StrictMode
    ) {
      disableLogs();
      try {
        new ctor(props, context); // eslint-disable-line no-new
      } finally {
        reenableLogs();
      }
    }
  }

  const instance = new ctor(props, context);
  const state = (workInProgress.memoizedState =
    instance.state !== null && instance.state !== undefined
      ? instance.state
      : null);
  adoptClassInstance(workInProgress, instance);

  if (__DEV__) {
    if (typeof ctor.getDerivedStateFromProps === "function" && state === null) {
      const componentName = getComponentName(ctor) || "Component";
      if (!didWarnAboutUninitializedState.has(componentName)) {
        didWarnAboutUninitializedState.add(componentName);
        console.error(
          "`%s` uses `getDerivedStateFromProps` but its initial state is " +
            "%s. This is not recommended. Instead, define the initial state by " +
            "assigning an object to `this.state` in the constructor of `%s`. " +
            "This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
          componentName,
          instance.state === null ? "null" : "undefined",
          componentName
        );
      }
    }

    // If new component APIs are defined, "unsafe" lifecycles won't be called.
    // Warn about these lifecycles if they are present.
    // Don't warn about react-lifecycles-compat polyfilled methods though.
    if (
      typeof ctor.getDerivedStateFromProps === "function" ||
      typeof instance.getSnapshotBeforeUpdate === "function"
    ) {
      let foundWillMountName = null;
      let foundWillReceivePropsName = null;
      let foundWillUpdateName = null;
      if (
        typeof instance.componentWillMount === "function" &&
        instance.componentWillMount.__suppressDeprecationWarning !== true
      ) {
        foundWillMountName = "componentWillMount";
      } else if (typeof instance.UNSAFE_componentWillMount === "function") {
        foundWillMountName = "UNSAFE_componentWillMount";
      }
      if (
        typeof instance.componentWillReceiveProps === "function" &&
        instance.componentWillReceiveProps.__suppressDeprecationWarning !== true
      ) {
        foundWillReceivePropsName = "componentWillReceiveProps";
      } else if (
        typeof instance.UNSAFE_componentWillReceiveProps === "function"
      ) {
        foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
      }
      if (
        typeof instance.componentWillUpdate === "function" &&
        instance.componentWillUpdate.__suppressDeprecationWarning !== true
      ) {
        foundWillUpdateName = "componentWillUpdate";
      } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
        foundWillUpdateName = "UNSAFE_componentWillUpdate";
      }
      if (
        foundWillMountName !== null ||
        foundWillReceivePropsName !== null ||
        foundWillUpdateName !== null
      ) {
        const componentName = getComponentName(ctor) || "Component";
        const newApiName =
          typeof ctor.getDerivedStateFromProps === "function"
            ? "getDerivedStateFromProps()"
            : "getSnapshotBeforeUpdate()";
        if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(componentName)) {
          didWarnAboutLegacyLifecyclesAndDerivedState.add(componentName);
          console.error(
            "Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" +
              "%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\n" +
              "The above lifecycles should be removed. Learn more about this warning here:\n" +
              "https://fb.me/react-unsafe-component-lifecycles",
            componentName,
            newApiName,
            foundWillMountName !== null ? `\n  ${foundWillMountName}` : "",
            foundWillReceivePropsName !== null
              ? `\n  ${foundWillReceivePropsName}`
              : "",
            foundWillUpdateName !== null ? `\n  ${foundWillUpdateName}` : ""
          );
        }
      }
    }
  }

  // Cache unmasked context so we can avoid recreating masked context unless necessary.
  // ReactFiberContext usually updates this cache but can't for newly-created instances.
  if (isLegacyContextConsumer) {
    cacheContext(workInProgress, unmaskedContext, context);
  }

  return instance;
}

function adoptClassInstance(workInProgress, instance) {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  // The instance needs access to the fiber so that it can schedule updates
  setInstance(instance, workInProgress);
  if (__DEV__) {
    instance._reactInternalInstance = fakeInternalInstance;
  }
}

function getMaskedContext(workInProgress, unmaskedContext) {
  if (disableLegacyContext) {
    return emptyContextObject;
  } else {
    const type = workInProgress.type;
    const contextTypes = type.contextTypes;
    if (!contextTypes) {
      return emptyContextObject;
    }

    // Avoid recreating masked context unless unmasked context has changed.
    // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
    // This may trigger infinite loops if componentWillReceiveProps calls setState.
    const instance = workInProgress.stateNode;
    if (
      instance &&
      instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext
    ) {
      return instance.__reactInternalMemoizedMaskedChildContext;
    }

    const context = {};
    for (const key in contextTypes) {
      context[key] = unmaskedContext[key];
    }

    if (__DEV__) {
      const name = getComponentName(type) || "Unknown";
      checkPropTypes(contextTypes, context, "context", name);
    }

    // Cache unmasked context so we can avoid recreating masked context unless necessary.
    // Context is created before the class component is instantiated so check for instance.
    if (instance) {
      cacheContext(workInProgress, unmaskedContext, context);
    }

    return context;
  }
}

function getUnmaskedContext(
  workInProgress,
  Component,
  didPushOwnContextIfProvider
) {
  if (disableLegacyContext) {
    return emptyContextObject;
  } else {
    if (didPushOwnContextIfProvider && isContextProvider(Component)) {
      // If the fiber is a context provider itself, when we read its context
      // we may have already pushed its own child context on the stack. A context
      // provider should not "see" its own child context. Therefore we read the
      // previous (parent) context instead for a context provider.
      return previousContext;
    }
    return contextStackCursor.current;
  }
}

function cacheContext(workInProgress, unmaskedContext, maskedContext) {
  if (disableLegacyContext) {
    return;
  } else {
    const instance = workInProgress.stateNode;
    instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
    instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
  }
}

function applyDerivedStateFromProps(
  workInProgress,
  ctor,
  getDerivedStateFromProps,
  nextProps
) {
  const prevState = workInProgress.memoizedState;

  if (__DEV__) {
    if (
      debugRenderPhaseSideEffectsForStrictMode &&
      workInProgress.mode & StrictMode
    ) {
      disableLogs();
      try {
        // Invoke the function an extra time to help detect side-effects.
        getDerivedStateFromProps(nextProps, prevState);
      } finally {
        reenableLogs();
      }
    }
  }

  const partialState = getDerivedStateFromProps(nextProps, prevState);

  if (__DEV__) {
    warnOnUndefinedDerivedState(ctor, partialState);
  }
  // Merge the partial state and the previous state.
  const memoizedState =
    partialState === null || partialState === undefined
      ? prevState
      : Object.assign({}, prevState, partialState);
  workInProgress.memoizedState = memoizedState;

  // Once the update queue is empty, persist the derived state onto the
  // base state.
  if (workInProgress.lanes === NoLanes) {
    // Queue is always non-null for classes
    const updateQueue = workInProgress.updateQueue;
    updateQueue.baseState = memoizedState;
  }
}

function mountClassInstance(workInProgress, ctor, newProps, renderLanes) {
  const instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState; // { text: "Hello World" }
  instance.refs = emptyRefsObject; // {}

  initializeUpdateQueue(workInProgress);

  const contextType = ctor.contextType;
  if (typeof contextType === "object" && contextType !== null) {
    instance.context = readContext(contextType);
  } else if (disableLegacyContext) {
    // true
    instance.context = emptyContextObject;
  } else {
    const unmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    instance.context = getMaskedContext(workInProgress, unmaskedContext);
  }

  processUpdateQueue(workInProgress, newProps, instance, renderLanes);

  instance.state = workInProgress.memoizedState;

  // 调用getDerivedStateFromProps生命周期 注意是获取构造方式的属性所以定义时必须是static
  const getDerivedStateFromProps = ctor.getDerivedStateFromProps;

  if (typeof getDerivedStateFromProps === "function") {
    applyDerivedStateFromProps(
      workInProgress,
      ctor,
      getDerivedStateFromProps,
      newProps
    );
    instance.state = workInProgress.memoizedState;
  }

  // react生命周期polyfilled
  // 不安全的生命周期不应该被调用，要在组建中使用新的API
  //
  if (
    typeof ctor.getDerivedStateFromProps !== "function" &&
    typeof instance.getSnapshotBeforeUpdate !== "function" &&
    (typeof instance.UNSAFE_componentWillMount === "function" ||
      typeof instance.componentWillMount === "function")
  ) {
    callComponentWillMount(workInProgress, instance);
    // If we had additional state updates during this life-cycle, let's
    // process them now.
    processUpdateQueue(workInProgress, newProps, instance, renderLanes);
    instance.state = workInProgress.memoizedState;
  }

  if (typeof instance.componentDidMount === "function") {
    workInProgress.effectTag |= Update;
  }
}

function updateHostRoot(current, workInProgress, renderLanes) {
  pushHostRootContext(workInProgress);
  const updateQueue = workInProgress.updateQueue;
  const nextProps = workInProgress.pendingProps;
  const prevState = workInProgress.memoizedState;
  const prevChildren = prevState !== null ? prevState.element : null;
  cloneUpdateQueue(current, workInProgress);
  processUpdateQueue(workInProgress, nextProps, null, renderLanes);
  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;

  if (nextChildren === prevChildren) {
    // fasle
    resetHydrationState();
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }
  const root = workInProgress.stateNode;
  if (root.hydrate && enterHydrationState(workInProgress)) {
    // 不需要了解
  } else {
    // 否则重置hydrate 状态，以防我们中止并恢复另一个根。
    reconcileChildren(current, workInProgress, nextChildren, renderLanes);
    resetHydrationState();
  }

  return workInProgress.child;
}

function pushHostRootContext(workInProgress) {
  const root = workInProgress.stateNode;
  if (root.pendingContext) {
    pushTopLevelContextObject(
      workInProgress,
      root.pendingContext,
      root.pendingContext !== root.context
    );
  } else if (root.context) {
    // Should always be set
    pushTopLevelContextObject(workInProgress, root.context, false);
  }
  pushHostContainer(workInProgress, root.containerInfo);
}

function pushTopLevelContextObject(fiber, context, didChange) {
  if (disableLegacyContext) {
    return;
  } else {
    push(contextStackCursor, context, fiber);
    push(didPerformWorkStackCursor, didChange, fiber);
  }
}

function pushHostContainer(fiber, nextRootInstance) {
  // Push current root instance onto the stack;
  // This allows us to reset root when portals are popped.
  push(rootInstanceStackCursor, nextRootInstance, fiber);
  // Track the context and the Fiber that provided it.
  // This enables us to pop only Fibers that provide unique contexts.
  push(contextFiberStackCursor, fiber, fiber);

  // Finally, we need to push the host context to the stack.
  // However, we can't just call getRootHostContext() and push it because
  // we'd have a different number of entries on the stack depending on
  // whether getRootHostContext() throws somewhere in renderer code or not.
  // So we push an empty value first. This lets us safely unwind on errors.
  push(contextStackCursor, NO_CONTEXT, fiber);
  const nextRootContext = getRootHostContext(nextRootInstance);
  // Now that we know this function doesn't throw, replace it.
  pop(contextStackCursor, fiber);
  push(contextStackCursor, nextRootContext, fiber);
}

function getRootHostContext(rootContainerInstance) {
  let type;
  let namespace;
  const nodeType = rootContainerInstance.nodeType;
  switch (nodeType) {
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE: {
      type = nodeType === DOCUMENT_NODE ? "#document" : "#fragment";
      const root = rootContainerInstance.documentElement;
      namespace = root ? root.namespaceURI : getChildNamespace(null, "");
      break;
    }
    default: {
      const container =
        nodeType === COMMENT_NODE
          ? rootContainerInstance.parentNode
          : rootContainerInstance;
      const ownNamespace = container.namespaceURI || null;
      type = container.tagName;
      namespace = getChildNamespace(ownNamespace, type);
      break;
    }
  }
  return namespace;
}

function getChildNamespace(parentNamespace, type) {
  if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
    // No (or default) parent namespace: potential entry point.
    return getIntrinsicNamespace(type);
  }
  if (parentNamespace === SVG_NAMESPACE && type === "foreignObject") {
    // We're leaving SVG.
    return HTML_NAMESPACE;
  }
  // By default, pass namespace below.
  return parentNamespace;
}

function getIntrinsicNamespace(type) {
  switch (type) {
    case "svg":
      return SVG_NAMESPACE;
    case "math":
      return MATH_NAMESPACE;
    default:
      return HTML_NAMESPACE;
  }
}

function cloneUpdateQueue(current, workInProgress) {
  // Clone the update queue from current. Unless it's already a clone.
  const queue = workInProgress.updateQueue;
  const currentQueue = current.updateQueue;
  if (queue === currentQueue) {
    const clone = {
      baseState: currentQueue.baseState,
      firstBaseUpdate: currentQueue.firstBaseUpdate,
      lastBaseUpdate: currentQueue.lastBaseUpdate,
      shared: currentQueue.shared,
      effects: currentQueue.effects,
    };
    workInProgress.updateQueue = clone;
  }
}

function processUpdateQueue(workInProgress, props, instance, renderLanes) {
  // 这在ClassComponent或HostRoot上总是非空的。
  const queue = workInProgress.updateQueue;

  hasForceUpdate = false;

  let firstBaseUpdate = queue.firstBaseUpdate;
  let lastBaseUpdate = queue.lastBaseUpdate;

  // 检查是否有等待更新。如果有，请将其转移到基础队列中。
  let pendingQueue = queue.shared.pending;

  if (pendingQueue !== null) {
    queue.shared.pending = null;

    // The pending queue is circular. Disconnect the pointer between first
    // and last so that it's non-circular.
    const lastPendingUpdate = pendingQueue;

    const firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;
    // Append pending updates to base queue

    if (lastBaseUpdate === null) {
      firstBaseUpdate = firstPendingUpdate;
    } else {
      lastBaseUpdate.next = firstPendingUpdate;
    }
    lastBaseUpdate = lastPendingUpdate;

    // If there's a current queue, and it's different from the base queue, then
    // we need to transfer the updates to that queue, too. Because the base
    // queue is a singly-linked list with no cycles, we can append to both
    // lists and take advantage of structural sharing.
    // TODO: Pass `current` as argument
    const current = workInProgress.alternate;
    if (current !== null) {
      // This is always non-null on a ClassComponent or HostRoot
      const currentQueue = current.updateQueue;

      const currentLastBaseUpdate = currentQueue.lastBaseUpdate;
      if (currentLastBaseUpdate !== lastBaseUpdate) {
        if (currentLastBaseUpdate === null) {
          currentQueue.firstBaseUpdate = firstPendingUpdate;
        } else {
          currentLastBaseUpdate.next = firstPendingUpdate;
        }
        currentQueue.lastBaseUpdate = lastPendingUpdate;
      }
    }
  }

  // These values may change as we process the queue.
  if (firstBaseUpdate !== null) {
    // Iterate through the list of updates to compute the result.
    let newState = queue.baseState;
    // TODO: Don't need to accumulate this. Instead, we can remove renderLanes
    // from the original lanes.
    let newLanes = NoLanes;

    let newBaseState = null;
    let newFirstBaseUpdate = null;
    let newLastBaseUpdate = null;

    let update = firstBaseUpdate;
    do {
      const updateLane = update.lane;
      const updateEventTime = update.eventTime;
      if (!isSubsetOfLanes(renderLanes, updateLane)) {
        // Priority is insufficient. Skip this update. If this is the first
        // skipped update, the previous update/state is the new base
        // update/state.
        const clone = {
          eventTime: updateEventTime,
          lane: updateLane,
          suspenseConfig: update.suspenseConfig,

          tag: update.tag,
          payload: update.payload,
          callback: update.callback,

          next: null,
        };
        if (newLastBaseUpdate === null) {
          newFirstBaseUpdate = newLastBaseUpdate = clone;
          newBaseState = newState;
        } else {
          newLastBaseUpdate = newLastBaseUpdate.next = clone;
        }
        // Update the remaining priority in the queue.
        newLanes = mergeLanes(newLanes, updateLane);
      } else {
        // This update does have sufficient priority.

        if (newLastBaseUpdate !== null) {
          const clone = {
            eventTime: updateEventTime,
            // This update is going to be committed so we never want uncommit
            // it. Using NoLane works because 0 is a subset of all bitmasks, so
            // this will never be skipped by the check above.
            lane: NoLane,
            suspenseConfig: update.suspenseConfig,

            tag: update.tag,
            payload: update.payload,
            callback: update.callback,

            next: null,
          };
          newLastBaseUpdate = newLastBaseUpdate.next = clone;
        }
        // Mark the event time of this update as relevant to this render pass.
        // TODO: This should ideally use the true event time of this update rather than
        // its priority which is a derived and not reverseable value.
        // TODO: We should skip this update if it was already committed but currently
        // we have no way of detecting the difference between a committed and suspended
        // update here.
        // Process this update.
        newState = getStateFromUpdate(
          workInProgress,
          queue,
          update,
          newState,
          props,
          instance
        );
        const callback = update.callback;
        if (callback !== null) {
          workInProgress.effectTag |= Callback;
          const effects = queue.effects;
          if (effects === null) {
            queue.effects = [update];
          } else {
            effects.push(update);
          }
        }
      }
      update = update.next;
      if (update === null) {
        pendingQueue = queue.shared.pending;
        if (pendingQueue === null) {
          break;
        } else {
          // An update was scheduled from inside a reducer. Add the new
          // pending updates to the end of the list and keep processing.
          const lastPendingUpdate = pendingQueue;
          // Intentionally unsound. Pending updates form a circular list, but we
          // unravel them when transferring them to the base queue.
          const firstPendingUpdate = lastPendingUpdate.next;
          lastPendingUpdate.next = null;
          update = firstPendingUpdate;
          queue.lastBaseUpdate = lastPendingUpdate;
          queue.shared.pending = null;
        }
      }
    } while (true);

    if (newLastBaseUpdate === null) {
      newBaseState = newState;
    }
    queue.baseState = newBaseState;
    queue.firstBaseUpdate = newFirstBaseUpdate;
    queue.lastBaseUpdate = newLastBaseUpdate;

    // Set the remaining expiration time to be whatever is remaining in the queue.
    // This should be fine because the only two other things that contribute to
    // expiration time are props and context. We're already in the middle of the
    // begin phase by the time we start processing the queue, so we've already
    // dealt with the props. Context in components that specify
    // shouldComponentUpdate is tricky; but we'll have to account for
    // that regardless.
    markSkippedUpdateLanes(newLanes);
    workInProgress.lanes = newLanes;
    workInProgress.memoizedState = newState;
  }
}

function isSubsetOfLanes(set, subset) {
  return (set & subset) === subset;
}

function getStateFromUpdate(
  workInProgress,
  queue,
  update,
  prevState,
  nextProps,
  instance
) {
  switch (update.tag) {
    case ReplaceState: {
      const payload = update.payload;
      if (typeof payload === "function") {
        // Updater function
        if (__DEV__) {
          enterDisallowedContextReadInDEV();
        }
        const nextState = payload.call(instance, prevState, nextProps);
        if (__DEV__) {
          if (
            debugRenderPhaseSideEffectsForStrictMode &&
            workInProgress.mode & StrictMode
          ) {
            disableLogs();
            try {
              payload.call(instance, prevState, nextProps);
            } finally {
              reenableLogs();
            }
          }
          exitDisallowedContextReadInDEV();
        }
        return nextState;
      }
      // State object
      return payload;
    }
    case CaptureUpdate: {
      workInProgress.effectTag =
        (workInProgress.effectTag & ~ShouldCapture) | DidCapture;
    }
    // Intentional fallthrough
    case UpdateState: {
      const payload = update.payload;
      let partialState;
      if (typeof payload === "function") {
        partialState = payload.call(instance, prevState, nextProps);
      } else {
        // Partial state object
        partialState = payload;
      }
      if (partialState === null || partialState === undefined) {
        // Null and undefined are treated as no-ops.
        return prevState;
      }
      // Merge the partial state and the previous state.
      return Object.assign({}, prevState, partialState);
    }
    case ForceUpdate: {
      hasForceUpdate = true;
      return prevState;
    }
  }
  return prevState;
}

function markSkippedUpdateLanes(lane) {
  workInProgressRootSkippedLanes = mergeLanes(
    lane,
    workInProgressRootSkippedLanes
  );
}

function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return;
    }
    // Deletions are added in reversed order so we add it to the front.
    // At this point, the return fiber's effect list is empty except for
    // deletions, so we can just append the deletion to the list. The remaining
    // effects aren't added until the complete phase. Once we implement
    // resuming, this may not be true.
    const last = returnFiber.lastEffect;
    if (last !== null) {
      last.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
    childToDelete.nextEffect = null;
    childToDelete.effectTag = Deletion;
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return null;
    }

    // TODO: For the shouldClone case, this could be micro-optimized a bit by
    // assuming that after the first child we've already added everything.
    let childToDelete = currentFirstChild;
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
    return null;
  }

  function mapRemainingChildren(returnFiber, currentFirstChild) {
    // Add the remaining children to a temporary map so that we can find them by
    // keys quickly. Implicit (null) keys get added to this set with their index
    // instead.
    const existingChildren = new Map();

    let existingChild = currentFirstChild;
    while (existingChild !== null) {
      if (existingChild.key !== null) {
        existingChildren.set(existingChild.key, existingChild);
      } else {
        existingChildren.set(existingChild.index, existingChild);
      }
      existingChild = existingChild.sibling;
    }
    return existingChildren;
  }

  function useFiber(fiber, pendingProps) {
    // We currently set sibling to null and index to 0 here because it is easy
    // to forget to do before returning it. E.g. for the single child case.
    const clone = createWorkInProgress(fiber, pendingProps);
    clone.index = 0;
    clone.sibling = null;
    return clone;
  }

  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) {
      // Noop.
      return lastPlacedIndex;
    }
    const current = newFiber.alternate;
    if (current !== null) {
      const oldIndex = current.index;
      if (oldIndex < lastPlacedIndex) {
        // This is a move.
        newFiber.effectTag = Placement;
        return lastPlacedIndex;
      } else {
        // This item can stay in place.
        return oldIndex;
      }
    } else {
      // This is an insertion.
      newFiber.effectTag = Placement;
      return lastPlacedIndex;
    }
  }

  function placeSingleChild(newFiber) {
    // This is simpler for the single child case. We only need to do a
    // placement for inserting new children.
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.effectTag = Placement;
    }
    return newFiber;
  }

  function updateTextNode(returnFiber, current, textContent, lanes) {
    if (current === null || current.tag !== HostText) {
      // Insert
      const created = createFiberFromText(textContent, returnFiber.mode, lanes);
      created.return = returnFiber;
      return created;
    } else {
      // Update
      const existing = useFiber(current, textContent);
      existing.return = returnFiber;
      return existing;
    }
  }

  function updateElement(returnFiber, current, element, lanes) {
    if (current !== null) {
      if (
        current.elementType === element.type ||
        // Keep this check inline so it only runs on the false path:
        (__DEV__ ? isCompatibleFamilyForHotReloading(current, element) : false)
      ) {
        // Move based on index
        const existing = useFiber(current, element.props);
        existing.ref = coerceRef(returnFiber, current, element);
        existing.return = returnFiber;
        if (__DEV__) {
          existing._debugSource = element._source;
          existing._debugOwner = element._owner;
        }
        return existing;
      } else if (enableBlocksAPI && current.tag === Block) {
        // The new Block might not be initialized yet. We need to initialize
        // it in case initializing it turns out it would match.
        let type = element.type;
        if (type.$$typeof === REACT_LAZY_TYPE) {
          type = resolveLazyType(type);
        }
        if (
          type.$$typeof === REACT_BLOCK_TYPE &&
          type === current.type._render
        ) {
          // Same as above but also update the .type field.
          const existing = useFiber(current, element.props);
          existing.return = returnFiber;
          existing.type = type;
          if (__DEV__) {
            existing._debugSource = element._source;
            existing._debugOwner = element._owner;
          }
          return existing;
        }
      }
    }
    // Insert
    const created = createFiberFromElement(element, returnFiber.mode, lanes);
    created.ref = coerceRef(returnFiber, current, element);
    created.return = returnFiber;
    return created;
  }

  function updatePortal(returnFiber, current, portal, lanes) {
    if (
      current === null ||
      current.tag !== HostPortal ||
      current.stateNode.containerInfo !== portal.containerInfo ||
      current.stateNode.implementation !== portal.implementation
    ) {
      // Insert
      const created = createFiberFromPortal(portal, returnFiber.mode, lanes);
      created.return = returnFiber;
      return created;
    } else {
      // Update
      const existing = useFiber(current, portal.children || []);
      existing.return = returnFiber;
      return existing;
    }
  }

  function updateFragment(returnFiber, current, fragment, lanes, key) {
    if (current === null || current.tag !== Fragment) {
      // Insert
      const created = createFiberFromFragment(
        fragment,
        returnFiber.mode,
        lanes,
        key
      );
      created.return = returnFiber;
      return created;
    } else {
      // Update
      const existing = useFiber(current, fragment);
      existing.return = returnFiber;
      return existing;
    }
  }

  function createChild(returnFiber, newChild, lanes) {
    if (typeof newChild === "string" || typeof newChild === "number") {
      // Text nodes don't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      const created = createFiberFromText(
        "" + newChild,
        returnFiber.mode,
        lanes
      );
      created.return = returnFiber;
      return created;
    }

    if (typeof newChild === "object" && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          const created = createFiberFromElement(
            newChild,
            returnFiber.mode,
            lanes
          );
          created.ref = coerceRef(returnFiber, null, newChild);
          created.return = returnFiber;
          return created;
        }
        case REACT_PORTAL_TYPE: {
          const created = createFiberFromPortal(
            newChild,
            returnFiber.mode,
            lanes
          );
          created.return = returnFiber;
          return created;
        }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        const created = createFiberFromFragment(
          newChild,
          returnFiber.mode,
          lanes,
          null
        );
        created.return = returnFiber;
        return created;
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    if (__DEV__) {
      if (typeof newChild === "function") {
        warnOnFunctionType(returnFiber);
      }
    }

    return null;
  }

  function updateSlot(returnFiber, oldFiber, newChild, lanes) {
    // Update the fiber if the keys match, otherwise return null.

    const key = oldFiber !== null ? oldFiber.key : null;

    if (typeof newChild === "string" || typeof newChild === "number") {
      // Text nodes don't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      if (key !== null) {
        return null;
      }
      return updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
    }

    if (typeof newChild === "object" && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          if (newChild.key === key) {
            if (newChild.type === REACT_FRAGMENT_TYPE) {
              return updateFragment(
                returnFiber,
                oldFiber,
                newChild.props.children,
                lanes,
                key
              );
            }
            return updateElement(returnFiber, oldFiber, newChild, lanes);
          } else {
            return null;
          }
        }
        case REACT_PORTAL_TYPE: {
          if (newChild.key === key) {
            return updatePortal(returnFiber, oldFiber, newChild, lanes);
          } else {
            return null;
          }
        }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        if (key !== null) {
          return null;
        }

        return updateFragment(returnFiber, oldFiber, newChild, lanes, null);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    if (__DEV__) {
      if (typeof newChild === "function") {
        warnOnFunctionType(returnFiber);
      }
    }

    return null;
  }

  function updateFromMap(
    existingChildren,
    returnFiber,
    newIdx,
    newChild,
    lanes
  ) {
    if (typeof newChild === "string" || typeof newChild === "number") {
      // Text nodes don't have keys, so we neither have to check the old nor
      // new node for the key. If both are text nodes, they match.
      const matchedFiber = existingChildren.get(newIdx) || null;
      return updateTextNode(returnFiber, matchedFiber, "" + newChild, lanes);
    }

    if (typeof newChild === "object" && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          const matchedFiber =
            existingChildren.get(
              newChild.key === null ? newIdx : newChild.key
            ) || null;
          if (newChild.type === REACT_FRAGMENT_TYPE) {
            return updateFragment(
              returnFiber,
              matchedFiber,
              newChild.props.children,
              lanes,
              newChild.key
            );
          }
          return updateElement(returnFiber, matchedFiber, newChild, lanes);
        }
        case REACT_PORTAL_TYPE: {
          const matchedFiber =
            existingChildren.get(
              newChild.key === null ? newIdx : newChild.key
            ) || null;
          return updatePortal(returnFiber, matchedFiber, newChild, lanes);
        }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        const matchedFiber = existingChildren.get(newIdx) || null;
        return updateFragment(returnFiber, matchedFiber, newChild, lanes, null);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    if (__DEV__) {
      if (typeof newChild === "function") {
        warnOnFunctionType(returnFiber);
      }
    }

    return null;
  }

  /**
   * Warns if there is a duplicate or missing key
   */
  function warnOnInvalidKey(child, knownKeys, returnFiber) {
    if (__DEV__) {
      if (typeof child !== "object" || child === null) {
        return knownKeys;
      }
      switch (child.$$typeof) {
        case REACT_ELEMENT_TYPE:
        case REACT_PORTAL_TYPE:
          warnForMissingKey(child, returnFiber);
          const key = child.key;
          if (typeof key !== "string") {
            break;
          }
          if (knownKeys === null) {
            knownKeys = new Set();
            knownKeys.add(key);
            break;
          }
          if (!knownKeys.has(key)) {
            knownKeys.add(key);
            break;
          }
          console.error(
            "Encountered two children with the same key, `%s`. " +
              "Keys should be unique so that components maintain their identity " +
              "across updates. Non-unique keys may cause children to be " +
              "duplicated and/or omitted — the behavior is unsupported and " +
              "could change in a future version.",
            key
          );
          break;
        default:
          break;
      }
    }
    return knownKeys;
  }

  function reconcileChildrenArray(
    returnFiber,
    currentFirstChild,
    newChildren,
    lanes
  ) {
    // This algorithm can't optimize by searching from both ends since we
    // don't have backpointers on fibers. I'm trying to see how far we can get
    // with that model. If it ends up not being worth the tradeoffs, we can
    // add it later.

    // Even with a two ended optimization, we'd want to optimize for the case
    // where there are few changes and brute force the comparison instead of
    // going for the Map. It'd like to explore hitting that path first in
    // forward-only mode and only go for the Map once we notice that we need
    // lots of look ahead. This doesn't handle reversal as well as two ended
    // search but that's unusual. Besides, for the two ended optimization to
    // work on Iterables, we'd need to copy the whole set.

    // In this first iteration, we'll just live with hitting the bad case
    // (adding everything to a Map) in for every insert/move.

    // If you change this code, also update reconcileChildrenIterator() which
    // uses the same algorithm.

    if (__DEV__) {
      // First, validate keys.
      let knownKeys = null;
      for (let i = 0; i < newChildren.length; i++) {
        const child = newChildren[i];
        knownKeys = warnOnInvalidKey(child, knownKeys, returnFiber);
      }
    }

    let resultingFirstChild = null;
    let previousNewFiber = null;

    let oldFiber = currentFirstChild;
    let lastPlacedIndex = 0;
    let newIdx = 0;
    let nextOldFiber = null;
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      const newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        lanes
      );
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (newIdx === newChildren.length) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; newIdx < newChildren.length; newIdx++) {
        const newFiber = createChild(returnFiber, newChildren[newIdx], lanes);
        consoleDeep("newFiber->", newFiber);
        if (newFiber === null) {
          continue;
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; newIdx < newChildren.length; newIdx++) {
      const newFiber = updateFromMap(
        existingChildren,
        returnFiber,
        newIdx,
        newChildren[newIdx],
        lanes
      );
      if (newFiber !== null) {
        if (shouldTrackSideEffects) {
          if (newFiber.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren.delete(
              newFiber.key === null ? newIdx : newFiber.key
            );
          }
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach((child) => deleteChild(returnFiber, child));
    }

    return resultingFirstChild;
  }

  function reconcileChildrenIterator(
    returnFiber,
    currentFirstChild,
    newChildrenIterable,
    lanes
  ) {
    // This is the same implementation as reconcileChildrenArray(),
    // but using the iterator instead.

    const iteratorFn = getIteratorFn(newChildrenIterable);
    invariant(
      typeof iteratorFn === "function",
      "An object is not an iterable. This error is likely caused by a bug in " +
        "React. Please file an issue."
    );

    if (__DEV__) {
      // We don't support rendering Generators because it's a mutation.
      // See https://github.com/facebook/react/issues/12995
      if (
        typeof Symbol === "function" &&
        // $FlowFixMe Flow doesn't know about toStringTag
        newChildrenIterable[Symbol.toStringTag] === "Generator"
      ) {
        if (!didWarnAboutGenerators) {
          console.error(
            "Using Generators as children is unsupported and will likely yield " +
              "unexpected results because enumerating a generator mutates it. " +
              "You may convert it to an array with `Array.from()` or the " +
              "`[...spread]` operator before rendering. Keep in mind " +
              "you might need to polyfill these features for older browsers."
          );
        }
        didWarnAboutGenerators = true;
      }

      // Warn about using Maps as children
      if (newChildrenIterable.entries === iteratorFn) {
        if (!didWarnAboutMaps) {
          console.error(
            "Using Maps as children is not supported. " +
              "Use an array of keyed ReactElements instead."
          );
        }
        didWarnAboutMaps = true;
      }

      // First, validate keys.
      // We'll get a different iterator later for the main pass.
      const newChildren = iteratorFn.call(newChildrenIterable);
      if (newChildren) {
        let knownKeys = null;
        let step = newChildren.next();
        for (; !step.done; step = newChildren.next()) {
          const child = step.value;
          knownKeys = warnOnInvalidKey(child, knownKeys, returnFiber);
        }
      }
    }

    const newChildren = iteratorFn.call(newChildrenIterable);
    invariant(newChildren != null, "An iterable object provided no iterator.");

    let resultingFirstChild = null;
    let previousNewFiber = null;

    let oldFiber = currentFirstChild;
    let lastPlacedIndex = 0;
    let newIdx = 0;
    let nextOldFiber = null;

    let step = newChildren.next();
    for (
      ;
      oldFiber !== null && !step.done;
      newIdx++, step = newChildren.next()
    ) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      const newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (step.done) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; !step.done; newIdx++, step = newChildren.next()) {
        const newFiber = createChild(returnFiber, step.value, lanes);
        if (newFiber === null) {
          continue;
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; !step.done; newIdx++, step = newChildren.next()) {
      const newFiber = updateFromMap(
        existingChildren,
        returnFiber,
        newIdx,
        step.value,
        lanes
      );
      if (newFiber !== null) {
        if (shouldTrackSideEffects) {
          if (newFiber.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren.delete(
              newFiber.key === null ? newIdx : newFiber.key
            );
          }
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach((child) => deleteChild(returnFiber, child));
    }

    return resultingFirstChild;
  }

  function reconcileSingleTextNode(
    returnFiber,
    currentFirstChild,
    textContent,
    lanes
  ) {
    // There's no need to check for keys on text nodes since we don't have a
    // way to define them.
    if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
      // We already have an existing node so let's just update it and delete
      // the rest.
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      const existing = useFiber(currentFirstChild, textContent);
      existing.return = returnFiber;
      return existing;
    }
    // The existing first child is not a text node so we need to create one
    // and delete the existing ones.
    deleteRemainingChildren(returnFiber, currentFirstChild);
    const created = createFiberFromText(textContent, returnFiber.mode, lanes);
    created.return = returnFiber;
    return created;
  }

  function reconcileSingleElement(
    returnFiber,
    currentFirstChild,
    element,
    lanes
  ) {
    const key = element.key;
    let child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        switch (child.tag) {
          case Fragment: {
            if (element.type === REACT_FRAGMENT_TYPE) {
              deleteRemainingChildren(returnFiber, child.sibling);
              const existing = useFiber(child, element.props.children);
              existing.return = returnFiber;
              if (__DEV__) {
                existing._debugSource = element._source;
                existing._debugOwner = element._owner;
              }
              return existing;
            }
            break;
          }
          case Block:
            if (enableBlocksAPI) {
              let type = element.type;
              if (type.$$typeof === REACT_LAZY_TYPE) {
                type = resolveLazyType(type);
              }
              if (type.$$typeof === REACT_BLOCK_TYPE) {
                // The new Block might not be initialized yet. We need to initialize
                // it in case initializing it turns out it would match.
                if (type._render === child.type._render) {
                  deleteRemainingChildren(returnFiber, child.sibling);
                  const existing = useFiber(child, element.props);
                  existing.type = type;
                  existing.return = returnFiber;
                  if (__DEV__) {
                    existing._debugSource = element._source;
                    existing._debugOwner = element._owner;
                  }
                  return existing;
                }
              }
            }
          // We intentionally fallthrough here if enableBlocksAPI is not on.
          // eslint-disable-next-lined no-fallthrough
          default: {
            if (
              child.elementType === element.type ||
              // Keep this check inline so it only runs on the false path:
              (__DEV__
                ? isCompatibleFamilyForHotReloading(child, element)
                : false)
            ) {
              deleteRemainingChildren(returnFiber, child.sibling);
              const existing = useFiber(child, element.props);
              existing.ref = coerceRef(returnFiber, child, element);
              existing.return = returnFiber;
              if (__DEV__) {
                existing._debugSource = element._source;
                existing._debugOwner = element._owner;
              }
              return existing;
            }
            break;
          }
        }
        // Didn't match.
        deleteRemainingChildren(returnFiber, child);
        break;
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    if (element.type === REACT_FRAGMENT_TYPE) {
      const created = createFiberFromFragment(
        element.props.children,
        returnFiber.mode,
        lanes,
        element.key
      );
      created.return = returnFiber;
      return created;
    } else {
      const created = createFiberFromElement(element, returnFiber.mode, lanes);
      created.ref = coerceRef(returnFiber, currentFirstChild, element);
      created.return = returnFiber;
      return created;
    }
  }

  function reconcileSinglePortal(
    returnFiber,
    currentFirstChild,
    portal,
    lanes
  ) {
    const key = portal.key;
    let child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (
          child.tag === HostPortal &&
          child.stateNode.containerInfo === portal.containerInfo &&
          child.stateNode.implementation === portal.implementation
        ) {
          deleteRemainingChildren(returnFiber, child.sibling);
          const existing = useFiber(child, portal.children || []);
          existing.return = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    const created = createFiberFromPortal(portal, returnFiber.mode, lanes);
    created.return = returnFiber;
    return created;
  }

  // This API will tag the children with the side-effect of the reconciliation
  // itself. They will be added to the side-effect list as we pass through the
  // children and the parent.
  // reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  function reconcileChildFibers(
    returnFiber,
    currentFirstChild,
    newChild,
    lanes
  ) {
    // This function is not recursive.
    // If the top level item is an array, we treat it as a set of children,
    // not as a fragment. Nested arrays on the other hand will be treated as
    // fragment nodes. Recursion happens at the normal flow.

    // Handle top level unkeyed fragments as if they were arrays.
    // This leads to an ambiguity between <>{[...]}</> and <>...</>.
    // We treat the ambiguous cases above the same.
    const isUnkeyedTopLevelFragment =
      typeof newChild === "object" &&
      newChild !== null &&
      newChild.type === REACT_FRAGMENT_TYPE &&
      newChild.key === null;
    if (isUnkeyedTopLevelFragment) {
      newChild = newChild.props.children;
    }

    // Handle object types
    const isObject = typeof newChild === "object" && newChild !== null;
    if (isObject) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconcileSingleElement(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            )
          );
        case REACT_PORTAL_TYPE:
          return placeSingleChild(
            reconcileSinglePortal(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            )
          );
      }
    }

    if (typeof newChild === "string" || typeof newChild === "number") {
      return placeSingleChild(
        reconcileSingleTextNode(
          returnFiber,
          currentFirstChild,
          "" + newChild,
          lanes
        )
      );
    }

    if (isArray(newChild)) {
      return reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes
      );
    }

    if (getIteratorFn(newChild)) {
      return reconcileChildrenIterator(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes
      );
    }

    if (isObject) {
      throwOnInvalidObjectType(returnFiber, newChild);
    }

    if (__DEV__) {
      if (typeof newChild === "function") {
        warnOnFunctionType(returnFiber);
      }
    }
    if (typeof newChild === "undefined" && !isUnkeyedTopLevelFragment) {
      // If the new child is undefined, and the return fiber is a composite
      // component, throw an error. If Fiber return types are disabled,
      // we already threw above.
      switch (returnFiber.tag) {
        case ClassComponent: {
          if (__DEV__) {
            const instance = returnFiber.stateNode;
            if (instance.render._isMockFunction) {
              // We allow auto-mocks to proceed as if they're returning null.
              break;
            }
          }
        }
        // Intentionally fall through to the next case, which handles both
        // functions and classes
        // eslint-disable-next-lined no-fallthrough
        case FunctionComponent: {
          const Component = returnFiber.type;
          invariant(
            false,
            "%s(...): Nothing was returned from render. This usually means a " +
              "return statement is missing. Or, to render nothing, " +
              "return null.",
            Component.displayName || Component.name || "Component"
          );
        }
      }
    }

    // Remaining cases are all treated as empty.
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }

  return reconcileChildFibers;
}

function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  if (current === null) {
    // If this is a fresh new component that hasn't been rendered yet, we
    // won't update its child set by applying minimal side-effects. Instead,
    // we will add them all to the child before it gets rendered. That means
    // we can optimize this reconciliation pass by not tracking side-effects.
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes
    );
  } else {
    // If the current child is the same as the work in progress, it means that
    // we haven't yet started any work on these children. Therefore, we use
    // the clone algorithm to create a copy of all the current children.

    // If we had any progressed work already, that is invalid at this point so
    // let's throw it out.
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    );
  }

  consoleDeep("reconcileChildren->", workInProgress);
}

function createFiberFromElement(element, mode, lanes) {
  let owner = null;
  const type = element.type;
  const key = element.key;
  const pendingProps = element.props;
  const fiber = createFiberFromTypeAndProps(
    type,
    key,
    pendingProps,
    owner,
    mode,
    lanes
  );
  return fiber;
}

function shouldConstruct(Component) {
  const prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function createFiberFromTypeAndProps(
  type, // React$ElementType
  key,
  pendingProps,
  owner,
  mode,
  lanes
) {
  let fiberTag = IndeterminateComponent;
  // The resolved type is set if we know what the final type will be. I.e. it's not lazy.
  let resolvedType = type;
  if (typeof type === "function") {
    if (shouldConstruct(type)) {
      fiberTag = ClassComponent;
      if (__DEV__) {
        resolvedType = resolveClassForHotReloading(resolvedType);
      }
    } else {
      if (__DEV__) {
        resolvedType = resolveFunctionForHotReloading(resolvedType);
      }
    }
  } else if (typeof type === "string") {
    fiberTag = HostComponent;
  } else {
    getTag: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(pendingProps.children, mode, lanes, key);
      case REACT_DEBUG_TRACING_MODE_TYPE:
        fiberTag = Mode;
        mode |= DebugTracingMode;
        break;
      case REACT_STRICT_MODE_TYPE:
        fiberTag = Mode;
        mode |= StrictMode;
        break;
      case REACT_PROFILER_TYPE:
        return createFiberFromProfiler(pendingProps, mode, lanes, key);
      case REACT_SUSPENSE_TYPE:
        return createFiberFromSuspense(pendingProps, mode, lanes, key);
      case REACT_SUSPENSE_LIST_TYPE:
        return createFiberFromSuspenseList(pendingProps, mode, lanes, key);
      case REACT_OFFSCREEN_TYPE:
        return createFiberFromOffscreen(pendingProps, mode, lanes, key);
      case REACT_LEGACY_HIDDEN_TYPE:
        return createFiberFromLegacyHidden(pendingProps, mode, lanes, key);

      default: {
        if (typeof type === "object" && type !== null) {
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE:
              fiberTag = ContextProvider;
              break getTag;
            case REACT_CONTEXT_TYPE:
              // This is a consumer
              fiberTag = ContextConsumer;
              break getTag;
            case REACT_FORWARD_REF_TYPE:
              fiberTag = ForwardRef;
              if (__DEV__) {
                resolvedType = resolveForwardRefForHotReloading(resolvedType);
              }
              break getTag;
            case REACT_MEMO_TYPE:
              fiberTag = MemoComponent;
              break getTag;
            case REACT_LAZY_TYPE:
              fiberTag = LazyComponent;
              resolvedType = null;
              break getTag;
            case REACT_BLOCK_TYPE:
              fiberTag = Block;
              break getTag;
            case REACT_FUNDAMENTAL_TYPE:
              if (enableFundamentalAPI) {
                return createFiberFromFundamental(
                  type,
                  pendingProps,
                  mode,
                  lanes,
                  key
                );
              }
              break;
            case REACT_SCOPE_TYPE:
              if (enableScopeAPI) {
                return createFiberFromScope(
                  type,
                  pendingProps,
                  mode,
                  lanes,
                  key
                );
              }
          }
        }
        let info = "";
        if (__DEV__) {
          if (
            type === undefined ||
            (typeof type === "object" &&
              type !== null &&
              Object.keys(type).length === 0)
          ) {
            info +=
              " You likely forgot to your component from the file " +
              "it's defined in, or you might have mixed up default and " +
              "named imports.";
          }
          const ownerName = owner ? getComponentName(owner.type) : null;
          if (ownerName) {
            info += "\n\nCheck the render method of `" + ownerName + "`.";
          }
        }
        invariant(
          false,
          "Element type is invalid: expected a string (for built-in " +
            "components) or a class/function (for composite components) " +
            "but got: %s.%s",
          type == null ? type : typeof type,
          info
        );
      }
    }
  }

  const fiber = createFiber(fiberTag, pendingProps, key, mode);
  fiber.elementType = type;
  fiber.type = resolvedType;
  fiber.lanes = lanes;

  return fiber;
}

function coerceRef(returnFiber, current, element) {
  const mixedRef = element.ref;
  if (
    mixedRef !== null &&
    typeof mixedRef !== "function" &&
    typeof mixedRef !== "object"
  ) {
    if (element._owner) {
      const owner = element._owner;
      let inst;
      if (owner) {
        const ownerFiber = owner;
        inst = ownerFiber.stateNode;
      }
      const stringRef = "" + mixedRef;
      // Check if previous string ref matches new string ref
      if (
        current !== null &&
        current.ref !== null &&
        typeof current.ref === "function" &&
        current.ref._stringRef === stringRef
      ) {
        return current.ref;
      }
      const ref = function (value) {
        let refs = inst.refs;
        if (refs === emptyRefsObject) {
          // This is a lazy pooled frozen object, so we need to initialize.
          refs = inst.refs = {};
        }
        if (value === null) {
          delete refs[stringRef];
        } else {
          refs[stringRef] = value;
        }
      };
      ref._stringRef = stringRef;
      return ref;
    } else {
    }
  }
  return mixedRef;
}

function updateHostComponent(current, workInProgress, renderLanes) {
  pushHostContext(workInProgress);

  if (current === null) {
    // tryToClaimNextHydratableInstance(workInProgress);
  }

  const type = workInProgress.type;
  const nextProps = workInProgress.pendingProps;
  const prevProps = current !== null ? current.memoizedProps : null;

  let nextChildren = nextProps.children;
  const isDirectTextChild = shouldSetTextContent(type, nextProps);

  if (isDirectTextChild) {
    // We special case a direct text child of a host node. This is a common
    // case. We won't handle it as a reified child. We will instead handle
    // this in the host environment that also has access to this prop. That
    // avoids allocating another HostText fiber and traversing it.
    nextChildren = null;
  } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
    // If we're switching from a direct text child to a normal child, or to
    // empty, we need to schedule the text content to be reset.
    workInProgress.effectTag |= ContentReset;
  }

  markRef(current, workInProgress);

  if (
    (workInProgress.mode & ConcurrentMode) !== NoMode &&
    nextProps.hasOwnProperty("hidden")
  ) {
    const wrappedChildren = {
      $$typeof: REACT_ELEMENT_TYPE,
      type: REACT_LEGACY_HIDDEN_TYPE,
      key: null,
      ref: null,
      props: {
        children: nextChildren,
        // Check the host config to see if the children are offscreen/hidden.
        mode: shouldDeprioritizeSubtree(type, nextProps) ? "hidden" : "visible",
      },
      _owner: __DEV__ ? {} : null,
    };
    nextChildren = wrappedChildren;
  }

  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

function pushHostContext(fiber) {
  const rootInstance = requiredContext(rootInstanceStackCursor.current);
  const context = requiredContext(contextStackCursor.current);
  const nextContext = getChildHostContext(context, fiber.type, rootInstance);

  // Don't push this Fiber's context unless it's unique.
  if (context === nextContext) {
    return;
  }

  // Track the context and the Fiber that provided it.
  // This enables us to pop only Fibers that provide unique contexts.
  push(contextFiberStackCursor, fiber, fiber);
  push(contextStackCursor, nextContext, fiber);
}

function requiredContext(c) {
  return c;
}

function getChildHostContext(parentHostContext, type, rootContainerInstance) {
  const parentNamespace = parentHostContext;
  return getChildNamespace(parentNamespace, type);
}

function shouldSetTextContent(type, props) {
  return (
    type === "textarea" ||
    type === "option" ||
    type === "noscript" ||
    typeof props.children === "string" ||
    typeof props.children === "number" ||
    (typeof props.dangerouslySetInnerHTML === "object" &&
      props.dangerouslySetInnerHTML !== null &&
      props.dangerouslySetInnerHTML.__html != null)
  );
}

function markRef(current, workInProgress) {
  const ref = workInProgress.ref;
  if (
    (current === null && ref !== null) ||
    (current !== null && current.ref !== ref)
  ) {
    // Schedule a Ref effect
    workInProgress.effectTag |= Ref;
  }
}

function resetChildLanes(completedWork) {
  if (
    // TODO: Move this check out of the hot path by moving `resetChildLanes`
    // to switch statement in `completeWork`.
    (completedWork.tag === LegacyHiddenComponent ||
      completedWork.tag === OffscreenComponent) &&
    completedWork.memoizedState !== null &&
    !includesSomeLane(subtreeRenderLanes, OffscreenLane)
  ) {
    // The children of this component are hidden. Don't bubble their
    // expiration times.
    return;
  }

  let newChildLanes = NoLanes;

  // Bubble up the earliest expiration time.
  if (enableProfilerTimer && (completedWork.mode & ProfileMode) !== NoMode) {
    // In profiling mode, resetChildExpirationTime is also used to reset
    // profiler durations.
    let actualDuration = completedWork.actualDuration;
    let treeBaseDuration = completedWork.selfBaseDuration;

    // When a fiber is cloned, its actualDuration is reset to 0. This value will
    // only be updated if work is done on the fiber (i.e. it doesn't bailout).
    // When work is done, it should bubble to the parent's actualDuration. If
    // the fiber has not been cloned though, (meaning no work was done), then
    // this value will reflect the amount of time spent working on a previous
    // render. In that case it should not bubble. We determine whether it was
    // cloned by comparing the child pointer.
    const shouldBubbleActualDurations =
      completedWork.alternate === null ||
      completedWork.child !== completedWork.alternate.child;

    let child = completedWork.child;
    while (child !== null) {
      newChildLanes = mergeLanes(
        newChildLanes,
        mergeLanes(child.lanes, child.childLanes)
      );
      if (shouldBubbleActualDurations) {
        actualDuration += child.actualDuration;
      }
      treeBaseDuration += child.treeBaseDuration;
      child = child.sibling;
    }
    completedWork.actualDuration = actualDuration;
    completedWork.treeBaseDuration = treeBaseDuration;
  } else {
    let child = completedWork.child;
    while (child !== null) {
      newChildLanes = mergeLanes(
        newChildLanes,
        mergeLanes(child.lanes, child.childLanes)
      );
      child = child.sibling;
    }
  }

  completedWork.childLanes = newChildLanes;
}

function completeUnitOfWork(unitOfWork) {
  // Attempt to complete the current unit of work, then move to the next
  // sibling. If there are no more siblings, return to the parent fiber.
  let completedWork = unitOfWork;

  do {
    // The current, flushed, state of this fiber is the alternate. Ideally
    // nothing should rely on this, but relying on it here means that we don't
    // need an additional field on the work in progress.
    const current = completedWork.alternate;
    const returnFiber = completedWork.return;

    // Check if the work completed or if something threw.
    if ((completedWork.effectTag & Incomplete) === NoEffect) {
      let next;
      if (
        !enableProfilerTimer ||
        (completedWork.mode & ProfileMode) === NoMode
      ) {
        next = completeWork(current, completedWork, subtreeRenderLanes);
      } else {
        next = completeWork(current, completedWork, subtreeRenderLanes);
        // Update render duration assuming we didn't error.
      }

      resetChildLanes(completedWork);

      if (next !== null) {
        // Completing this fiber spawned new work. Work on that next.
        workInProgress = next;
        return;
      }

      if (
        returnFiber !== null &&
        // Do not append effects to parents if a sibling failed to complete
        (returnFiber.effectTag & Incomplete) === NoEffect
      ) {
        // Append all the effects of the subtree and this fiber onto the effect
        // list of the parent. The completion order of the children affects the
        // side-effect order.

        // 父节点的firstEffect指向当前节点的firstEffect
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = completedWork.firstEffect;
        }
        if (completedWork.lastEffect !== null) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
          }
          returnFiber.lastEffect = completedWork.lastEffect;
        }

        // If this fiber had side-effects, we append it AFTER the children's
        // side-effects. We can perform certain side-effects earlier if needed,
        // by doing multiple passes over the effect list. We don't want to
        // schedule our own side-effect on our own list because if end up
        // reusing children we'll schedule this effect onto itself since we're
        // at the end.
        const effectTag = completedWork.effectTag;

        // Skip both NoWork and PerformedWork tags when creating the effect
        // list. PerformedWork effect is read by React DevTools but shouldn't be
        // committed.
        if (effectTag > PerformedWork) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = completedWork;
          } else {
            returnFiber.firstEffect = completedWork;
          }
          returnFiber.lastEffect = completedWork;
        }
      }
    } else {
      // This fiber did not complete because something threw. Pop values off
      // the stack without entering the complete phase. If this is a boundary,
      // capture values if possible.
      const next = unwindWork(completedWork, subtreeRenderLanes);

      // Because this fiber did not complete, don't reset its expiration time.

      if (
        enableProfilerTimer &&
        (completedWork.mode & ProfileMode) !== NoMode
      ) {
        // Record the render duration for the fiber that errored.
        stopProfilerTimerIfRunningAndRecordDelta(completedWork, false);

        // Include the time spent working on failed children before continuing.
        let actualDuration = completedWork.actualDuration;
        let child = completedWork.child;
        while (child !== null) {
          actualDuration += child.actualDuration;
          child = child.sibling;
        }
        completedWork.actualDuration = actualDuration;
      }

      if (next !== null) {
        // If completing this work spawned new work, do that next. We'll come
        // back here again.
        // Since we're restarting, remove anything that is not a host effect
        // from the effect tag.
        next.effectTag &= HostEffectMask;
        workInProgress = next;
        return;
      }

      if (returnFiber !== null) {
        // Mark the parent fiber as incomplete and clear its effect list.
        returnFiber.firstEffect = returnFiber.lastEffect = null;
        returnFiber.effectTag |= Incomplete;
      }
    }

    // 处理子结点
    const siblingFiber = completedWork.sibling;

    if (siblingFiber !== null) {
      // If there is more work to do in this returnFiber, do that next.
      workInProgress = siblingFiber;
      return;
    }
    // Otherwise, return to the parent
    completedWork = returnFiber;
    // Update the next thing we're working on in case something throws.
    workInProgress = completedWork;
  } while (completedWork !== null);

  // We've reached the root.
  if (workInProgressRootExitStatus === RootIncomplete) {
    workInProgressRootExitStatus = RootCompleted;
  }
}

function completeWork(current, workInProgress, renderLanes) {
  function appendAllChildren(
    parent,
    workInProgress,
    needsVisibilityToggle,
    isHidden
  ) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    let node = workInProgress.child;
    while (node !== null) {
      if (node.tag === HostComponent || node.tag === HostText) {
        appendInitialChild(parent, node.stateNode);
      } else if (enableFundamentalAPI && node.tag === FundamentalComponent) {
        appendInitialChild(parent, node.stateNode.instance);
      } else if (node.tag === HostPortal) {
        // If we have a portal child, then we don't want to traverse
        // down its children. Instead, we'll get insertions from each child in
        // the portal directly.
      } else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === workInProgress) {
        return;
      }
      while (node.sibling === null) {
        if (node.return === null || node.return === workInProgress) {
          return;
        }
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }

  function appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  }

  function updateHostContainer(workInProgress) {
    // Noop
  }

  function updateHostComponent(
    current,
    workInProgress,
    type,
    newProps,
    rootContainerInstance
  ) {
    // If we have an alternate, that means this is an update and we need to
    // schedule a side-effect to do the updates.
    const oldProps = current.memoizedProps;
    if (oldProps === newProps) {
      // In mutation mode, this is sufficient for a bailout because
      // we won't touch this node even if children changed.
      return;
    }

    // If we get updated because one of our children updated, we don't
    // have newProps so we'll have to reuse them.
    // TODO: Split the update API as separate for the props vs. children.
    // Even better would be if children weren't special cased at all tho.
    const instance = workInProgress.stateNode;
    const currentHostContext = getHostContext();
    // TODO: Experiencing an error where oldProps is null. Suggests a host
    // component is hitting the resume path. Figure out why. Possibly
    // related to `hidden`.
    const updatePayload = prepareUpdate(
      instance,
      type,
      oldProps,
      newProps,
      rootContainerInstance,
      currentHostContext
    );
    // TODO: Type this specific to this type of component.
    workInProgress.updateQueue = updatePayload;
    // If the update payload indicates that there is a change or if there
    // is a new ref we mark this as an update. All the work is done in commitWork.
    if (updatePayload) {
      markUpdate(workInProgress);
    }
  }

  function updateHostText(current, workInProgress, oldText, newText) {
    // If the text differs, mark it as an update. All the work in done in commitWork.
    if (oldText !== newText) {
      markUpdate(workInProgress);
    }
  }

  function finalizeInitialChildren(
    domElement,
    type,
    props,
    rootContainerInstance,
    hostContext
  ) {
    setInitialProperties(domElement, type, props, rootContainerInstance);
    return shouldAutoFocusHostComponent(type, props);
  }

  function createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    let parentNamespace;
    if (__DEV__) {
      // TODO: take namespace into account when validating.
      const hostContextDev = hostContext;
      validateDOMNesting(type, null, hostContextDev.ancestorInfo);
      if (
        typeof props.children === "string" ||
        typeof props.children === "number"
      ) {
        const string = "" + props.children;
        const ownAncestorInfo = updatedAncestorInfo(
          hostContextDev.ancestorInfo,
          type
        );
        validateDOMNesting(null, string, ownAncestorInfo);
      }
      parentNamespace = hostContextDev.namespace;
    } else {
      parentNamespace = hostContext;
    }

    const domElement = createRealElement(
      // origin function name: createElement
      type,
      props,
      rootContainerInstance,
      parentNamespace
    );
    // DOM中设置一个属性访问当前fiber备份
    precacheFiberNode(internalInstanceHandle, domElement);
    // DOM中设置一个属性访问当前fiber props
    updateFiberProps(domElement, props);
    return domElement;
  }

  function createRealElement(
    type,
    props,
    rootContainerElement,
    parentNamespace
  ) {
    let isCustomComponentTag;

    // We create tags in the namespace of their parent container, except HTML
    // tags get no namespace.
    const ownerDocument = getOwnerDocumentFromRootContainer(
      rootContainerElement
    );
    let domElement;
    let namespaceURI = parentNamespace;
    if (namespaceURI === HTML_NAMESPACE) {
      namespaceURI = getIntrinsicNamespace(type);
    }
    if (namespaceURI === HTML_NAMESPACE) {
      const lowerCaseType = type.toLowerCase();

      if (__DEV__) {
        isCustomComponentTag = isCustomComponent(type, props);
        // Should this check be gated by parent namespace? Not sure we want to
        // allow <SVG> or <mATH>.
        if (!isCustomComponentTag && type !== lowerCaseType) {
          console.error(
            "<%s /> is using incorrect casing. " +
              "Use PascalCase for React components, " +
              "or lowercase for HTML elements.",
            type
          );
        }
      }

      if (lowerCaseType === "script") {
        // Create the script via .innerHTML so its "parser-inserted" flag is
        // set to true and it does not execute
        const div = ownerDocument.createElement("div");
        if (__DEV__) {
          if (enableTrustedTypesIntegration && !didWarnScriptTags) {
            console.error(
              "Encountered a script tag while rendering React component. " +
                "Scripts inside React components are never executed when rendering " +
                "on the client. Consider using template tag instead " +
                "(https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)."
            );
            didWarnScriptTags = true;
          }
        }
        div.innerHTML = "<script><" + "/script>"; // eslint-disable-line
        // This is guaranteed to yield a script element.
        const firstChild = div.firstChild;
        domElement = div.removeChild(firstChild);
      } else if (typeof props.is === "string") {
        // $FlowIssue `createElement` should be updated for Web Components
        domElement = ownerDocument.createElement(type, { is: props.is });
      } else {
        // Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
        // See discussion in https://github.com/facebook/react/pull/6896
        // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
        domElement = ownerDocument.createElement(type);
        // Normally attributes are assigned in `setInitialDOMProperties`, however the `multiple` and `size`
        // attributes on `select`s needs to be added before `option`s are inserted.
        // This prevents:
        // - a bug where the `select` does not scroll to the correct option because singular
        //  `select` elements automatically pick the first item #13222
        // - a bug where the `select` set the first item as selected despite the `size` attribute #14239
        // See https://github.com/facebook/react/issues/13222
        // and https://github.com/facebook/react/issues/14239
        if (type === "select") {
          const node = domElement;
          if (props.multiple) {
            node.multiple = true;
          } else if (props.size) {
            // Setting a size greater than 1 causes a select to behave like `multiple=true`, where
            // it is possible that no option is selected.
            //
            // This is only necessary when a select in "single selection mode".
            node.size = props.size;
          }
        }
      }
    } else {
      domElement = ownerDocument.createElementNS(namespaceURI, type);
    }

    if (__DEV__) {
      if (namespaceURI === HTML_NAMESPACE) {
        if (
          !isCustomComponentTag &&
          Object.prototype.toString.call(domElement) ===
            "[object HTMLUnknownElement]" &&
          !Object.prototype.hasOwnProperty.call(warnedUnknownTags, type)
        ) {
          warnedUnknownTags[type] = true;
          console.error(
            "The tag <%s> is unrecognized in this browser. " +
              "If you meant to render a React component, start its name with " +
              "an uppercase letter.",
            type
          );
        }
      }
    }

    return domElement;
  }

  function setInitialProperties(
    domElement,
    tag,
    rawProps,
    rootContainerElement
  ) {
    const isCustomComponentTag = isCustomComponent(tag, rawProps);
    if (__DEV__) {
      validatePropertiesInDevelopment(tag, rawProps);
    }

    // TODO: Make sure that we check isMounted before firing any of these events.
    let props;
    switch (tag) {
      case "iframe":
      case "object":
      case "embed":
        if (!enableModernEventSystem) {
          legacyTrapBubbledEvent(TOP_LOAD, domElement);
        }
        props = rawProps;
        break;
      case "video":
      case "audio":
        if (!enableModernEventSystem) {
          // Create listener for each media event
          for (let i = 0; i < mediaEventTypes.length; i++) {
            legacyTrapBubbledEvent(mediaEventTypes[i], domElement);
          }
        }
        props = rawProps;
        break;
      case "source":
        if (!enableModernEventSystem) {
          legacyTrapBubbledEvent(TOP_ERROR, domElement);
        }
        props = rawProps;
        break;
      case "img":
      case "image":
      case "link":
        if (!enableModernEventSystem) {
          legacyTrapBubbledEvent(TOP_ERROR, domElement);
          legacyTrapBubbledEvent(TOP_LOAD, domElement);
        }
        props = rawProps;
        break;
      case "form":
        if (!enableModernEventSystem) {
          legacyTrapBubbledEvent(TOP_RESET, domElement);
          legacyTrapBubbledEvent(TOP_SUBMIT, domElement);
        }
        props = rawProps;
        break;
      case "details":
        if (!enableModernEventSystem) {
          legacyTrapBubbledEvent(TOP_TOGGLE, domElement);
        }
        props = rawProps;
        break;
      case "input":
        ReactDOMInputInitWrapperState(domElement, rawProps);
        props = ReactDOMInputGetHostProps(domElement, rawProps);
        if (!enableModernEventSystem) {
          legacyTrapBubbledEvent(TOP_INVALID, domElement);
        }
        // For controlled components we always need to ensure we're listening
        // to onChange. Even if there is no listener.
        ensureListeningTo(rootContainerElement, "onChange");
        break;
      case "option":
        ReactDOMOptionValidateProps(domElement, rawProps);
        props = ReactDOMOptionGetHostProps(domElement, rawProps);
        break;
      case "select":
        ReactDOMSelectInitWrapperState(domElement, rawProps);
        props = ReactDOMSelectGetHostProps(domElement, rawProps);
        if (!enableModernEventSystem) {
          legacyTrapBubbledEvent(TOP_INVALID, domElement);
        }
        // For controlled components we always need to ensure we're listening
        // to onChange. Even if there is no listener.
        ensureListeningTo(rootContainerElement, "onChange");
        break;
      case "textarea":
        ReactDOMTextareaInitWrapperState(domElement, rawProps);
        props = ReactDOMTextareaGetHostProps(domElement, rawProps);
        if (!enableModernEventSystem) {
          legacyTrapBubbledEvent(TOP_INVALID, domElement);
        }
        // For controlled components we always need to ensure we're listening
        // to onChange. Even if there is no listener.
        ensureListeningTo(rootContainerElement, "onChange");
        break;
      default:
        props = rawProps;
    }

    assertValidProps(tag, props);

    setInitialDOMProperties(
      tag,
      domElement,
      rootContainerElement,
      props,
      isCustomComponentTag
    );

    switch (tag) {
      case "input":
        // TODO: Make sure we check if this is still unmounted or do any clean
        // up necessary since we never stop tracking anymore.
        track(domElement);
        ReactDOMInputPostMountWrapper(domElement, rawProps, false);
        break;
      case "textarea":
        // TODO: Make sure we check if this is still unmounted or do any clean
        // up necessary since we never stop tracking anymore.
        track(domElement);
        ReactDOMTextareaPostMountWrapper(domElement, rawProps);
        break;
      case "option":
        ReactDOMOptionPostMountWrapper(domElement, rawProps);
        break;
      case "select":
        ReactDOMSelectPostMountWrapper(domElement, rawProps);
        break;
      default:
        if (typeof props.onClick === "function") {
          // TODO: This cast may not be sound for SVG, MathML or custom elements.
          trapClickOnNonInteractiveElement(domElement);
        }
        break;
    }
  }

  function setValueForProperty(node, name, value, isCustomComponentTag) {
    const properties = {};

    function getPropertyInfo(name) {
      return properties.hasOwnProperty(name) ? properties[name] : null;
    }

    function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
      if (propertyInfo !== null) {
        return propertyInfo.type === RESERVED;
      }
      if (isCustomComponentTag) {
        return false;
      }
      if (
        name.length > 2 &&
        (name[0] === "o" || name[0] === "O") &&
        (name[1] === "n" || name[1] === "N")
      ) {
        return true;
      }
      return false;
    }

    function shouldRemoveAttributeWithWarning(
      name,
      value,
      propertyInfo,
      isCustomComponentTag
    ) {
      if (propertyInfo !== null && propertyInfo.type === RESERVED) {
        return false;
      }
      switch (typeof value) {
        case "function":
        // $FlowIssue symbol is perfectly valid here
        case "symbol": // eslint-disable-line
          return true;
        case "boolean": {
          if (isCustomComponentTag) {
            return false;
          }
          if (propertyInfo !== null) {
            return !propertyInfo.acceptsBooleans;
          } else {
            const prefix = name.toLowerCase().slice(0, 5);
            return prefix !== "data-" && prefix !== "aria-";
          }
        }
        default:
          return false;
      }
    }

    function shouldRemoveAttribute(
      name,
      value,
      propertyInfo,
      isCustomComponentTag
    ) {
      const RESERVED = 0;
      const STRING = 1;
      const BOOLEANISH_STRING = 2;
      const BOOLEAN = 3;
      const OVERLOADED_BOOLEAN = 4;
      const NUMERIC = 5;
      const POSITIVE_NUMERIC = 6;

      if (value === null || typeof value === "undefined") {
        return true;
      }
      if (
        shouldRemoveAttributeWithWarning(
          name,
          value,
          propertyInfo,
          isCustomComponentTag
        )
      ) {
        return true;
      }
      if (isCustomComponentTag) {
        return false;
      }
      if (propertyInfo !== null) {
        if (enableFilterEmptyStringAttributesDOM) {
          if (propertyInfo.removeEmptyString && value === "") {
            return true;
          }
        }

        switch (propertyInfo.type) {
          case BOOLEAN:
            return !value;
          case OVERLOADED_BOOLEAN:
            return value === false;
          case NUMERIC:
            return isNaN(value);
          case POSITIVE_NUMERIC:
            return isNaN(value) || value < 1;
        }
      }
      return false;
    }

    const hasOwnProperty = Object.prototype.hasOwnProperty;
    const illegalAttributeNameCache = {};
    const validatedAttributeNameCache = {};
    const ATTRIBUTE_NAME_START_CHAR =
      ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    const ATTRIBUTE_NAME_CHAR =
      ATTRIBUTE_NAME_START_CHAR +
      "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    const VALID_ATTRIBUTE_NAME_REGEX = new RegExp(
      "^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$"
    );
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
        return true;
      }
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
        return false;
      }
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
        validatedAttributeNameCache[attributeName] = true;
        return true;
      }
      illegalAttributeNameCache[attributeName] = true;
      return false;
    }

    const propertyInfo = getPropertyInfo(name);
    if (shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag)) {
      return;
    }
    if (
      shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag)
    ) {
      value = null;
    }
    // If the prop isn't in the special list, treat it as a simple attribute.
    if (isCustomComponentTag || propertyInfo === null) {
      if (isAttributeNameSafe(name)) {
        const attributeName = name;
        if (value === null) {
          node.removeAttribute(attributeName);
        } else {
          node.setAttribute(
            attributeName,
            enableTrustedTypesIntegration ? value : "" + value
          );
        }
      }
      return;
    }
    const { mustUseProperty } = propertyInfo;
    if (mustUseProperty) {
      const { propertyName } = propertyInfo;
      if (value === null) {
        const { type } = propertyInfo;
        node[propertyName] = type === BOOLEAN ? false : "";
      } else {
        // Contrary to `setAttribute`, object properties are properly
        // `toString`ed by IE8/9.
        node[propertyName] = value;
      }
      return;
    }
    // The rest are treated as attributes with special cases.
    const { attributeName, attributeNamespace } = propertyInfo;
    if (value === null) {
      node.removeAttribute(attributeName);
    } else {
      const { type } = propertyInfo;
      let attributeValue;
      if (type === BOOLEAN || (type === OVERLOADED_BOOLEAN && value === true)) {
        // If attribute type is boolean, we know for sure it won't be an execution sink
        // and we won't require Trusted Type here.
        attributeValue = "";
      } else {
        // `setAttribute` with objects becomes only `[object]` in IE8/9,
        // ('' + value) makes it output the correct toString()-value.
        if (enableTrustedTypesIntegration) {
          attributeValue = value;
        } else {
          attributeValue = "" + value;
        }
        if (propertyInfo.sanitizeURL) {
          sanitizeURL(attributeValue.toString());
        }
      }
      if (attributeNamespace) {
        node.setAttributeNS(attributeNamespace, attributeName, attributeValue);
      } else {
        node.setAttribute(attributeName, attributeValue);
      }
    }
  }

  function setInitialDOMProperties(
    tag,
    domElement,
    rootContainerElement,
    nextProps,
    isCustomComponentTag
  ) {
    const DANGEROUSLY_SET_INNER_HTML = "dangerouslySetInnerHTML";
    const SUPPRESS_CONTENT_EDITABLE_WARNING = "suppressContentEditableWarning";
    const SUPPRESS_HYDRATION_WARNING = "suppressHydrationWarning";
    const AUTOFOCUS = "autoFocus";
    const CHILDREN = "children";
    const STYLE = "style";
    const HTML = "__html";
    const DEPRECATED_flareListeners = "DEPRECATED_flareListeners";

    const registrationNameModules = {};

    for (const propKey in nextProps) {
      if (!nextProps.hasOwnProperty(propKey)) {
        continue;
      }
      const nextProp = nextProps[propKey];
      if (propKey === STYLE) {
        if (__DEV__) {
          if (nextProp) {
            // Freeze the next style object so that we can assume it won't be
            // mutated. We have already warned for this in the past.
            Object.freeze(nextProp);
          }
        }
        // Relies on `updateStylesByID` not mutating `styleUpdates`.
        setValueForStyles(domElement, nextProp);
      } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
        const nextHtml = nextProp ? nextProp[HTML] : undefined;
        if (nextHtml != null) {
          setInnerHTML(domElement, nextHtml);
        }
      } else if (propKey === CHILDREN) {
        if (typeof nextProp === "string") {
          // Avoid setting initial textContent when the text is empty. In IE11 setting
          // textContent on a <textarea> will cause the placeholder to not
          // show within the <textarea> until it has been focused and blurred again.
          // https://github.com/facebook/react/issues/6731#issuecomment-254874553
          const canSetTextContent = tag !== "textarea" || nextProp !== "";
          if (canSetTextContent) {
            setTextContent(domElement, nextProp);
          }
        } else if (typeof nextProp === "number") {
          setTextContent(domElement, "" + nextProp);
        }
      } else if (
        (enableDeprecatedFlareAPI && propKey === DEPRECATED_flareListeners) ||
        propKey === SUPPRESS_CONTENT_EDITABLE_WARNING ||
        propKey === SUPPRESS_HYDRATION_WARNING
      ) {
        // Noop
      } else if (propKey === AUTOFOCUS) {
        // We polyfill it separately on the client during commit.
        // We could have excluded it in the property list instead of
        // adding a special case here, but then it wouldn't be emitted
        // on server rendering (but we *do* want to emit it in SSR).
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        if (nextProp != null) {
          if (__DEV__ && typeof nextProp !== "function") {
            warnForInvalidEventListener(propKey, nextProp);
          }
          ensureListeningTo(rootContainerElement, propKey);
        }
      } else if (nextProp != null) {
        setValueForProperty(
          domElement,
          propKey,
          nextProp,
          isCustomComponentTag
        );
      }
    }
  }

  function isCustomComponent(tagName, props) {
    if (tagName.indexOf("-") === -1) {
      return typeof props.is === "string";
    }
    switch (tagName) {
      // These are reserved SVG and MathML elements.
      // We don't mind this whitelist too much because we expect it to never grow.
      // The alternative is to track the namespace in a few places which is convoluted.
      // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }

  function shouldAutoFocusHostComponent(type, props) {
    switch (type) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!props.autoFocus;
    }
    return false;
  }

  function markRef(workInProgress) {
    workInProgress.effectTag |= Ref;
  }

  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      return null;
    case ClassComponent: {
      const Component = workInProgress.type;
      if (isLegacyContextProvider(Component)) {
        popLegacyContext(workInProgress);
      }
      return null;
    }
    case HostRoot: {
      popHostContainer(workInProgress);
      popTopLevelLegacyContextObject(workInProgress);
      resetMutableSourceWorkInProgressVersions();
      const fiberRoot = workInProgress.stateNode;
      if (fiberRoot.pendingContext) {
        fiberRoot.context = fiberRoot.pendingContext;
        fiberRoot.pendingContext = null;
      }
      if (current === null || current.child === null) {
        // If we hydrated, pop so that we can delete any remaining children
        // that weren't hydrated.
        const wasHydrated = popHydrationState(workInProgress);
        if (wasHydrated) {
          // If we hydrated, then we'll need to schedule an update for
          // the commit side-effects on the root.
          markUpdate(workInProgress);
        } else if (!fiberRoot.hydrate) {
          // Schedule an effect to clear this container at the start of the next commit.
          // This handles the case of React rendering into a container with previous children.
          // It's also safe to do for updates too, because current.child would only be null
          // if the previous render was null (so the the container would already be empty).
          workInProgress.effectTag |= Snapshot;
        }
      }
      updateHostContainer(workInProgress);
      return null;
    }
    case HostComponent: {
      popHostContext(workInProgress);
      const rootContainerInstance = getRootHostContainer();
      const type = workInProgress.type;
      if (current !== null && workInProgress.stateNode != null) {
        updateHostComponent(
          current,
          workInProgress,
          type,
          newProps,
          rootContainerInstance
        );

        if (enableDeprecatedFlareAPI) {
          const prevListeners = current.memoizedProps.DEPRECATED_flareListeners;
          const nextListeners = newProps.DEPRECATED_flareListeners;
          if (prevListeners !== nextListeners) {
            markUpdate(workInProgress);
          }
        }

        if (current.ref !== workInProgress.ref) {
          markRef(workInProgress);
        }
      } else {
        if (!newProps) {
          invariant(
            workInProgress.stateNode !== null,
            "We must have new props for new mounts. This error is likely " +
              "caused by a bug in React. Please file an issue."
          );
          // This can happen when we abort work.
          return null;
        }
        const currentHostContext = getHostContext();
        // TODO: Move createInstance to beginWork and keep it on a context
        // "stack" as the parent. Then append children as we go in beginWork
        // or completeWork depending on whether we want to add them top->down or
        // bottom->up. Top->down is faster in IE11.
        const wasHydrated = popHydrationState(workInProgress);
        if (wasHydrated) {
          // TODO: Move this and createInstance step into the beginPhase
          // to consolidate.
          if (
            prepareToHydrateHostInstance(
              workInProgress,
              rootContainerInstance,
              currentHostContext
            )
          ) {
            // If changes to the hydrated node need to be applied at the
            // commit-phase we mark this as such.
            markUpdate(workInProgress);
          }
          if (enableDeprecatedFlareAPI) {
            const listeners = newProps.DEPRECATED_flareListeners;
            if (listeners != null) {
              updateDeprecatedEventListeners(
                listeners,
                workInProgress,
                rootContainerInstance
              );
            }
          }
        } else {
          const instance = createInstance(
            type,
            newProps,
            rootContainerInstance,
            currentHostContext,
            workInProgress
          );

          // fixme
          appendAllChildren(instance, workInProgress, false, false);

          // This needs to be set before we mount Flare event listeners
          workInProgress.stateNode = instance;

          if (enableDeprecatedFlareAPI) {
            const listeners = newProps.DEPRECATED_flareListeners;
            if (listeners != null) {
              updateDeprecatedEventListeners(
                listeners,
                workInProgress,
                rootContainerInstance
              );
            }
          }

          // Certain renderers require commit-time effects for initial mount.
          // (eg DOM renderer supports auto-focus for certain elements).
          // Make sure such renderers get scheduled for later work.
          if (
            finalizeInitialChildren(
              instance,
              type,
              newProps,
              rootContainerInstance,
              currentHostContext
            )
          ) {
            markUpdate(workInProgress);
          }
        }

        if (workInProgress.ref !== null) {
          // If there is a ref on a host node we need to schedule a callback
          markRef(workInProgress);
        }
      }
      return null;
    }
    case HostText: {
      const newText = newProps;
      if (current && workInProgress.stateNode != null) {
        const oldText = current.memoizedProps;
        // If we have an alternate, that means this is an update and we need
        // to schedule a side-effect to do the updates.
        updateHostText(current, workInProgress, oldText, newText);
      } else {
        if (typeof newText !== "string") {
          invariant(
            workInProgress.stateNode !== null,
            "We must have new props for new mounts. This error is likely " +
              "caused by a bug in React. Please file an issue."
          );
          // This can happen when we abort work.
        }
        const rootContainerInstance = getRootHostContainer();
        const currentHostContext = getHostContext();
        const wasHydrated = popHydrationState(workInProgress);
        if (wasHydrated) {
          if (prepareToHydrateHostTextInstance(workInProgress)) {
            markUpdate(workInProgress);
          }
        } else {
          workInProgress.stateNode = createTextInstance(
            newText,
            rootContainerInstance,
            currentHostContext,
            workInProgress
          );
        }
      }
      return null;
    }
    case SuspenseComponent: {
      popSuspenseContext(workInProgress);
      const nextState = workInProgress.memoizedState;

      if (enableSuspenseServerRenderer) {
        if (nextState !== null && nextState.dehydrated !== null) {
          if (current === null) {
            const wasHydrated = popHydrationState(workInProgress);
            invariant(
              wasHydrated,
              "A dehydrated suspense component was completed without a hydrated node. " +
                "This is probably a bug in React."
            );
            prepareToHydrateHostSuspenseInstance(workInProgress);
            if (enableSchedulerTracing) {
              markSpawnedWork(OffscreenLane);
            }
            return null;
          } else {
            // We should never have been in a hydration state if we didn't have a current.
            // However, in some of those paths, we might have reentered a hydration state
            // and then we might be inside a hydration state. In that case, we'll need to exit out of it.
            resetHydrationState();
            if ((workInProgress.effectTag & DidCapture) === NoEffect) {
              // This boundary did not suspend so it's now hydrated and unsuspended.
              workInProgress.memoizedState = null;
            }
            // If nothing suspended, we need to schedule an effect to mark this boundary
            // as having hydrated so events know that they're free to be invoked.
            // It's also a signal to replay events and the suspense callback.
            // If something suspended, schedule an effect to attach retry listeners.
            // So we might as well always mark this.
            workInProgress.effectTag |= Update;
            return null;
          }
        }
      }

      if ((workInProgress.effectTag & DidCapture) !== NoEffect) {
        // Something suspended. Re-render with the fallback children.
        workInProgress.lanes = renderLanes;
        // Do not reset the effect list.
        return workInProgress;
      }

      const nextDidTimeout = nextState !== null;
      let prevDidTimeout = false;
      if (current === null) {
        if (workInProgress.memoizedProps.fallback !== undefined) {
          popHydrationState(workInProgress);
        }
      } else {
        const prevState = current.memoizedState;
        prevDidTimeout = prevState !== null;
      }

      if (nextDidTimeout && !prevDidTimeout) {
        // If this subtreee is running in blocking mode we can suspend,
        // otherwise we won't suspend.
        // TODO: This will still suspend a synchronous tree if anything
        // in the concurrent tree already suspended during this render.
        // This is a known bug.
        if ((workInProgress.mode & BlockingMode) !== NoMode) {
          // TODO: Move this back to throwException because this is too late
          // if this is a large tree which is common for initial loads. We
          // don't know if we should restart a render or not until we get
          // this marker, and this is too late.
          // If this render already had a ping or lower pri updates,
          // and this is the first time we know we're going to suspend we
          // should be able to immediately restart from within throwException.
          const hasInvisibleChildContext =
            current === null &&
            workInProgress.memoizedProps.unstable_avoidThisFallback !== true;
          if (
            hasInvisibleChildContext ||
            hasSuspenseContext(
              suspenseStackCursor.current,
              InvisibleParentSuspenseContext
            )
          ) {
            // If this was in an invisible tree or a new render, then showing
            // this boundary is ok.
            renderDidSuspend();
          } else {
            // Otherwise, we're going to have to hide content so we should
            // suspend for longer if possible.
            renderDidSuspendDelayIfPossible();
          }
        }
      }

      if (supportsPersistence) {
        // TODO: Only schedule updates if not prevDidTimeout.
        if (nextDidTimeout) {
          // If this boundary just timed out, schedule an effect to attach a
          // retry listener to the promise. This flag is also used to hide the
          // primary children.
          workInProgress.effectTag |= Update;
        }
      }
      if (supportsMutation) {
        // TODO: Only schedule updates if these values are non equal, i.e. it changed.
        if (nextDidTimeout || prevDidTimeout) {
          // If this boundary just timed out, schedule an effect to attach a
          // retry listener to the promise. This flag is also used to hide the
          // primary children. In mutation mode, we also need the flag to
          // *unhide* children that were previously hidden, so check if this
          // is currently timed out, too.
          workInProgress.effectTag |= Update;
        }
      }
      if (
        enableSuspenseCallback &&
        workInProgress.updateQueue !== null &&
        workInProgress.memoizedProps.suspenseCallback != null
      ) {
        // Always notify the callback
        workInProgress.effectTag |= Update;
      }
      return null;
    }
    case HostPortal:
      popHostContainer(workInProgress);
      updateHostContainer(workInProgress);
      if (current === null) {
        preparePortalMount(workInProgress.stateNode.containerInfo);
      }
      return null;
    case ContextProvider:
      // Pop provider fiber
      popProvider(workInProgress);
      return null;
    case IncompleteClassComponent: {
      // Same as class component case. I put it down here so that the tags are
      // sequential to ensure this switch is compiled to a jump table.
      const Component = workInProgress.type;
      if (isLegacyContextProvider(Component)) {
        popLegacyContext(workInProgress);
      }
      return null;
    }
    case SuspenseListComponent: {
      popSuspenseContext(workInProgress);

      const renderState = workInProgress.memoizedState;

      if (renderState === null) {
        // We're running in the default, "independent" mode.
        // We don't do anything in this mode.
        return null;
      }

      let didSuspendAlready =
        (workInProgress.effectTag & DidCapture) !== NoEffect;

      const renderedTail = renderState.rendering;
      if (renderedTail === null) {
        // We just rendered the head.
        if (!didSuspendAlready) {
          // This is the first pass. We need to figure out if anything is still
          // suspended in the rendered set.

          // If new content unsuspended, but there's still some content that
          // didn't. Then we need to do a second pass that forces everything
          // to keep showing their fallbacks.

          // We might be suspended if something in this render pass suspended, or
          // something in the previous committed pass suspended. Otherwise,
          // there's no chance so we can skip the expensive call to
          // findFirstSuspended.
          const cannotBeSuspended =
            renderHasNotSuspendedYet() &&
            (current === null || (current.effectTag & DidCapture) === NoEffect);
          if (!cannotBeSuspended) {
            let row = workInProgress.child;
            while (row !== null) {
              const suspended = findFirstSuspended(row);
              if (suspended !== null) {
                didSuspendAlready = true;
                workInProgress.effectTag |= DidCapture;
                cutOffTailIfNeeded(renderState, false);

                // If this is a newly suspended tree, it might not get committed as
                // part of the second pass. In that case nothing will subscribe to
                // its thennables. Instead, we'll transfer its thennables to the
                // SuspenseList so that it can retry if they resolve.
                // There might be multiple of these in the list but since we're
                // going to wait for all of them anyway, it doesn't really matter
                // which ones gets to ping. In theory we could get clever and keep
                // track of how many dependencies remain but it gets tricky because
                // in the meantime, we can add/remove/change items and dependencies.
                // We might bail out of the loop before finding any but that
                // doesn't matter since that means that the other boundaries that
                // we did find already has their listeners attached.
                const newThennables = suspended.updateQueue;
                if (newThennables !== null) {
                  workInProgress.updateQueue = newThennables;
                  workInProgress.effectTag |= Update;
                }

                // Rerender the whole list, but this time, we'll force fallbacks
                // to stay in place.
                // Reset the effect list before doing the second pass since that's now invalid.
                if (renderState.lastEffect === null) {
                  workInProgress.firstEffect = null;
                }
                workInProgress.lastEffect = renderState.lastEffect;
                // Reset the child fibers to their original state.
                resetChildFibers(workInProgress, renderLanes);

                // Set up the Suspense Context to force suspense and immediately
                // rerender the children.
                pushSuspenseContext(
                  workInProgress,
                  setShallowSuspenseContext(
                    suspenseStackCursor.current,
                    ForceSuspenseFallback
                  )
                );
                return workInProgress.child;
              }
              row = row.sibling;
            }
          }
        } else {
          cutOffTailIfNeeded(renderState, false);
        }
        // Next we're going to render the tail.
      } else {
        // Append the rendered row to the child list.
        if (!didSuspendAlready) {
          const suspended = findFirstSuspended(renderedTail);
          if (suspended !== null) {
            workInProgress.effectTag |= DidCapture;
            didSuspendAlready = true;

            // Ensure we transfer the update queue to the parent so that it doesn't
            // get lost if this row ends up dropped during a second pass.
            const newThennables = suspended.updateQueue;
            if (newThennables !== null) {
              workInProgress.updateQueue = newThennables;
              workInProgress.effectTag |= Update;
            }

            cutOffTailIfNeeded(renderState, true);
            // This might have been modified.
            if (
              renderState.tail === null &&
              renderState.tailMode === "hidden" &&
              !renderedTail.alternate
            ) {
              // We need to delete the row we just rendered.
              // Reset the effect list to what it was before we rendered this
              // child. The nested children have already appended themselves.
              const lastEffect = (workInProgress.lastEffect =
                renderState.lastEffect);
              // Remove any effects that were appended after this point.
              if (lastEffect !== null) {
                lastEffect.nextEffect = null;
              }
              // We're done.
              return null;
            }
          } else if (
            // The time it took to render last row is greater than time until
            // the expiration.
            now() * 2 - renderState.renderingStartTime >
              renderState.tailExpiration &&
            renderLanes !== OffscreenLane
          ) {
            // We have now passed our CPU deadline and we'll just give up further
            // attempts to render the main content and only render fallbacks.
            // The assumption is that this is usually faster.
            workInProgress.effectTag |= DidCapture;
            didSuspendAlready = true;

            cutOffTailIfNeeded(renderState, false);

            // Since nothing actually suspended, there will nothing to ping this
            // to get it started back up to attempt the next item. If we can show
            // them, then they really have the same priority as this render.
            // So we'll pick it back up the very next render pass once we've had
            // an opportunity to yield for paint.
            workInProgress.lanes = renderLanes;
            if (enableSchedulerTracing) {
              markSpawnedWork(renderLanes);
            }
          }
        }
        if (renderState.isBackwards) {
          // The effect list of the backwards tail will have been added
          // to the end. This breaks the guarantee that life-cycles fire in
          // sibling order but that isn't a strong guarantee promised by React.
          // Especially since these might also just pop in during future commits.
          // Append to the beginning of the list.
          renderedTail.sibling = workInProgress.child;
          workInProgress.child = renderedTail;
        } else {
          const previousSibling = renderState.last;
          if (previousSibling !== null) {
            previousSibling.sibling = renderedTail;
          } else {
            workInProgress.child = renderedTail;
          }
          renderState.last = renderedTail;
        }
      }

      if (renderState.tail !== null) {
        // We still have tail rows to render.
        if (renderState.tailExpiration === 0) {
          // Heuristic for how long we're willing to spend rendering rows
          // until we just give up and show what we have so far.
          const TAIL_EXPIRATION_TIMEOUT_MS = 500;
          renderState.tailExpiration = now() + TAIL_EXPIRATION_TIMEOUT_MS;
          // TODO: This is meant to mimic the train model or JND but this
          // is a per component value. It should really be since the start
          // of the total render or last commit. Consider using something like
          // globalMostRecentFallbackTime. That doesn't account for being
          // suspended for part of the time or when it's a new render.
          // It should probably use a global start time value instead.
        }
        // Pop a row.
        const next = renderState.tail;
        renderState.rendering = next;
        renderState.tail = next.sibling;
        renderState.lastEffect = workInProgress.lastEffect;
        renderState.renderingStartTime = now();
        next.sibling = null;

        // Restore the context.
        // TODO: We can probably just avoid popping it instead and only
        // setting it the first time we go from not suspended to suspended.
        let suspenseContext = suspenseStackCursor.current;
        if (didSuspendAlready) {
          suspenseContext = setShallowSuspenseContext(
            suspenseContext,
            ForceSuspenseFallback
          );
        } else {
          suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
        }
        pushSuspenseContext(workInProgress, suspenseContext);
        // Do a pass over the next row.
        return next;
      }
      return null;
    }
    case FundamentalComponent: {
      if (enableFundamentalAPI) {
        const fundamentalImpl = workInProgress.type.impl;
        let fundamentalInstance = workInProgress.stateNode;

        if (fundamentalInstance === null) {
          const getInitialState = fundamentalImpl.getInitialState;
          let fundamentalState;
          if (getInitialState !== undefined) {
            fundamentalState = getInitialState(newProps);
          }
          fundamentalInstance = workInProgress.stateNode = createFundamentalStateInstance(
            workInProgress,
            newProps,
            fundamentalImpl,
            fundamentalState || {}
          );
          const instance = getFundamentalComponentInstance(fundamentalInstance);
          fundamentalInstance.instance = instance;
          if (fundamentalImpl.reconcileChildren === false) {
            return null;
          }
          appendAllChildren(instance, workInProgress, false, false);
          mountFundamentalComponent(fundamentalInstance);
        } else {
          // We fire update in commit phase
          const prevProps = fundamentalInstance.props;
          fundamentalInstance.prevProps = prevProps;
          fundamentalInstance.props = newProps;
          fundamentalInstance.currentFiber = workInProgress;
          if (supportsPersistence) {
            const instance = cloneFundamentalInstance(fundamentalInstance);
            fundamentalInstance.instance = instance;
            appendAllChildren(instance, workInProgress, false, false);
          }
          const shouldUpdate = shouldUpdateFundamentalComponent(
            fundamentalInstance
          );
          if (shouldUpdate) {
            markUpdate(workInProgress);
          }
        }
        return null;
      }
      break;
    }
    case ScopeComponent: {
      if (enableScopeAPI) {
        if (current === null) {
          const scopeInstance = createScopeInstance();
          workInProgress.stateNode = scopeInstance;
          if (enableDeprecatedFlareAPI) {
            const listeners = newProps.DEPRECATED_flareListeners;
            if (listeners != null) {
              const rootContainerInstance = getRootHostContainer();
              updateDeprecatedEventListeners(
                listeners,
                workInProgress,
                rootContainerInstance
              );
            }
          }
          prepareScopeUpdate(scopeInstance, workInProgress);
          if (workInProgress.ref !== null) {
            markRef(workInProgress);
            markUpdate(workInProgress);
          }
        } else {
          if (enableDeprecatedFlareAPI) {
            const prevListeners =
              current.memoizedProps.DEPRECATED_flareListeners;
            const nextListeners = newProps.DEPRECATED_flareListeners;
            if (
              prevListeners !== nextListeners ||
              workInProgress.ref !== null
            ) {
              markUpdate(workInProgress);
            }
          } else {
            if (workInProgress.ref !== null) {
              markUpdate(workInProgress);
            }
          }
          if (current.ref !== workInProgress.ref) {
            markRef(workInProgress);
          }
        }
        return null;
      }
      break;
    }
    case Block:
      if (enableBlocksAPI) {
        return null;
      }
      break;
    case OffscreenComponent:
    case LegacyHiddenComponent: {
      popRenderLanes(workInProgress);
      if (current !== null) {
        const nextState = workInProgress.memoizedState;
        const prevState = current.memoizedState;

        const prevIsHidden = prevState !== null;
        const nextIsHidden = nextState !== null;
        if (prevIsHidden !== nextIsHidden) {
          workInProgress.effectTag |= Update;
        }
      }
      return null;
    }
  }
  invariant(
    false,
    "Unknown unit of work tag (%s). This error is likely caused by a bug in " +
      "React. Please file an issue.",
    workInProgress.tag
  );
}

function popHostContext(fiber) {
  // Do not pop unless this Fiber provided the current context.
  // pushHostContext() only pushes Fibers that provide unique contexts.
  if (contextFiberStackCursor.current !== fiber) {
    return;
  }

  pop(contextStackCursor, fiber);
  pop(contextFiberStackCursor, fiber);
}

function getRootHostContainer() {
  const rootInstance = requiredContext(rootInstanceStackCursor.current);
  return rootInstance;
}

function getHostContext() {
  const context = requiredContext(contextStackCursor.current);
  return context;
}

function popHydrationState() {
  return false;
}

function getOwnerDocumentFromRootContainer(rootContainerElement) {
  return rootContainerElement.nodeType === DOCUMENT_NODE
    ? rootContainerElement
    : rootContainerElement.ownerDocument;
}

function precacheFiberNode(hostInst, node) {
  node[internalInstanceKey] = hostInst;
}

function updateFiberProps(node, props) {
  node[internalPropsKey] = props;
}

function popHostContainer(fiber) {
  pop(contextStackCursor, fiber);
  pop(contextFiberStackCursor, fiber);
  pop(rootInstanceStackCursor, fiber);
}

function popTopLevelLegacyContextObject(fiber) {
  if (disableLegacyContext) {
    return;
  } else {
    pop(didPerformWorkStackCursor, fiber);
    pop(contextStackCursor, fiber);
  }
}

function resetMutableSourceWorkInProgressVersions() {
  if (isPrimaryRenderer) {
    for (let i = 0; i < workInProgressPrimarySources.length; i++) {
      const mutableSource = workInProgressPrimarySources[i];
      mutableSource._workInProgressVersionPrimary = null;
    }
    workInProgressPrimarySources.length = 0;
  } else {
    for (let i = 0; i < workInProgressSecondarySources.length; i++) {
      const mutableSource = workInProgressSecondarySources[i];
      mutableSource._workInProgressVersionSecondary = null;
    }
    workInProgressSecondarySources.length = 0;
  }
}

function resetContextDependencies() {
  // This is called right before React yields execution, to ensure `readContext`
  // cannot be called outside the render phase.
  currentlyRenderingFiber = null;
  lastContextDependency = null;
  lastContextWithAllBitsObserved = null;
  if (__DEV__) {
    isDisallowedContextReadInDEV = false;
  }
}

function popDispatcher(prevDispatcher) {
  ReactCurrentDispatcher.current = prevDispatcher;
}

function commitRoot(root) {
  console.log("commitRoot");
  const renderPriorityLevel = getCurrentPriorityLevel();
  runWithPriority(
    ImmediatePriority,
    commitRootImpl.bind(null, root, renderPriorityLevel)
  );
  return null;
}

function commitRootImpl(root, renderPriorityLevel) {
  do {
    // `flushPassiveEffects` will call `flushSyncUpdateQueue` at the end, which
    // means `flushPassiveEffects` will sometimes result in additional
    // passive effects. So we need to keep flushing in a loop until there are
    // no more pending effects.
    // TODO: Might be better if `flushPassiveEffects` did not automatically
    // flush synchronous work at the end, to avoid factoring hazards like this.
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null);

  const finishedWork = root.finishedWork;
  const lanes = root.finishedLanes;
  if (finishedWork === null) {
    return null;
  }
  root.finishedWork = null;
  root.finishedLanes = NoLanes;

  // commitRoot never returns a continuation; it always finishes synchronously.
  // So we can clear these now to allow a new callback to be scheduled.
  root.callbackNode = null;
  root.callbackId = NoLanes;
  // TODO: Use LanePriority instead of SchedulerPriority
  if (renderPriorityLevel < ImmediatePriority) {
    // If this was a concurrent render, we can reset the expiration time.
    root.expiresAt = -1;
  }

  // Update the first and last pending times on this root. The new first
  // pending time is whatever is left on the root fiber.
  let remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes);
  markRootFinished(root, remainingLanes);

  // Clear already finished discrete updates in case that a later call of
  // `flushDiscreteUpdates` starts a useless render pass which may cancels
  // a scheduled timeout.
  if (rootsWithPendingDiscreteUpdates !== null) {
    if (
      !hasDiscreteLanes(remainingLanes) &&
      rootsWithPendingDiscreteUpdates.has(root)
    ) {
      rootsWithPendingDiscreteUpdates.delete(root);
    }
  }

  if (root === workInProgressRoot) {
    // We can reset these now that they are finished.
    workInProgressRoot = null;
    workInProgress = null;
    workInProgressRootRenderLanes = NoLanes;
  } else {
    // This indicates that the last root we worked on is not the same one that
    // we're committing now. This most commonly happens when a suspended root
    // times out.
  }

  // Get the list of effects.
  let firstEffect;
  if (finishedWork.effectTag > PerformedWork) {
    // A fiber's effect list consists only of its children, not itself. So if
    // the root has an effect, we need to add it to the end of the list. The
    // resulting list is the set that would belong to the root's parent, if it
    // had one; that is, all the effects in the tree including the root.
    if (finishedWork.lastEffect !== null) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    // There is no effect on the root.
    firstEffect = finishedWork.firstEffect;
  }

  if (firstEffect !== null) {
    const prevExecutionContext = executionContext;
    executionContext |= CommitContext;
    const prevInteractions = pushInteractions(root);

    // Reset this to null before calling lifecycles
    ReactCurrentOwner.current = null;

    // The commit phase is broken into several sub-phases. We do a separate pass
    // of the effect list for each phase: all mutation effects come before all
    // layout effects, and so on.

    // The first phase a "before mutation" phase. We use this phase to read the
    // state of the host tree right before we mutate it. This is where
    // getSnapshotBeforeUpdate is called.
    focusedInstanceHandle = prepareForCommit(root.containerInfo);
    shouldFireAfterActiveInstanceBlur = false;

    nextEffect = firstEffect;
    do {
      if (__DEV__) {
        invokeGuardedCallback(null, commitBeforeMutationEffects, null);
        if (hasCaughtError()) {
          invariant(nextEffect !== null, "Should be working on an effect.");
          const error = clearCaughtError();
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      } else {
        try {
          commitBeforeMutationEffects();
        } catch (error) {
          console.error(error);
          invariant(nextEffect !== null, "Should be working on an effect.");
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      }
    } while (nextEffect !== null);

    // We no longer need to track the active instance fiber
    focusedInstanceHandle = null;

    if (enableProfilerTimer) {
      // Mark the current commit time to be shared by all Profilers in this
      // batch. This enables them to be grouped later.
      recordCommitTime();
    }

    // The next phase is the mutation phase, where we mutate the host tree.
    nextEffect = firstEffect;
    do {
      if (__DEV__) {
        invokeGuardedCallback(
          null,
          commitMutationEffects,
          null,
          root,
          renderPriorityLevel
        );
        if (hasCaughtError()) {
          invariant(nextEffect !== null, "Should be working on an effect.");
          const error = clearCaughtError();
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      } else {
        try {
          commitMutationEffects(root, renderPriorityLevel);
        } catch (error) {
          console.error(error);
          invariant(nextEffect !== null, "Should be working on an effect.");
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      }
    } while (nextEffect !== null);

    if (shouldFireAfterActiveInstanceBlur) {
      afterActiveInstanceBlur();
    }
    resetAfterCommit(root.containerInfo);

    // The work-in-progress tree is now the current tree. This must come after
    // the mutation phase, so that the previous tree is still current during
    // componentWillUnmount, but before the layout phase, so that the finished
    // work is current during componentDidMount/Update.
    root.current = finishedWork;

    // The next phase is the layout phase, where we call effects that read
    // the host tree after it's been mutated. The idiomatic use case for this is
    // layout, but class component lifecycles also fire here for legacy reasons.
    nextEffect = firstEffect;
    consoleDeep("nextEffect", nextEffect);
    do {
      if (__DEV__) {
        invokeGuardedCallback(null, commitLayoutEffects, null, root, lanes);
        if (hasCaughtError()) {
          invariant(nextEffect !== null, "Should be working on an effect.");
          const error = clearCaughtError();
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      } else {
        try {
          commitLayoutEffects(root, lanes);
        } catch (error) {
          console.error(error);
          invariant(nextEffect !== null, "Should be working on an effect.");
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      }
    } while (nextEffect !== null);

    nextEffect = null;

    // Tell Scheduler to yield at the end of the frame, so the browser has an
    // opportunity to paint.
    // requestPaint();

    if (enableSchedulerTracing) {
      popInteractions(prevInteractions);
    }
    executionContext = prevExecutionContext;
  } else {
    // No effects.
    root.current = finishedWork;
    // Measure these anyway so the flamegraph explicitly shows that there were
    // no effects.
    // TODO: Maybe there's a better way to report this.
    if (enableProfilerTimer) {
      recordCommitTime();
    }
  }
}

function returnNextLanesPriority() {
  return return_highestLanePriority;
}

const appendAllChildrenToContainer = function (
  containerChildSet,
  workInProgress,
  needsVisibilityToggle,
  isHidden
) {
  // We only have the top Fiber that was created but we need recurse down its
  // children to find all the terminal nodes.
  let node = workInProgress.child;
  while (node !== null) {
    // eslint-disable-next-line no-labels
    branches: if (node.tag === HostComponent) {
      let instance = node.stateNode;
      if (needsVisibilityToggle && isHidden) {
        // This child is inside a timed out tree. Hide it.
        const props = node.memoizedProps;
        const type = node.type;
        instance = cloneHiddenInstance(instance, type, props, node);
      }
      appendChildToContainerChildSet(containerChildSet, instance);
    } else if (node.tag === HostText) {
      let instance = node.stateNode;
      if (needsVisibilityToggle && isHidden) {
        // This child is inside a timed out tree. Hide it.
        const text = node.memoizedProps;
        instance = cloneHiddenTextInstance(instance, text, node);
      }
      appendChildToContainerChildSet(containerChildSet, instance);
    } else if (enableFundamentalAPI && node.tag === FundamentalComponent) {
      let instance = node.stateNode.instance;
      if (needsVisibilityToggle && isHidden) {
        // This child is inside a timed out tree. Hide it.
        const props = node.memoizedProps;
        const type = node.type;
        instance = cloneHiddenInstance(instance, type, props, node);
      }
      appendChildToContainerChildSet(containerChildSet, instance);
    } else if (node.tag === HostPortal) {
      // If we have a portal child, then we don't want to traverse
      // down its children. Instead, we'll get insertions from each child in
      // the portal directly.
    } else if (node.tag === SuspenseComponent) {
      if ((node.effectTag & Update) !== NoEffect) {
        // Need to toggle the visibility of the primary children.
        const newIsHidden = node.memoizedState !== null;
        if (newIsHidden) {
          const primaryChildParent = node.child;
          if (primaryChildParent !== null) {
            if (primaryChildParent.child !== null) {
              primaryChildParent.child.return = primaryChildParent;
              appendAllChildrenToContainer(
                containerChildSet,
                primaryChildParent,
                true,
                newIsHidden
              );
            }
            const fallbackChildParent = primaryChildParent.sibling;
            if (fallbackChildParent !== null) {
              fallbackChildParent.return = node;
              node = fallbackChildParent;
              continue;
            }
          }
        }
      }
      if (node.child !== null) {
        // Continue traversing like normal
        node.child.return = node;
        node = node.child;
        continue;
      }
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    // $FlowFixMe This is correct but Flow is confused by the labeled break.
    node = node;
    if (node === workInProgress) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
};

function assertValidProps() {}

function diffProperties(
  domElement,
  tag,
  lastRawProps,
  nextRawProps,
  rootContainerElement
) {
  const DANGEROUSLY_SET_INNER_HTML = "dangerouslySetInnerHTML";
  const SUPPRESS_CONTENT_EDITABLE_WARNING = "suppressContentEditableWarning";
  const SUPPRESS_HYDRATION_WARNING = "suppressHydrationWarning";
  const AUTOFOCUS = "autoFocus";
  const CHILDREN = "children";
  const STYLE = "style";
  const HTML = "__html";
  const DEPRECATED_flareListeners = "DEPRECATED_flareListeners";

  const registrationNameModules = {};

  if (__DEV__) {
    validatePropertiesInDevelopment(tag, nextRawProps);
  }

  let updatePayload = null;

  let lastProps;
  let nextProps;
  switch (tag) {
    case "input":
      lastProps = ReactDOMInputGetHostProps(domElement, lastRawProps);
      nextProps = ReactDOMInputGetHostProps(domElement, nextRawProps);
      updatePayload = [];
      break;
    case "option":
      lastProps = ReactDOMOptionGetHostProps(domElement, lastRawProps);
      nextProps = ReactDOMOptionGetHostProps(domElement, nextRawProps);
      updatePayload = [];
      break;
    case "select":
      lastProps = ReactDOMSelectGetHostProps(domElement, lastRawProps);
      nextProps = ReactDOMSelectGetHostProps(domElement, nextRawProps);
      updatePayload = [];
      break;
    case "textarea":
      lastProps = ReactDOMTextareaGetHostProps(domElement, lastRawProps);
      nextProps = ReactDOMTextareaGetHostProps(domElement, nextRawProps);
      updatePayload = [];
      break;
    default:
      lastProps = lastRawProps;
      nextProps = nextRawProps;
      if (
        typeof lastProps.onClick !== "function" &&
        typeof nextProps.onClick === "function"
      ) {
        // TODO: This cast may not be sound for SVG, MathML or custom elements.
        trapClickOnNonInteractiveElement(domElement);
      }
      break;
  }

  assertValidProps(tag, nextProps);

  let propKey;
  let styleName;
  let styleUpdates = null;
  for (propKey in lastProps) {
    if (
      nextProps.hasOwnProperty(propKey) ||
      !lastProps.hasOwnProperty(propKey) ||
      lastProps[propKey] == null
    ) {
      continue;
    }
    if (propKey === STYLE) {
      const lastStyle = lastProps[propKey];
      for (styleName in lastStyle) {
        if (lastStyle.hasOwnProperty(styleName)) {
          if (!styleUpdates) {
            styleUpdates = {};
          }
          styleUpdates[styleName] = "";
        }
      }
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML || propKey === CHILDREN) {
      // Noop. This is handled by the clear text mechanism.
    } else if (
      (enableDeprecatedFlareAPI && propKey === DEPRECATED_flareListeners) ||
      propKey === SUPPRESS_CONTENT_EDITABLE_WARNING ||
      propKey === SUPPRESS_HYDRATION_WARNING
    ) {
      // Noop
    } else if (propKey === AUTOFOCUS) {
      // Noop. It doesn't work on updates anyway.
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      // This is a special case. If any listener updates we need to ensure
      // that the "current" fiber pointer gets updated so we need a commit
      // to update this element.
      if (!updatePayload) {
        updatePayload = [];
      }
    } else {
      // For all other deleted properties we add it to the queue. We use
      // the whitelist in the commit phase instead.
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }
  for (propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (
      !nextProps.hasOwnProperty(propKey) ||
      nextProp === lastProp ||
      (nextProp == null && lastProp == null)
    ) {
      continue;
    }
    if (propKey === STYLE) {
      if (__DEV__) {
        if (nextProp) {
          // Freeze the next style object so that we can assume it won't be
          // mutated. We have already warned for this in the past.
          Object.freeze(nextProp);
        }
      }
      if (lastProp) {
        // Unset styles on `lastProp` but not on `nextProp`.
        for (styleName in lastProp) {
          if (
            lastProp.hasOwnProperty(styleName) &&
            (!nextProp || !nextProp.hasOwnProperty(styleName))
          ) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = "";
          }
        }
        // Update styles that changed since `lastProp`.
        for (styleName in nextProp) {
          if (
            nextProp.hasOwnProperty(styleName) &&
            lastProp[styleName] !== nextProp[styleName]
          ) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = nextProp[styleName];
          }
        }
      } else {
        // Relies on `updateStylesByID` not mutating `styleUpdates`.
        if (!styleUpdates) {
          if (!updatePayload) {
            updatePayload = [];
          }
          updatePayload.push(propKey, styleUpdates);
        }
        styleUpdates = nextProp;
      }
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      const nextHtml = nextProp ? nextProp[HTML] : undefined;
      const lastHtml = lastProp ? lastProp[HTML] : undefined;
      if (nextHtml != null) {
        if (lastHtml !== nextHtml) {
          (updatePayload = updatePayload || []).push(propKey, nextHtml);
        }
      } else {
        // TODO: It might be too late to clear this if we have children
        // inserted already.
      }
    } else if (propKey === CHILDREN) {
      if (typeof nextProp === "string" || typeof nextProp === "number") {
        (updatePayload = updatePayload || []).push(propKey, "" + nextProp);
      }
    } else if (
      (enableDeprecatedFlareAPI && propKey === DEPRECATED_flareListeners) ||
      propKey === SUPPRESS_CONTENT_EDITABLE_WARNING ||
      propKey === SUPPRESS_HYDRATION_WARNING
    ) {
      // Noop
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp != null) {
        // We eagerly listen to this even though we haven't committed yet.
        if (__DEV__ && typeof nextProp !== "function") {
          warnForInvalidEventListener(propKey, nextProp);
        }
        ensureListeningTo(rootContainerElement, propKey);
      }
      if (!updatePayload && lastProp !== nextProp) {
        // This is a special case. If any listener updates we need to ensure
        // that the "current" props pointer gets updated so we need a commit
        // to update this element.
        updatePayload = [];
      }
    } else if (
      typeof nextProp === "object" &&
      nextProp !== null &&
      nextProp.$$typeof === REACT_OPAQUE_ID_TYPE
    ) {
      // If we encounter useOpaqueReference's opaque object, this means we are hydrating.
      // In this case, call the opaque object's toString function which generates a new client
      // ID so client and server IDs match and throws to rerender.
      nextProp.toString();
    } else {
      // For any other property we always add it to the queue and then we
      // filter it out using the whitelist during the commit.
      (updatePayload = updatePayload || []).push(propKey, nextProp);
    }
  }
  if (styleUpdates) {
    if (__DEV__) {
      validateShorthandPropertyCollisionInDev(styleUpdates, nextProps[STYLE]);
    }
    (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
  }
  console.log(updatePayload);
  return updatePayload;
}

function prepareUpdate(
  domElement,
  type,
  oldProps,
  newProps,
  rootContainerInstance,
  hostContext
) {
  return diffProperties(
    domElement,
    type,
    oldProps,
    newProps,
    rootContainerInstance
  );
}

function markUpdate(workInProgress) {
  // Tag the fiber with an update effect. This turns a Placement into
  // a PlacementAndUpdate.
  workInProgress.effectTag |= Update;
}

function markRootFinished(root, remainingLanes) {
  root.pendingLanes = remainingLanes;

  // Let's try everything again
  root.suspendedLanes = 0;
  root.pingedLanes = 0;

  root.expiredLanes &= remainingLanes;
  root.mutableReadLanes &= remainingLanes;
}

function prepareForCommit(containerInfo) {
  eventsEnabled = ReactBrowserEventEmitterIsEnabled();
  selectionInformation = getSelectionInformation();
  let activeInstance = null;
  if (enableDeprecatedFlareAPI) {
    const focusedElem = selectionInformation.focusedElem;
    if (focusedElem !== null) {
      activeInstance = getClosestInstanceFromNode(focusedElem);
    }
  }
  ReactBrowserEventEmitterSetEnabled(false);
  return activeInstance;
}

let _enabled = true;
function ReactBrowserEventEmitterIsEnabled() {
  return _enabled;
}

function ReactBrowserEventEmitterSetEnabled(enabled) {
  _enabled = !!enabled;
}

function getSelectionInformation() {
  const focusedElem = getActiveElementDeep();
  return {
    focusedElem: focusedElem,
    selectionRange: hasSelectionCapabilities(focusedElem)
      ? getSelection(focusedElem)
      : null,
  };
}

function getActiveElementDeep() {
  let win = window;
  let element = getActiveElement();
  while (element instanceof win.HTMLIFrameElement) {
    if (isSameOriginFrame(element)) {
      win = element.contentWindow;
    } else {
      return element;
    }
    element = getActiveElement(win.document);
  }
  return element;
}

function getActiveElement(doc) {
  doc = doc || (typeof document !== "undefined" ? document : undefined);
  if (typeof doc === "undefined") {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

function isSameOriginFrame(iframe) {
  try {
    // Accessing the contentDocument of a HTMLIframeElement can cause the browser
    // to throw, e.g. if it has a cross-origin src attribute.
    // Safari will show an error in the console when the access results in "Blocked a frame with origin". e.g:
    // iframe.contentDocument.defaultView;
    // A safety way is to access one of the cross origin properties: Window or Location
    // Which might result in "SecurityError" DOM Exception and it is compatible to Safari.
    // https://html.spec.whatwg.org/multipage/browsers.html#integration-with-idl

    return typeof iframe.contentWindow.location.href === "string";
  } catch (err) {
    return false;
  }
}

function hasSelectionCapabilities(elem) {
  const nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return (
    nodeName &&
    ((nodeName === "input" &&
      (elem.type === "text" ||
        elem.type === "search" ||
        elem.type === "tel" ||
        elem.type === "url" ||
        elem.type === "password")) ||
      nodeName === "textarea" ||
      elem.contentEditable === "true")
  );
}

function getSelection(input) {
  let selection;

  if ("selectionStart" in input) {
    // Modern browser with input or textarea.
    selection = {
      start: input.selectionStart,
      end: input.selectionEnd,
    };
  } else {
    // Content editable or old IE textarea.
    selection = getOffsets(input);
  }

  return selection || { start: 0, end: 0 };
}

let focusedInstanceHandle = null;
let shouldFireAfterActiveInstanceBlur = false;
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    if (
      !shouldFireAfterActiveInstanceBlur &&
      focusedInstanceHandle !== null &&
      isFiberHiddenOrDeletedAndContains(nextEffect, focusedInstanceHandle)
    ) {
      shouldFireAfterActiveInstanceBlur = true;
      beforeActiveInstanceBlur();
    }
    const effectTag = nextEffect.effectTag;
    if ((effectTag & Snapshot) !== NoEffect) {
      const current = nextEffect.alternate;
      commitBeforeMutationEffectOnFiber(current, nextEffect);
    }
    if ((effectTag & Passive) !== NoEffect) {
      // If there are passive effects, schedule a callback to flush at
      // the earliest opportunity.
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true;
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects();
          return null;
        });
      }
    }
    nextEffect = nextEffect.nextEffect;
  }
}

function isFiberHiddenOrDeletedAndContains(parentFiber, childFiber) {
  return (
    isFiberDeletedAndContainsTargetFiber(parentFiber, childFiber) ||
    isFiberTimedOutSuspenseThatContainsTargetFiber(parentFiber, childFiber)
  );
}

function isFiberDeletedAndContainsTargetFiber(fiber, targetFiber) {
  return (
    (fiber.effectTag & Deletion) !== 0 && doesFiberContain(fiber, targetFiber)
  );
}

function doesFiberContain(parentFiber, childFiber) {
  let node = childFiber;
  const parentFiberAlternate = parentFiber.alternate;
  while (node !== null) {
    if (node === parentFiber || node === parentFiberAlternate) {
      return true;
    }
    node = node.return;
  }
  return false;
}

function isFiberTimedOutSuspenseThatContainsTargetFiber(fiber, targetFiber) {
  const child = fiber.child;
  return (
    isFiberSuspenseAndTimedOut(fiber) &&
    child !== null &&
    doesFiberContain(child, targetFiber)
  );
}

function isFiberSuspenseAndTimedOut(fiber) {
  const memoizedState = fiber.memoizedState;
  return (
    fiber.tag === SuspenseComponent &&
    memoizedState !== null &&
    memoizedState.dehydrated === null
  );
}

function doesFiberContain(parentFiber, childFiber) {
  let node = childFiber;
  const parentFiberAlternate = parentFiber.alternate;
  while (node !== null) {
    if (node === parentFiber || node === parentFiberAlternate) {
      return true;
    }
    node = node.return;
  }
  return false;
}

function beforeActiveInstanceBlur() {
  if (enableDeprecatedFlareAPI) {
    ReactBrowserEventEmitterSetEnabled(true);
    dispatchBeforeDetachedBlur(selectionInformation.focusedElem);
    ReactBrowserEventEmitterSetEnabled(false);
  }
}

//commitBeforeMutationEffectOnFiber
function commitBeforeMutationEffectOnFiber(current, finishedWork) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
    case Block: {
      return;
    }
    case ClassComponent: {
      if (finishedWork.effectTag & Snapshot) {
        if (current !== null) {
          const prevProps = current.memoizedProps;
          const prevState = current.memoizedState;
          const instance = finishedWork.stateNode;
          // We could update instance props and state here,
          // but instead we rely on them being set during last render.
          // TODO: revisit this when we implement resuming.
          if (__DEV__) {
            if (
              finishedWork.type === finishedWork.elementType &&
              !didWarnAboutReassigningProps
            ) {
              if (instance.props !== finishedWork.memoizedProps) {
                console.error(
                  "Expected %s props to match memoized props before " +
                    "getSnapshotBeforeUpdate. " +
                    "This might either be because of a bug in React, or because " +
                    "a component reassigns its own `this.props`. " +
                    "Please file an issue.",
                  getComponentName(finishedWork.type) || "instance"
                );
              }
              if (instance.state !== finishedWork.memoizedState) {
                console.error(
                  "Expected %s state to match memoized state before " +
                    "getSnapshotBeforeUpdate. " +
                    "This might either be because of a bug in React, or because " +
                    "a component reassigns its own `this.state`. " +
                    "Please file an issue.",
                  getComponentName(finishedWork.type) || "instance"
                );
              }
            }
          }
          const snapshot = instance.getSnapshotBeforeUpdate(
            finishedWork.elementType === finishedWork.type
              ? prevProps
              : resolveDefaultProps(finishedWork.type, prevProps),
            prevState
          );
          if (__DEV__) {
            const didWarnSet = didWarnAboutUndefinedSnapshotBeforeUpdate;
            if (snapshot === undefined && !didWarnSet.has(finishedWork.type)) {
              didWarnSet.add(finishedWork.type);
              console.error(
                "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) " +
                  "must be returned. You have returned undefined.",
                getComponentName(finishedWork.type)
              );
            }
          }
          instance.__reactInternalSnapshotBeforeUpdate = snapshot;
        }
      }
      return;
    }
    case HostRoot: {
      if (supportsMutation) {
        if (finishedWork.effectTag & Snapshot) {
          const root = finishedWork.stateNode;
          clearContainer(root.containerInfo);
        }
      }
      return;
    }
    case HostComponent:
    case HostText:
    case HostPortal:
    case IncompleteClassComponent:
      // Nothing to do for these component types
      return;
  }
  invariant(
    false,
    "This unit of work tag should not have side-effects. This error is " +
      "likely caused by a bug in React. Please file an issue."
  );
}

function clearContainer(container) {
  if (container.nodeType === ELEMENT_NODE) {
    container.textContent = "";
  } else if (container.nodeType === DOCUMENT_NODE) {
    const body = container.body;
    if (body != null) {
      body.textContent = "";
    }
  }
}

function commitMutationEffects(root, renderPriorityLevel) {
  // TODO: Should probably move the bulk of this function to commitWork.
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;

    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    if (effectTag & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
    }

    // The following switch statement is only concerned about placement,
    // updates, and deletions. To avoid needing to add a case for every possible
    // bitmap value, we remove the secondary effects from the effect tag and
    // switch on that value.
    const primaryEffectTag =
      effectTag & (Placement | Update | Deletion | Hydrating);
    switch (primaryEffectTag) {
      case Placement: {
        commitPlacement(nextEffect);
        // Clear the "placement" from effect tag so that we know that this is
        // inserted, before any life-cycles like componentDidMount gets called.
        // TODO: findDOMNode doesn't rely on this any more but isMounted does
        // and isMounted is deprecated anyway so we should be able to kill this.
        nextEffect.effectTag &= ~Placement;
        break;
      }
      case PlacementAndUpdate: {
        // Placement
        commitPlacement(nextEffect);
        // Clear the "placement" from effect tag so that we know that this is
        // inserted, before any life-cycles like componentDidMount gets called.
        nextEffect.effectTag &= ~Placement;

        // Update
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      case Hydrating: {
        nextEffect.effectTag &= ~Hydrating;
        break;
      }
      case HydratingAndUpdate: {
        nextEffect.effectTag &= ~Hydrating;

        // Update
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      case Update: {
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel);
        break;
      }
    }
    nextEffect = nextEffect.nextEffect;
  }
}

function commitWork(current, finishedWork) {
  if (!supportsMutation) {
    switch (finishedWork.tag) {
      case FunctionComponent:
      case ForwardRef:
      case MemoComponent:
      case SimpleMemoComponent:
      case Block: {
        // Layout effects are destroyed during the mutation phase so that all
        // destroy functions for all fibers are called before any create functions.
        // This prevents sibling component effects from interfering with each other,
        // e.g. a destroy function in one component should never override a ref set
        // by a create function in another component during the same commit.
        if (
          enableProfilerTimer &&
          enableProfilerCommitHooks &&
          finishedWork.mode & ProfileMode
        ) {
          try {
            startLayoutEffectTimer();
            commitHookEffectListUnmount(
              HookLayout | HookHasEffect,
              finishedWork
            );
          } finally {
            recordLayoutEffectDuration(finishedWork);
          }
        } else {
          commitHookEffectListUnmount(HookLayout | HookHasEffect, finishedWork);
        }
        return;
      }
      case Profiler: {
        return;
      }
      case SuspenseComponent: {
        commitSuspenseComponent(finishedWork);
        attachSuspenseRetryListeners(finishedWork);
        return;
      }
      case SuspenseListComponent: {
        attachSuspenseRetryListeners(finishedWork);
        return;
      }
      case HostRoot: {
        if (supportsHydration) {
          const root = finishedWork.stateNode;
          if (root.hydrate) {
            // We've just hydrated. No need to hydrate again.
            root.hydrate = false;
            commitHydratedContainer(root.containerInfo);
          }
        }
        break;
      }
      case OffscreenComponent:
      case LegacyHiddenComponent: {
        return;
      }
    }

    commitContainer(finishedWork);
    return;
  }
}

function commitResetTextContent(current) {
  if (!supportsMutation) {
    return;
  }
  resetTextContent(current.stateNode);
}

function resetTextContent(domElement) {
  setTextContent(domElement, "");
}

const setTextContent = function (node, text) {
  if (text) {
    const firstChild = node.firstChild;

    if (
      firstChild &&
      firstChild === node.lastChild &&
      firstChild.nodeType === TEXT_NODE
    ) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
};

function commitDetachRef(current) {
  const currentRef = current.ref;
  if (currentRef !== null) {
    if (typeof currentRef === "function") {
      currentRef(null);
    } else {
      currentRef.current = null;
    }
  }
}

function commitPlacement(finishedWork) {
  if (!supportsMutation) {
    return;
  }

  // Recursively insert all host nodes into the parent.
  const parentFiber = getHostParentFiber(finishedWork);

  // Note: these two variables *must* always be updated together.
  let parent;
  let isContainer;
  const parentStateNode = parentFiber.stateNode;
  switch (parentFiber.tag) {
    case HostComponent:
      parent = parentStateNode;
      isContainer = false;
      break;
    case HostRoot:
      parent = parentStateNode.containerInfo;
      isContainer = true;
      break;
    case HostPortal:
      parent = parentStateNode.containerInfo;
      isContainer = true;
      break;
    case FundamentalComponent:
      if (enableFundamentalAPI) {
        parent = parentStateNode.instance;
        isContainer = false;
      }
    // eslint-disable-next-line-no-fallthrough
    default:
      invariant(
        false,
        "Invalid host parent fiber. This error is likely caused by a bug " +
          "in React. Please file an issue."
      );
  }
  if (parentFiber.effectTag & ContentReset) {
    // Reset the text content of the parent before doing any insertions
    resetTextContent(parent);
    // Clear ContentReset from the effect tag
    parentFiber.effectTag &= ~ContentReset;
  }

  const before = getHostSibling(finishedWork);
  // We only have the top Fiber that was inserted but we need to recurse down its
  // children to find all the terminal nodes.
  if (isContainer) {
    consoleDeep("before", before);
    insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
  } else {
    insertOrAppendPlacementNode(finishedWork, before, parent);
  }
}

function getHostParentFiber(fiber) {
  let parent = fiber.return;
  while (parent !== null) {
    if (isHostParent(parent)) {
      return parent;
    }
    parent = parent.return;
  }
  invariant(
    false,
    "Expected to find a host parent. This error is likely caused by a bug " +
      "in React. Please file an issue."
  );
}

function isHostParent(fiber) {
  return (
    fiber.tag === HostComponent ||
    fiber.tag === HostRoot ||
    fiber.tag === HostPortal
  );
}

function getHostSibling(fiber) {
  // We're going to search forward into the tree until we find a sibling host
  // node. Unfortunately, if multiple insertions are done in a row we have to
  // search past them. This leads to exponential search for the next sibling.
  // TODO: Find a more efficient way to do this.
  let node = fiber;
  siblings: while (true) {
    // If we didn't find anything, let's try the next sibling.
    while (node.sibling === null) {
      if (node.return === null || isHostParent(node.return)) {
        // If we pop out of the root or hit the parent the fiber we are the
        // last sibling.
        return null;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
    while (
      node.tag !== HostComponent &&
      node.tag !== HostText &&
      node.tag !== DehydratedFragment
    ) {
      // If it is not host node and, we might have a host node inside it.
      // Try to search down until we find one.
      if (node.effectTag & Placement) {
        // If we don't have a child, try the siblings instead.
        continue siblings;
      }
      // If we don't have a child, try the siblings instead.
      // We also skip portals because they are not part of this host tree.
      if (node.child === null || node.tag === HostPortal) {
        continue siblings;
      } else {
        node.child.return = node;
        node = node.child;
      }
    }
    // Check if this host node is stable or about to be placed.
    if (!(node.effectTag & Placement)) {
      // Found it!
      return node.stateNode;
    }
  }
}

function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
  const { tag } = node;
  const isHost = tag === HostComponent || tag === HostText;
  if (isHost || (enableFundamentalAPI && tag === FundamentalComponent)) {
    const stateNode = isHost ? node.stateNode : node.stateNode.instance;
    if (before) {
      insertInContainerBefore(parent, stateNode, before);
    } else {
      appendChildToContainer(parent, stateNode);
    }
  } else if (tag === HostPortal) {
    // If the insertion itself is a portal, then we don't want to traverse
    // down its children. Instead, we'll get insertions from each child in
    // the portal directly.
  } else {
    const child = node.child;
    if (child !== null) {
      insertOrAppendPlacementNodeIntoContainer(child, before, parent);
      let sibling = child.sibling;
      while (sibling !== null) {
        insertOrAppendPlacementNodeIntoContainer(sibling, before, parent);
        sibling = sibling.sibling;
      }
    }
  }
}

function insertOrAppendPlacementNode(node, before, parent) {
  const { tag } = node;
  const isHost = tag === HostComponent || tag === HostText;
  if (isHost || (enableFundamentalAPI && tag === FundamentalComponent)) {
    const stateNode = isHost ? node.stateNode : node.stateNode.instance;
    if (before) {
      insertBefore(parent, stateNode, before);
    } else {
      appendChild(parent, stateNode);
    }
  } else if (tag === HostPortal) {
    // If the insertion itself is a portal, then we don't want to traverse
    // down its children. Instead, we'll get insertions from each child in
    // the portal directly.
  } else {
    const child = node.child;
    if (child !== null) {
      insertOrAppendPlacementNode(child, before, parent);
      let sibling = child.sibling;
      while (sibling !== null) {
        insertOrAppendPlacementNode(sibling, before, parent);
        sibling = sibling.sibling;
      }
    }
  }
}

function insertInContainerBefore(container, child, beforeChild) {
  if (container.nodeType === COMMENT_NODE) {
    container.parentNode.insertBefore(child, beforeChild);
  } else {
    container.insertBefore(child, beforeChild);
  }
}

function appendChildToContainer(container, child) {
  let parentNode;
  if (container.nodeType === COMMENT_NODE) {
    parentNode = container.parentNode;
    parentNode.insertBefore(child, container);
  } else {
    parentNode = container;
    parentNode.appendChild(child);
  }
  // This container might be used for a portal.
  // If something inside a portal is clicked, that click should bubble
  // through the React tree. However, on Mobile Safari the click would
  // never bubble through the *DOM* tree unless an ancestor with onclick
  // event exists. So we wouldn't see it and dispatch it.
  // This is why we ensure that non React root containers have inline onclick
  // defined.
  // https://github.com/facebook/react/issues/11918
  const reactRootContainer = container._reactRootContainer;
  if (
    (reactRootContainer === null || reactRootContainer === undefined) &&
    parentNode.onclick === null
  ) {
    // TODO: This cast may not be sound for SVG, MathML or custom elements.
    trapClickOnNonInteractiveElement(parentNode);
  }
}

function trapClickOnNonInteractiveElement(node) {
  // Mobile Safari does not fire properly bubble click events on
  // non-interactive elements, which means delegated click listeners do not
  // fire. The workaround for this bug involves attaching an empty click
  // listener on the target node.
  // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
  // Just set it using the onclick property so that we don't have to manage any
  // bookkeeping for it. Not sure if we need to clear it when the listener is
  // removed.
  // TODO: Only do this for the relevant Safaris maybe?
  node.onclick = noop;
}

function resetAfterCommit(containerInfo) {
  restoreSelection(selectionInformation);
  ReactBrowserEventEmitterSetEnabled(eventsEnabled);
  eventsEnabled = null;
  selectionInformation = null;
}

function restoreSelection(priorSelectionInformation) {
  const curFocusedElem = getActiveElementDeep();
  const priorFocusedElem = priorSelectionInformation.focusedElem;
  const priorSelectionRange = priorSelectionInformation.selectionRange;
  if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
    if (
      priorSelectionRange !== null &&
      hasSelectionCapabilities(priorFocusedElem)
    ) {
      setSelection(priorFocusedElem, priorSelectionRange);
    }

    // Focusing a node can change the scroll position, which is undesirable
    const ancestors = [];
    let ancestor = priorFocusedElem;
    while ((ancestor = ancestor.parentNode)) {
      if (ancestor.nodeType === ELEMENT_NODE) {
        ancestors.push({
          element: ancestor,
          left: ancestor.scrollLeft,
          top: ancestor.scrollTop,
        });
      }
    }

    if (typeof priorFocusedElem.focus === "function") {
      priorFocusedElem.focus();
    }

    for (let i = 0; i < ancestors.length; i++) {
      const info = ancestors[i];
      info.element.scrollLeft = info.left;
      info.element.scrollTop = info.top;
    }
  }
}

function commitLayoutEffects(root, committedLanes) {
  // TODO: Should probably move the bulk of this function to commitWork.
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;

    if (effectTag & (Update | Callback)) {
      const current = nextEffect.alternate;
      commitLayoutEffectOnFiber(root, current, nextEffect, committedLanes);
    }

    if (effectTag & Ref) {
      commitAttachRef(nextEffect);
    }

    nextEffect = nextEffect.nextEffect;
  }
}

function commitLayoutEffectOnFiber(
  finishedRoot,
  current,
  finishedWork,
  committedLanes
) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
    case Block: {
      // At this point layout effects have already been destroyed (during mutation phase).
      // This is done to prevent sibling component effects from interfering with each other,
      // e.g. a destroy function in one component should never override a ref set
      // by a create function in another component during the same commit.
      if (
        enableProfilerTimer &&
        enableProfilerCommitHooks &&
        finishedWork.mode & ProfileMode
      ) {
        try {
          startLayoutEffectTimer();
          commitHookEffectListMount(HookLayout | HookHasEffect, finishedWork);
        } finally {
          recordLayoutEffectDuration(finishedWork);
        }
      } else {
        commitHookEffectListMount(HookLayout | HookHasEffect, finishedWork);
      }

      if (runAllPassiveEffectDestroysBeforeCreates) {
        schedulePassiveEffects(finishedWork);
      }
      return;
    }
    case ClassComponent: {
      const instance = finishedWork.stateNode;
      if (finishedWork.effectTag & Update) {
        if (current === null) {
          // We could update instance props and state here,
          // but instead we rely on them being set during last render.
          // TODO: revisit this when we implement resuming.
          if (__DEV__) {
            if (
              finishedWork.type === finishedWork.elementType &&
              !didWarnAboutReassigningProps
            ) {
              if (instance.props !== finishedWork.memoizedProps) {
                console.error(
                  "Expected %s props to match memoized props before " +
                    "componentDidMount. " +
                    "This might either be because of a bug in React, or because " +
                    "a component reassigns its own `this.props`. " +
                    "Please file an issue.",
                  getComponentName(finishedWork.type) || "instance"
                );
              }
              if (instance.state !== finishedWork.memoizedState) {
                console.error(
                  "Expected %s state to match memoized state before " +
                    "componentDidMount. " +
                    "This might either be because of a bug in React, or because " +
                    "a component reassigns its own `this.state`. " +
                    "Please file an issue.",
                  getComponentName(finishedWork.type) || "instance"
                );
              }
            }
          }
          if (
            enableProfilerTimer &&
            enableProfilerCommitHooks &&
            finishedWork.mode & ProfileMode
          ) {
            try {
              startLayoutEffectTimer();
              instance.componentDidMount();
            } finally {
              recordLayoutEffectDuration(finishedWork);
            }
          } else {
            instance.componentDidMount();
          }
        } else {
          const prevProps =
            finishedWork.elementType === finishedWork.type
              ? current.memoizedProps
              : resolveDefaultProps(finishedWork.type, current.memoizedProps);
          const prevState = current.memoizedState;
          // We could update instance props and state here,
          // but instead we rely on them being set during last render.
          // TODO: revisit this when we implement resuming.
          if (__DEV__) {
            if (
              finishedWork.type === finishedWork.elementType &&
              !didWarnAboutReassigningProps
            ) {
              if (instance.props !== finishedWork.memoizedProps) {
                console.error(
                  "Expected %s props to match memoized props before " +
                    "componentDidUpdate. " +
                    "This might either be because of a bug in React, or because " +
                    "a component reassigns its own `this.props`. " +
                    "Please file an issue.",
                  getComponentName(finishedWork.type) || "instance"
                );
              }
              if (instance.state !== finishedWork.memoizedState) {
                console.error(
                  "Expected %s state to match memoized state before " +
                    "componentDidUpdate. " +
                    "This might either be because of a bug in React, or because " +
                    "a component reassigns its own `this.state`. " +
                    "Please file an issue.",
                  getComponentName(finishedWork.type) || "instance"
                );
              }
            }
          }
          if (
            enableProfilerTimer &&
            enableProfilerCommitHooks &&
            finishedWork.mode & ProfileMode
          ) {
            try {
              startLayoutEffectTimer();
              instance.componentDidUpdate(
                prevProps,
                prevState,
                instance.__reactInternalSnapshotBeforeUpdate
              );
            } finally {
              recordLayoutEffectDuration(finishedWork);
            }
          } else {
            instance.componentDidUpdate(
              prevProps,
              prevState,
              instance.__reactInternalSnapshotBeforeUpdate
            );
          }
        }
      }

      // TODO: I think this is now always non-null by the time it reaches the
      // commit phase. Consider removing the type check.
      const updateQueue = finishedWork.updateQueue;
      if (updateQueue !== null) {
        if (__DEV__) {
          if (
            finishedWork.type === finishedWork.elementType &&
            !didWarnAboutReassigningProps
          ) {
            if (instance.props !== finishedWork.memoizedProps) {
              console.error(
                "Expected %s props to match memoized props before " +
                  "processing the update queue. " +
                  "This might either be because of a bug in React, or because " +
                  "a component reassigns its own `this.props`. " +
                  "Please file an issue.",
                getComponentName(finishedWork.type) || "instance"
              );
            }
            if (instance.state !== finishedWork.memoizedState) {
              console.error(
                "Expected %s state to match memoized state before " +
                  "processing the update queue. " +
                  "This might either be because of a bug in React, or because " +
                  "a component reassigns its own `this.state`. " +
                  "Please file an issue.",
                getComponentName(finishedWork.type) || "instance"
              );
            }
          }
        }
        // We could update instance props and state here,
        // but instead we rely on them being set during last render.
        // TODO: revisit this when we implement resuming.
        commitUpdateQueue(finishedWork, updateQueue, instance);
      }
      return;
    }
    case HostRoot: {
      // TODO: I think this is now always non-null by the time it reaches the
      // commit phase. Consider removing the type check.
      const updateQueue = finishedWork.updateQueue;
      if (updateQueue !== null) {
        let instance = null;
        if (finishedWork.child !== null) {
          switch (finishedWork.child.tag) {
            case HostComponent:
              instance = getPublicInstance(finishedWork.child.stateNode);
              break;
            case ClassComponent:
              instance = finishedWork.child.stateNode;
              break;
          }
        }
        commitUpdateQueue(finishedWork, updateQueue, instance);
      }
      return;
    }
    case HostComponent: {
      const instance = finishedWork.stateNode;

      // Renderers may schedule work to be done after host components are mounted
      // (eg DOM renderer may schedule auto-focus for inputs and form controls).
      // These effects should only be committed when components are first mounted,
      // aka when there is no current/alternate.
      if (current === null && finishedWork.effectTag & Update) {
        const type = finishedWork.type;
        const props = finishedWork.memoizedProps;
        commitMount(instance, type, props, finishedWork);
      }

      return;
    }
    case HostText: {
      // We have no life-cycles associated with text.
      return;
    }
    case HostPortal: {
      // We have no life-cycles associated with portals.
      return;
    }
    case Profiler: {
      if (enableProfilerTimer) {
        const { onCommit, onRender } = finishedWork.memoizedProps;
        const { effectDuration } = finishedWork.stateNode;

        const commitTime = getCommitTime();

        if (typeof onRender === "function") {
          if (enableSchedulerTracing) {
            onRender(
              finishedWork.memoizedProps.id,
              current === null ? "mount" : "update",
              finishedWork.actualDuration,
              finishedWork.treeBaseDuration,
              finishedWork.actualStartTime,
              commitTime,
              finishedRoot.memoizedInteractions
            );
          } else {
            onRender(
              finishedWork.memoizedProps.id,
              current === null ? "mount" : "update",
              finishedWork.actualDuration,
              finishedWork.treeBaseDuration,
              finishedWork.actualStartTime,
              commitTime
            );
          }
        }

        if (enableProfilerCommitHooks) {
          if (typeof onCommit === "function") {
            if (enableSchedulerTracing) {
              onCommit(
                finishedWork.memoizedProps.id,
                current === null ? "mount" : "update",
                effectDuration,
                commitTime,
                finishedRoot.memoizedInteractions
              );
            } else {
              onCommit(
                finishedWork.memoizedProps.id,
                current === null ? "mount" : "update",
                effectDuration,
                commitTime
              );
            }
          }

          // Schedule a passive effect for this Profiler to call onPostCommit hooks.
          // This effect should be scheduled even if there is no onPostCommit callback for this Profiler,
          // because the effect is also where times bubble to parent Profilers.
          enqueuePendingPassiveProfilerEffect(finishedWork);

          // Propagate layout effect durations to the next nearest Profiler ancestor.
          // Do not reset these values until the next render so DevTools has a chance to read them first.
          let parentFiber = finishedWork.return;
          while (parentFiber !== null) {
            if (parentFiber.tag === Profiler) {
              const parentStateNode = parentFiber.stateNode;
              parentStateNode.effectDuration += effectDuration;
              break;
            }
            parentFiber = parentFiber.return;
          }
        }
      }
      return;
    }
    case SuspenseComponent: {
      commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
      return;
    }
    case SuspenseListComponent:
    case IncompleteClassComponent:
    case FundamentalComponent:
    case ScopeComponent:
    case OffscreenComponent:
    case LegacyHiddenComponent:
      return;
  }
  invariant(
    false,
    "This unit of work tag should not have side-effects. This error is " +
      "likely caused by a bug in React. Please file an issue."
  );
}

function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  function callCallback(callback, context) {
    callback.call(context);
  }

  // Commit the effects
  const effects = finishedQueue.effects;
  finishedQueue.effects = null;
  if (effects !== null) {
    for (let i = 0; i < effects.length; i++) {
      const effect = effects[i];
      const callback = effect.callback;
      if (callback !== null) {
        effect.callback = null;
        callCallback(callback, instance);
      }
    }
  }
}

function commitAttachRef(finishedWork) {
  const ref = finishedWork.ref;
  if (ref !== null) {
    const instance = finishedWork.stateNode;
    let instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }
    // Moved outside to ensure DCE works with this flag
    if (typeof ref === "function") {
      ref(instanceToUse);
    } else {
      if (__DEV__) {
        if (!ref.hasOwnProperty("current")) {
          console.error(
            "Unexpected ref object provided for %s. " +
              "Use either a ref-setter function or React.createRef().",
            getComponentName(finishedWork.type)
          );
        }
      }

      ref.current = instanceToUse;
    }
  }
}

function getPublicInstance(instance) {
  return instance;
}

function ensureRootIsScheduled(root) {
  const existingCallbackNode = root.callbackNode;

  const newCallbackId = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes
  );
  // This returns the priority level computed during the `getNextLanes` call.
  const newCallbackPriorityLevel = returnNextLanesPriority();

  if (newCallbackId === NoLanes) {
    // Special case: There's nothing to work on.
    if (existingCallbackNode !== null) {
      cancelCallback(existingCallbackNode);
      root.expiresAt = -1;
      root.callbackNode = null;
      root.callbackIsSync = false;
      root.callbackId = NoLanes;
    }
    return;
  }

  const newTaskIsSync = newCallbackPriorityLevel === SyncLanePriority;

  // Check if there's an existing task. We may be able to reuse it.
  const existingTaskId = root.callbackId;
  const existingCallbackIsSync = root.callbackIsSync;
  if (existingTaskId !== NoLanes) {
    if (newCallbackId === existingTaskId) {
      // This task is already scheduled. Let's check its priority.
      if (
        (newTaskIsSync && existingCallbackIsSync) ||
        (!newTaskIsSync && !existingCallbackIsSync)
      ) {
        // The priority hasn't changed. Exit.
        return;
      }
      // The task ID is the same but the priority changed. Cancel the existing
      // callback. We'll schedule a new one below.
    }
    cancelCallback(existingCallbackNode);
  }

  // Schedule a new callback.
  let newCallbackNode;
  if (newTaskIsSync) {
    // Special case: Sync React callbacks are scheduled on a special
    // internal queue
    newCallbackNode = scheduleSyncCallback(
      performSyncWorkOnRoot.bind(null, root)
    );
  } else {
    const schedulerPriorityLevel = lanePriorityToSchedulerPriority(
      newCallbackPriorityLevel
    );
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root)
    );
  }

  root.callbackId = newCallbackId;
  root.callbackNode = newCallbackNode;
  root.callbackIsSync = newTaskIsSync;
}

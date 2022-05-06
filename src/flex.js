export const defaultFlex = {
  direction: 'row',
  justify: 'center',
  align: 'center',
  wrap: 'nowrap',
  flex: 1,
  max: 0,
  min: 0,
  children: [],
};

const rootColor = randomColor();

export const initialFlex = {
  selected: { ...defaultFlex, color: rootColor },
  selectedPath: [],
  root: { ...defaultFlex, color: rootColor },
};

export const actions = {
  ADD_CHILD: 'ADD_CHILD',
  SET_PROP: 'SET_PROP',
  SELECT: 'SELECT',
  REMOVE: 'REMOVE',
  CLONE: 'CLONE',
};

function mutate(flex, [child, ...rest] , value) {
  const update = { ...flex };

  if (rest.length) {
    update.children = update.children.map((c, i) => {
      if (i === child) {
        return mutate(c, rest, value);
      } else {
        return c;
      }
    });
  } else if (value === null) {
    update.children = update.children.filter((_, i) => i !== child);
  } else {
    update.children[child] = value;
  }

  return update;
}

function addChild(state) {
  const { selected, selectedPath, root } = state;

  const updated = {
    ...selected,
    children: [
      ...selected.children,
      { ...defaultFlex, color: randomColor() },
    ],
  };

  const updatedRoot = selectedPath.length
    ? mutate(root, selectedPath, updated)
    : updated;

  return {
    selected: updated,
    selectedPath,
    root: updatedRoot,
  };
}

function setProp(state, prop, value) {
  const { selected, selectedPath, root } = state;

  const updated = {
    ...selected,
    [prop]: value,
  };

  const updatedRoot = mutate(root, selectedPath, updated);

  return {
    selected: updated,
    selectedPath,
    root: updatedRoot,
  };
}

function select(state, path) {
  const { root } = state;

  let atPath = root;

  for (const child of path) {
    atPath = atPath.children[child];
  }

  return {
    selected: atPath,
    selectedPath: path,
    root,
  }
}

function remove(state) {
  const { selectedPath, root } = state;

  if (selectedPath.length === 0) {
    return state;
  }

  const updatedRoot = mutate(root, selectedPath, null);

  return {
    selected: updatedRoot,
    selectedPath: [],
    root: updatedRoot,
  }
}

function clone(state) {
  const { selected, selectedPath, root } = state;
  const path = selectedPath.slice(0, selectedPath.length - 1);

  const duplicate = { ...selected, color: randomColor() };

  let atPath = root;

  for (const child of path) {
    atPath = atPath.children[child];
  }

  const updated = {
    ...atPath,
    children: [
      ...atPath.children,
      duplicate,
    ],
  }; 

  const updatedRoot = selectedPath.length
    ? mutate(root, path, updated)
    : updated;

  return {
    selected,
    selectedPath,
    root: updatedRoot,
  };
}

export function flexReducer(state, action) {
  console.log(action);

  switch (action.type) {
    case actions.ADD_CHILD: return addChild(state);
    case actions.SET_PROP: return setProp(state, action.prop, action.value);
    case actions.SELECT: return select(state, action.path);
    case actions.REMOVE: return remove(state);
    case actions.CLONE: return clone(state);
    default: return state;
  }
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  if (r > 200 && g > 200 && b > 200) {
    return randomColor();
  }

  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
}

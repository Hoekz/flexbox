import { useReducer } from 'react';
import { flexReducer, initialFlex, actions } from './flex';
import { Editor } from './Editor';
import { FlexBox } from './FlexBox';
import './App.css';

function App() {
  const [{ selected, selectedPath, root }, update] = useReducer(flexReducer, initialFlex);

  return (
    <div className="app">
      <Editor
        path={selectedPath}
        box={selected}
        addChild={() => update({ type: actions.ADD_CHILD })}
        setProp={(prop, value) => update({ type: actions.SET_PROP, prop, value })}
        select={(path) => update({ type: actions.SELECT, path })}
        remove={() => update({ type: actions.REMOVE })}
        clone={() => update({ type: actions.CLONE })}
      />
      <FlexBox {...root} select={(path) => update({ type: actions.SELECT, path })} />
    </div>
  );
}

export default App;

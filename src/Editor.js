import { useEffect, useState } from 'react';

const flexes = Array(20).fill(0).map((_, i) => i);
const directions = ['row', 'column', 'row-reverse', 'column-reverse'];
const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
const justifies = ['start', 'center', 'space-between', 'space-around', 'space-evenly'];
const aligns = ['stretch', 'flex-start', 'flex-end', 'center'];

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>{
      options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))
    }</select>
  )
}

export function Editor({ path, box, addChild, setProp, select, clone, remove }) {
  const [pathStr, setPathStr] = useState(path.join('.'));
  useEffect(() => setPathStr(path.join('.')), [path]);

  const unchangedPath = pathStr === path.join('.');
  const selectByPath = () => select(pathStr.split('.').map(n => parseInt(n)));

  return (
    <div className="editor" style={{ backgroundColor: box.color }}>
      <input placeholder="root" value={pathStr} onChange={(e) => setPathStr(e.target.value)} className="path" />
      <button disabled={unchangedPath} onClick={selectByPath}>Find by Path</button>
      <button onClick={remove}>Delete</button>
      <button onClick={clone}>Clone</button>
      <button onClick={addChild}>Add Child</button>
      <div className="properties">
        <Select options={flexes} value={box.flex} onChange={(value) => setProp('flex', value)} />
        <Select options={directions} value={box.direction} onChange={(value) => setProp('direction', value)} />
        <Select options={wraps} value={box.wrap} onChange={(value) => setProp('wrap', value)} />
        <Select options={justifies} value={box.justify} onChange={(value) => setProp('justify', value)} />
        <Select options={aligns} value={box.align} onChange={(value) => setProp('align', value)} />
        <label>Min</label>
        <input value={box.min} onChange={(e) => setProp('min', e.target.value)} />
        <label>Max</label>
        <input value={box.max} onChange={(e) => setProp('max', e.target.value)} />
      </div>
    </div>
  );
}

export function FlexBox({ color, direction, wrap, justify, align, flex, max, min, children, parentDirection, select }) {
  const style = {
    backgroundColor: color,
    borderColor: color,
    flex,
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems: align,
    ...(max ? { [parentDirection === 'row' ? 'maxWidth' : 'maxHeight']: `${max}px` } : {}),
    ...(min ? { [parentDirection === 'row' ? 'minWidth' : 'minHeight']: `${min}px` } : {}),
  };

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    select([]);
  };

  if (!children?.length) {
    return (
      <button className="flex-box" style={style} onClick={onClick}>{flex}</button>
    )
  }

  return (
    <button className="flex-box" style={style} onClick={onClick}>{
      children.map((child, index) => (
        <FlexBox {...child} parentDirection={direction} key={index} select={(path) => select([index, ...path])} />
      ))
    }</button>
  )
}

import { CSSTransition } from 'react-transition-group';
import React, { useState } from 'react';


function DropdownItem(props) {
  return (
    <a href='#' className="menu-item" onClick={props.onClick}>
      <span className="icon-button">{props.leftIcon}</span>
      {props.children}
      <span className="icon-right">{props.rightIcon}</span>
    </a>
  );
}

export function DropdownMenu({ items, depth = 0, trail = [], setTrail, parent }) {
  
  console.log(trail)

  // const [activeMenu, setActiveMenu] = useState(0);

  return (
    <div key={JSON.stringify(items)} className={`dropdown ${!trail.length && depth === 0 || trail.at(-1) === parent ? 'visible' : ''}`}>
      <button onClick={() => {
        setTrail([...trail.slice(0, depth - 1)])
      }}>Back</button>
      {
        items.map(item => (
          <div key={JSON.stringify(item)}>
          <DropdownItem key={item.title} onClick={() => {
            setTrail([...trail.slice(0, depth + 1), item])
          }}>
            {item.title}
          </DropdownItem>

          {item.children?.length ? (<DropdownMenu parent={item} trail={trail} setTrail={setTrail} key={JSON.stringify(item.children)} items={item.children} depth={depth + 1}></DropdownMenu>) : null}
          </div>
        ))
      }
    </div>
  )
}
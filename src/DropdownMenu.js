import { CSSTransition } from 'react-transition-group';
import React, { useState } from 'react';
import { useRef } from 'react';



// Todos
// move props.children inside dropdown menu out of the anchor 


export function DropdownMenu({ items, depth = 0, trail = [], setTrail, parent }) {
  const [direction, setDirection] = useState(false)

  function Reverse() {
    setDirection(false)
  }
  function foward(depth) {
    setDirection(true)
  }
  let classAnimation = direction ? 'exit' : 'enter'

  function DropdownItem(props) {
    return (
      <a href={props.href} className={`menu-item ${classAnimation}`} onClick={props.onClick}>
        <span className="icon-button"> {props.leftIcon} </span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  
  return (
    <div key={JSON.stringify(items)} className={`dropdown ${!trail.length && depth === 0 || trail.at(-1) === parent ? 'visible' : 'hide'}`}>
      {depth !== 0 && 
        <button onClick={() => {
          Reverse()
          setTrail([...trail.slice(0, depth - 1)])
        }}>Back</button>
      }
      {
        items.map(item => { 
          return (
          <div key={JSON.stringify(item)}>
          <DropdownItem href={item.url}  leftIcon={item.icon} rightIcon={item.children?.length ? '>' : ''} key={item.title} 
          onClick={() =>  { 
            foward() 
            item.children?.length && setTrail([...trail.slice(0, depth + 1), item])  
          }}>
            {item.title}
          </DropdownItem>
          {item.children?.length ? (<DropdownMenu parent={item} trail={trail} setTrail={setTrail} key={JSON.stringify(item.children)} items={item.children} depth={depth + 1}></DropdownMenu>) : null}
          </div>
        )})
      }
    </div>
  )
}
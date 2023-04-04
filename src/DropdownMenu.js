import { CSSTransition } from 'react-transition-group';
import React, { useState } from 'react';





export function DropdownMenu({ items, depth = 0, trail = [], setTrail, parent }) {
  const [transition, setTransition] = useState(false)

  function animation() {
    setTimeout(() => {
      console.log('HI')
      setTransition(true)
    }, 500);
    setTransition(false)
  }

  function DropdownItem(props) {
    return (
      <a href={props.href} className={`menu-item ${transition ? 'exit' : ''}`} onClick={props.onClick}>
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
          setTrail([...trail.slice(0, depth - 1)])
        }}>Back</button>
      }
      {
        items.map(item => (
          <div key={JSON.stringify(item)}>
          <DropdownItem href={item.url}  leftIcon={item.icon} rightIcon={item.children?.length ? '>' : ''} key={item.title} 
          onClick={() => { item.children?.length && setTrail([...trail.slice(0, depth + 1), item])
          animation()
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
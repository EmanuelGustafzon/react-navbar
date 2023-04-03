import React, { useState } from 'react';
import './App.css';
import { CSSTransition } from 'react-transition-group';


const menu = [{
  title: 'my profile',
  icon: '🥸',
},
{
  title: 'Emanuel',
  icon: '🥸',
  children: [
    {
    title: 'settings',
    icon: '⚙️',
    },
    {
    title: 'wifi',
    children: [
      {
        title: 'flashlight'
      }
    ]
    }]
}]


function App() {
  return (
    <Navbar>
      {<NavItem icon='↔️'>
        <DropdownMenu items={menu}></DropdownMenu>
      </NavItem>}
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href='#' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}


function DropdownMenu({items}) {
  const [activeMenu, setActiveMenu] = useState(0);
  const [menuHeight, setMenuHeight] = useState(null);
  let [count, setCount] = useState(0)

  class MenuLevels {
    constructor(title, depth) {
      this.title = title;
      this.depth = depth;
    }
  }
  let newArray = []
  let totalDepth = 0
  const assignDepth = (arr, depth = 0, index = 0) => {
    if(index < arr.length){
      arr[index].depth = depth;
      const createObjects = new MenuLevels(arr[index].title, arr[index].depth)
      newArray.push(createObjects)
      if(arr[index].children?.length){
          totalDepth += 1
          return assignDepth(arr[index].children, depth  +1, 0);
      };
      return assignDepth(arr, depth, index+1);
    };
    return;
 };
  assignDepth(items)
 // const depthMenu = JSON.stringify(items, undefined, 4)
 console.log(newArray)
  function DropdownItem(props) {
    return (
      <a href='#' className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  console.log(count)


  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === 0}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit>
      <div className='menu'>
      {newArray.map(item => (
        item.depth === 0 &&
        <DropdownItem 
          key={item.title}
          goToMenu={1}>
          {item.title}
        </DropdownItem>
      ))}
      </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 1}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit>
      <div className='menu'>

      <DropdownItem goToMenu={0}>
            <h2>Go back</h2>
          </DropdownItem>

      {newArray.map(item => (
        item.depth === 1 &&
        <DropdownItem 
          key={item.title}
          goToMenu={2}>
          {item.title}
        </DropdownItem>
      ))}
      
      </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 2}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit>
      <div className='menu'>
      <DropdownItem goToMenu={1}>
            <h2>Go back</h2>
          </DropdownItem>
      {newArray.map(item => (
        item.depth === 2 &&
        <DropdownItem 
          key={item.title}>
          {item.title}
        </DropdownItem>
      ))}
      </div>
      </CSSTransition>





    </div>
  );
}

export default App;

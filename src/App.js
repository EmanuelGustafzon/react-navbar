import React, { useState } from 'react';
import './App.css';
import { DropdownMenu } from './DropdownMenu';

// type MenuItem = {
//   title: string,
//   icon?: string,
//   children: Array<MenuItem>
// }


const menu = [
  {
    title: 'my profile',
    icon: '🥸',
    children: [
      {
        title: 'Username',
        icon: '⚙️',
        children: [
          {
            title: 'Username child',
            url: 'https://library.mediaworks.global/en',
            icon: '⚙️',
            children: []
          },
    
        ]
      },
    ]
  },
  {
    title: 'Emanuel',
    icon: '🥸',
    children: [
      {
        title: 'settings',
        icon: '⚙️',
        children: []
      },
      {
        title: 'wifi',
        children: [
        {
          title: 'flashlight',
          url: 'https://library.mediaworks.global/en',
          icon: null,
          children: []
        }
      ]
    }]
  }
]


function App() {

  const [trail, setTrail] = useState([]);

  return (
    <Navbar>
      {<NavItem icon='↔️'>
        <DropdownMenu items={menu} trail={trail} setTrail={setTrail}></DropdownMenu>
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


export default App;

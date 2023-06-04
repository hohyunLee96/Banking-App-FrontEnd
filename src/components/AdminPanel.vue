<template>
    <div id="app">
      <div class="sidebar">
        <ul class="menu">
          <li v-for="(menu, index) in menus" :key="index" :class="{ 'active': menu.isActive }">
            <a @click="toggleMenu(menu)">
              {{ menu.title }}
              <span class="arrow" v-if="menu.submenus.length > 0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="arrow-icon">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </span>
            </a>
            <ul v-if="menu.isExpanded">
              <li v-for="(submenu, subIndex) in menu.submenus" :key="subIndex">
                <a :href="submenu.link">{{ submenu.title }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menus: [
          {
            title: 'Account',
            isExpanded: false,
            isActive: false,
            submenus: [
              { title: 'View accounts', link: '/accounts' },
              { title: 'Submenu 1.2', link: '/submenu2' },
            ]
          },
          {
            title: 'User',
            isExpanded: false,
            isActive: false,
            submenus: [
              { title: 'View users', link: '/users' },
              { title: 'Submenu 2.2', link: '/submenu4' }
            ]
          },
          {
            title: 'Transaction',
            isExpanded: false,
            isActive: false,
            submenus: [
            { title: 'Submenu 3.1', link: '/submenu3' },
              { title: 'Submenu 3.2', link: '/submenu4' }
            ]
          }
        ]
      };
    },
    methods: {
      toggleMenu(menu) {
        menu.isExpanded = !menu.isExpanded;
        menu.isActive = !menu.isActive;
      }
    }
  };
  </script>
  
  <style>
  .sidebar {
    margin-top: -50px; /* Adjust the value to remove the row gap */
    width: 200px;
    background-color: #1F456E;
    height: 100%;
    color: #fff;
    font-weight: bold;
  }
  
  .menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 1000px;
  }
  
  .menu li {
    padding: 8px;
    border-bottom: 1px solid #fff;
  }
  
  .menu li a {
    color: #D3D3D3;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  .menu li a:hover {
    background-color: #597882;
  }
  
  .menu li a .arrow {
    margin-left: auto;
  }
  
  .arrow-icon {
    width: 16px;
    height: 16px;
    fill: #D3D3D3;
  }
  
  .menu li ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .menu li ul li {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  
  .menu li ul li a {
    color: #fff;
    text-decoration: none;
  }
  
  .menu li ul li a:hover {
    background-color: #597882;
  }

  @media (max-width: 1200px) {
  .sidebar {
    margin-top: -24px; /* Adjust the margin value for tablet mode */
  }
}
  </style>
  

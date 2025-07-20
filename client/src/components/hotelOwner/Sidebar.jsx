import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "add-room", icon: assets.addIcon },
    { name: "List Room", path: "list-room", icon: assets.listIcon },
  ]

  return (
    <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300'>
      {sidebarLinks.map(({ name, path, icon }) => (
        <NavLink
          key={name}
          to={path}
          end={path === "/owner"} // seulement exact pour dashboard
          className={({ isActive }) =>
            `flex items-center py-3 px-4 md:px-8 gap-3
             ${isActive
                ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600"
                : "hover:bg-gray-100/90 border-white text-gray-700"
              }`
          }
        >
          <img src={icon} alt={name} className='h-6 w-6' />
          <p className='md:block hidden text-center'>{name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar

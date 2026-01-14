import React, { createContext, useContext, useState } from "react";
const SideBarContext = createContext();
const Sidebar = ({ children }) => {
  const [expand, setExpand] = useState(true);
  return (
    <aside className="px-1 py-2 bg-white border-r border-gray-300 h-full">
      <div className="flex flex-col justify-between items-center">
        <div className="p-4 flex justify-between items-center w-full">
          <div
            className={`flex gap-1 items-center cursor-pointer overflow-hidden transition-all ${
              expand ? "block" : `hidden`
            }`}
          >
            <i className="fa-solid fa-shop text-xl text-[var(--color-fdaa3d)]"></i>
            <p className="font-bold text-xl">Simp1e</p>
          </div>
          <div onClick={() => setExpand((curr) => !curr)}>
            <i
              className={`fa-solid fa-right-to-bracket text-2xl cursor-pointer transition-smooth ${
                expand ? `rotate-180` : ``
              }`}
            ></i>
          </div>
        </div>
        <SideBarContext.Provider value={{ expand }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SideBarContext.Provider>
      </div>
    </aside>
  );
};
export default Sidebar;

export const SideBarItem = ({ icon, text, active, alert }) => {
  const { expand } = useContext(SideBarContext);
  return (
    <>
      <li
        className={`group flex relative items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors
      ${
        active
          ? `bg-[var(--color-fdaa3d)]`
          : `hover:bg-[var(--color-febd69)] text-gray-600`
      }
      `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expand ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-[var(--color-febd69)] ${
              expand ? "" : "top-2"
            }`}
          />
        )}

        {!expand && (
          <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-[var(--color-febd69)]
          text-black text-sm invisible opacity-20 -translate-x-3 
          transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50">
            {text}
          </div>
        )}
      </li>
    </>
  );
};

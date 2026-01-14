import React from "react";
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import SideBar, {SideBarItem} from "./SideBar";

const NavItem = () => {
  return (
    <SideBar>
      <SideBarItem
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        alert
      />

      <SideBarItem icon={<BarChart3 size={20} />} text="Statistics" active />

      <SideBarItem icon={<UserCircle size={20} />} text="Users" />

      <SideBarItem icon={<Boxes size={20} />} text="Inventory" />

      <SideBarItem icon={<Package size={20} />} text="Orders" alert />

      <SideBarItem icon={<Receipt size={20} />} text="Billings" />

      <hr className="my-3" />

      <SideBarItem icon={<Settings size={20} />} text="Settings" />

      <SideBarItem icon={<LifeBuoy size={20} />} text="Help" />
    </SideBar>
  );
};

export default NavItem;

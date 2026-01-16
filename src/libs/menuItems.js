import { BarChart3, LayoutDashboard, MessageCircleCode, ShoppingBag, Users } from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
    badge: "New",
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    submenu: [
      { id: "overview", label: "Overview" },
      { id: "reports", label: "Reports" },
    ],
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    count:'2.4k',
    submenu: [
      { id: "all-users", label: "All Users" },
      { id: "activity", label: "User Activity" },
    ],
  }, 
  {
    id: "e-commerce",
    icon: ShoppingBag,
    label: "Simp1e Store",
    count:'2.4k',
    submenu: [
      { id: "products", label: "Products" },
      { id: "orders", label: "Orders" },
      { id: "customers", label: "Customers" },
    ],
  },
];

export default menuItems

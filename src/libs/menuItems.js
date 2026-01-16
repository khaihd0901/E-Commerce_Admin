import { BarChart3, Database, LayoutDashboard, MessageCircleCode, MessageCircleIcon, ShoppingBag, Users } from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
    badge: "New",
  },
  {
    id: "Catalog",
    icon: Database,
    label: "Catalog",
    submenu: [
      { id: "products", label: "Product List" },
      { id: "coupons", label: "Coupon List" },
      { id: "brands", label: "Brand List" },    
      { id: "categories", label: "Category List" },
      { id: "colors", label: "Color List" },
    ],
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    submenu: [
      { id: "all-users", label: "All Users" },
      { id: "activity", label: "User Activity" },
    ],
  }, 
  {
    id: "orders",
    icon: ShoppingBag,
    label: "Orders",
    count:'2.4k',
    submenu: [
      { id: "order-list", label: "Orders List" },
      { id: "order", label: "Order Detail" },
    ],
  },
  {
    id:"messages",
    icon: MessageCircleIcon,
    label: 'Messages',
    count: '12'
  }
];

export default menuItems

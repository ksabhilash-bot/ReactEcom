import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LayoutDashboard, ShoppingBasket, ShoppingCart } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
function MenuItems({ setOpen }) {
  const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <ShoppingBasket />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <ShoppingCart />,
    },
  ];
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex items-center gap-3 rounded-md px-3 py-2 border-2  hover:bg-gray-950 hover:text-amber-50 cursor-pointer transition-all duration-200"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}
const AdminSidebar = ({ open, setOpen }) => {
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b ">
              <SheetTitle>
                <span className="text-md md:text-md font-bold text-white tracking-tight p-3 rounded-2xl shadow-sm bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950  w-fit">
                  Admin Panel
                </span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div className="flex items-center gap-2">
          <h1
            className="text-xl md:text-xl font-bold text-white tracking-tight p-4 rounded-2xl shadow-sm bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950  w-fit"

          >
            ADMIN PANEL
          </h1>
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;

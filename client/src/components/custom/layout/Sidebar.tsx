"use client";
import Link from "next/link";
import {
  HomeIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
  SettingsIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: <HomeIcon className="w-5 h-5" /> },
  {
    title: "Products",
    href: "/products",
    icon: <PackageIcon className="w-5 h-5" />,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: <ShoppingCartIcon className="w-5 h-5" />,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: <UsersIcon className="w-5 h-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <SettingsIcon className="w-5 h-5" />,
  },
];

export function SidebarComponent() {
  const pathname = usePathname();

  return (
    <div className="relative">
      <aside
        id="sidebar"
        className="fixed lg:relative w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
                 -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out"
      >
        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 group
                  ${
                    isActive
                      ? "text-red-600 bg-red-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span
                  className={
                    isActive ? "text-red-600" : "group-hover:text-red-600"
                  }
                >
                  {item.icon}
                </span>
                <span
                  className={
                    isActive ? "text-red-600" : "group-hover:text-red-600"
                  }
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

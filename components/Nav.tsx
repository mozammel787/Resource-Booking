import React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link';
import { CirclePlus, LayoutDashboard } from 'lucide-react';

const Nav = () => {
  return (
    <div className=' container mx-auto flex items-center justify-between my-2'>
      <Link href="/" className='text-5xl font-bold'>RB.</Link>
      <NavigationMenu>
        <NavigationMenuList >
          <NavigationMenuItem >
            <NavigationMenuLink asChild >
              <Link href="/" className=' items-center gap-2 flex flex-row  p-3 '><CirclePlus className='text-black ' /> Add Booking</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/dashboard" className=' items-center gap-2 flex flex-row  p-3 '><LayoutDashboard className='text-black ' />Dashboard</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Nav;
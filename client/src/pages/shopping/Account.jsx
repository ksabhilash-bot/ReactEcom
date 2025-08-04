import React from 'react';
import acc from '/acc.jpeg';
import i from '/image.png';
import a from '/address.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Address from './address';
import AddressCard from './AddressCard';
import ShoppingCheckout from './checkout';

const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      {/* Banner Image with Overlay */}
      <div className="relative h-[100px] w-full overflow-hidden">
        <img
          src={acc}
          className="w-full h-full object-cover object-center"
          alt="Account Banner"
        />
        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
          <h1 className="text-zinc-950 text-4xl font-bold tracking-wide">My Account</h1>
        </div>
      </div>

      {/* Tab Section */}
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="flex gap-4 mb-6 border-b pb-2">
              <TabsTrigger
                value="orders"
                className="flex items-center gap-2 text-base font-medium data-[state=active]:text-primary"
              >
                <img src={i} className="h-5 w-5" alt="Orders" />
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="flex items-center gap-2 text-base font-medium data-[state=active]:text-primary"
              >
                <img src={a} className="h-5 w-5" alt="Address" />
                Add Address
              </TabsTrigger>
              <TabsTrigger
                value="saddress"
                className="flex items-center gap-2 text-base font-medium data-[state=active]:text-primary"
              >
                <img src={a} className="h-5 w-5" alt="Address" />
                Saved Address
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <ShoppingCheckout/>
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
            <TabsContent value="saddress">
              <AddressCard/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;

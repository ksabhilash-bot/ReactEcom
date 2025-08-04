import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAddress, deleteAddresses } from '../../store/shop/address-Slice.js';
import { Button } from '@/components/ui/button'; // Assume you have this Button component
import { toast } from 'sonner';
import { Label } from '@radix-ui/react-dropdown-menu';

const AddressCard = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const addressList = useSelector((state) => state.shopAddress.addressList); // Assumes your reducer is named `address`
  const dispatch = useDispatch();


  useEffect(() => {
    if (userId) {
      dispatch(fetchAllAddress(userId));
    }
  }, [userId, dispatch]);

  const handleDelete = ({userId,addressId}) => {
    dispatch(deleteAddresses({userId,addressId}))
      .then(() => {
        toast.success("Address deleted successfully!");
        dispatch(fetchAllAddress(userId)); // refresh list
      })
      .catch(() => {
        toast.error("Failed to delete address.");
      });
  };
  if (!addressList || addressList.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No addresses found.
        </CardContent>
      </Card>
    );
  }


  return (
    <div className="grid gap-6">
        
      {addressList.map((address) => (
        <Card key={address._id} className="shadow-sm border rounded-xl">
          <CardContent className="p-4 grid gap-2 text-sm">
            <div>
              <Label className="text-muted-foreground">Address</Label>
              <div  className='text-xl font-semibold'>{address.address}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">State</Label>
              <div className='text-xl font-semibold'>{address.state}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">City</Label>
              <div className='text-xl font-semibold'>{address.city}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Pincode</Label>
              <div className='text-xl font-semibold'>{address.pincode}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Phone No. +91</Label>
              <div className='text-xl font-semibold'>{address.phone}</div>
            </div>
            <div className="mt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete({userId:userId,addressId:address._id})}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AddressCard;

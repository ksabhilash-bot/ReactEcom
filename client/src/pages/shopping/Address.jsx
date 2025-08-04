import React, { useEffect, useState } from 'react';
import { addressFormControls } from '../../formconfig/index.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import CommonForm from '@/components/ui/common/form.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, fetchAllAddress } from '../../store/shop/address-Slice.js'; // Example: replace with actual action
import { toast } from 'sonner';

const Address = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (userId) {
      setFormData({
        userId,
        address: '',
        phone: '',
        state: '',
        city: '',
        pincode: ''
      });
    }
  }, [userId]);

  const handleManageAddress = (event) => {
    event.preventDefault();

    if (formData) {
      dispatch(addNewAddress(formData)).then((data)=>{
        if(data.payload.success){
            setFormData({
        userId,
        address: '',
        phone: '',
        state: '',
        city: '',
        pincode: ''
      });
      toast.success("Address Added Successfully");
      dispatch(fetchAllAddress(userId))
        }
        else{
            setFormData({
        userId,
        address: '',
        phone: '',
        state: '',
        city: '',
        pincode: ''
      });
      toast.error("Failed adding address")

        }
      }); // Replace with your actual Redux action
    }
  };

  if (!formData) return null; 

  return (
    <Card className='w-full'>
      <div></div>
      <CardHeader>
        <CardTitle>ADD NEW ADDRESS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttontext="Add"
          onSubmit={handleManageAddress}
        />
      </CardContent>
    </Card>
  );
};

export default Address;

import React from "react";
import { Card, CardContent, CardFooter } from "../card";
import { Button } from "../button";

const AdminProductTile = ({ handleDelete,product,setFormData,setOpenCreateProductsDialog,setCurrentEditedId,setUploadedImageUrl }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <h2 className="text-xl font-bold text-muted-foreground">Id:{product?._id}</h2>
          <span><font className='text-xl font-bold'>Stock Available : </font><font className='text-blue-600 text-xl font-bold'>{product?.totalStock}</font></span>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through " : ""
              }text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>
            {
                product?.salePrice>0?<span className="text-lg font-bold">₹{product?.salePrice}</span>:null
            }
          </div>
        </CardContent>
        <CardFooter className={`flex justify-between items-center`}>
          <Button onClick={()=>{
            setOpenCreateProductsDialog(true)
            setCurrentEditedId(product?._id)
            setFormData(product)
            setUploadedImageUrl(product?.image || '');
          }}>Edit</Button>
          <Button onClick={()=>{
            handleDelete(product?._id)
          }}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;

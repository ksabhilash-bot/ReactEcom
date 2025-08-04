import { Button } from '@/components/ui/button'
import CommonForm from '@/components/ui/common/form'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/formconfig'
import React, { Fragment, useEffect, useState } from 'react'
import ProductImageUpload from './image-upload'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct,addNewProduct, fetchAllProducts,editProduct } from '@/store/admin/products-slice'
import { toast, useSonner } from 'sonner'
import AdminProductTile from '@/components/ui/admin/product-tile'
const initailFormData={
  image:'',
  title:'',
  description:'',
  category:'',
  brand:'',
  price:'',
  salePrice:'',
  totalStock:""
}
const AdminProducts = () => {
  const [openCreateProductsDialog,setOpenCreateProductsDialog]=useState(false);
  const [formData,setFormdata]=useState(initailFormData)
  const [imageFile,setImageFile]=useState(null)
  const [uploadedimageUrl,setUploadedImageUrl]=useState('')
  const [imageLoadingState,setimageLoadingState]=useState(false);
  const [currentEditedId,setCurrentEditedId]=useState(null)
  const {productList}= useSelector(state=>state.adminProducts)
  const dispatch =useDispatch()
  const sonner = useSonner()
  function onSubmit(event){
    event.preventDefault();
    if(currentEditedId!==null){
      dispatch(editProduct({id:currentEditedId,formData})).then((data)=>{
        if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setOpenCreateProductsDialog(false)
        toast("Product edited successfully");
        setFormdata(initailFormData);
        setCurrentEditedId(null)
      }
      })

    }else{
    dispatch(addNewProduct({
      ...formData,image:uploadedimageUrl
    })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        console.log(formData)
        setOpenCreateProductsDialog(false)
        setImageFile(null);
        setFormdata(initailFormData);
        toast("Product added successfully");
      }
    })
  }}
  useEffect(()=>{
dispatch(fetchAllProducts())
  },[dispatch])
  function handleDelete(getCurrentProductId){
    console.log(getCurrentProductId)
    dispatch(deleteProduct(getCurrentProductId)).then(()=>{
      dispatch(fetchAllProducts());
      toast("Item deleted Successfully");
    })
  }
  return (
    <Fragment>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick={()=>{setOpenCreateProductsDialog(true)}}>
          Add New Product
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg-grid-cols-4'>
        {
          productList && productList.length >0?
          productList.map(productItem => <AdminProductTile handleDelete={handleDelete} setUploadedImageUrl={setUploadedImageUrl} setFormData={setFormdata} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setCurrentEditedId={setCurrentEditedId} product={productItem}/>):null
        }
      </div>
      <Sheet open={openCreateProductsDialog}
      onOpenChange={()=>{setOpenCreateProductsDialog(false)
        setCurrentEditedId(null);
        setFormdata(initailFormData);}
      }>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-center text-2xl">{currentEditedId!==null?"Edit the product":"Add the product"}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedimageUrl={uploadedimageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoadingState={imageLoadingState}  setimageLoadingState={setimageLoadingState}/>
          <div className="py-6 px-3 "> 
            <CommonForm onSubmit={onSubmit}formData={formData} setFormData={setFormdata} buttonText={currentEditedId!==null?"Edit":"Add"} formControls={addProductFormElements} />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts
import {addressModel} from '../../../models/Address.js'
export const addAddress= async(req,res)=>{
    try{
    const {userId,address,phone,city,pincode,state}=req.body;
    if(!userId || !address || !phone || !city || !pincode || !state){
        return res.status(400).json({
            success:false,
            message:"Please fill all the fields",
        })}
    const newAddress= await addressModel.create({
        userId,
        address,
        phone,
        city,
        pincode,
        state
    })
return res.status(201).json({
    success:true,
    message:"Address added successfully",
    data:newAddress
})

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })

    }
}


export const fetchAddress= async(req,res)=>{
    try{
        const {userId}=req.params;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User ID is required",
            })
        }
        const address= await addressModel.find({userId});
        if(address.length===0){
            return res.status(404).json({
                success:false,
                message:"No addresses found for this user",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Addresses fetched successfully",
            data:address
        })


    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })

    }
}

export const deleteAddress= async(req,res)=>{
    try{
        const {userId,addressId}=req.params;
        if(!userId || !addressId){
            return res.status(404).json({
                success:false,
                message:"not found"
            })
        }
        const address = await addressModel.findOneAndDelete({
            _id: addressId,
            userId: userId,
        });
        if(!address){
            return res.status(404).json({
                success:false,
                message:"address Not found"

            })
        }
        return res.status(200).json({
            success:true,
            data:address
        })



    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })

    }
}

export const editAddress= async(req,res)=>{
    try{
        const {userId,addressId}=req.params;
        const formData=req.body;
        if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message:"User ID and Address ID are required",
            })
        }
        const address = await addressModel.findOneAndUpdate({_id:addressId,userId},formData,{new:true});
        if(!address){
            return res.status(404).json({
                success:false,
                message:"Address not found"
            })
        }
        return res.status(200).json({
            success:true,
            data:address,
        })


    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })

    }
}
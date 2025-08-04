 const registerFormControls=[
    {
        name:"username",
        label:"Username",
        placeholder:"Enter Your Username",
        componentType:"input",
        type:"text",
    },
    {
        name:"email",
        label:"Email",
        placeholder:"Enter Your Email",
        componentType:"input",
        type:"email",
    },
    
    {
        name:"password",
        label:"Password",
        placeholder:"Enter Your Password",
        componentType:"input",
        type:"password",
    }
]
export const addProductFormElements=[
    {
        label:"Title",
        name:'title',
        type:"text",
        componentType:"input",
        placeholder:"Enter Product Title",
    },
    {
        label:"Description",
        name:'description',
        componentType:"textarea",
        placeholder:"Enter Product Description",
    },
    {
        label:"Category",
        name:'category',
        componentType:"select",
        options:[
            {id:"men",label:"Men"},
            {id:"women",label:"Women"},
            {id:"kids",label:"Kids"},
            {id:"accessories",label:"Accessories"},
            {id:"footwear",label:"Footwear"},
        ],
        
    },
    {
        label:"Brand",
        name:'brand',
        componentType:"select",
        options:[
            {id:"nike",label:"Nike"},
            {id:"adidas",label:"Adidas"},
            {id:"puma",label:"Puma"},
            {id:"levi",label:"Levi's"},
            {id:"zara",label:"Zara"},
            {id:"h&m",label:"H&M"},

        ]
    },
    {
        label:"Price",
        name:'price',
        type:"number",
        componentType:"input",
        placeholder:"Enter Product Price",
    },
    {
        label:"Sales Price",
        name:'salePrice',
        type:"number",
        componentType:"input",
        placeholder:"Enter Product Price(Optional)",
    },
    {
        label:"Total Stock",
        name:'totalStock',
        type:"number",
        componentType:"input",
        placeholder:"Enter Total Stock",
    },
    
]

export const shoppingViewHeaderMenuItems=[
    {id:'home',
    label:"Home",
    path:'/shop/home'
    },
    {id:'men',
    label:"Men",
    path:'/shop/listing'
    },
    {id:'women',
    label:"Women",
    path:'/shop/listing'
    },
    {id:'kids',
    label:"Kids",
    path:'/shop/listing'
    },
    {id:'accessories',
    label:"Accessories",
    path:'/shop/listing'
    },
    {id:'footwear',
    label:"Footwear",
    path:'/shop/listing'
    }
]
export const categoryOptionsmap={
    'men':"Men",
    'women':"Women",
    'kids':"Kids",
    'accessories':"Accessories",
    'footwear':"Footwear",
}
export const brandOptionsmap={
    'nike':"Nike",
    'adidas':"Adidas",
    'puma':"Puma",
    'levi':"Levi's",
    'zara':"Zara",
    'h&m':"H&M",}
export const filterOptions={
category:[
        {id:"men",label:"Men"},
        {id:"women",label:"Women"},
        {id:"footwear",label:"footwear"},
        {id:"accessories",label:"Accesories"},
        {id:"kids",label:"Kids"},
    ],
    brand:[
        {id:"nike",label:"Nike"},
        {id:"adidas",label:"Adidas"},
        {id:"puma",label:"Puma"},
        {id:"levi",label:"Levi's"},
        {id:"zara",label:"Zara"},
        {id:"h&m",label:"H&M"},
    ],
};
 export const sortOptions=[
    {id:"pricelowtohigh",label:"Price: Low to High"},
    {id:"pricehightolow",label:"Price: High to Low"},
    {id:"title-atoz",label:"Title: A to Z"},
    {id:"title-ztoa",label:"Title: Z to A"},
 ];


export const addressFormControls=[{
    label:"Address",
    name:"address",
    type:"text",
    componentType:"input",
    placeholder:"Enter your address"
},
{
label:"UserID",
name:"userId",
type:"text",
componentType:"input",
placeholder:"user id",
hidden:true
},
{
    label:"State",
    name:"state",
    type:"text",
    componentType:"input",
    placeholder:"Enter your State"
},
{
    label:"City",
    name:"city",
    type:"text",
    componentType:"input",
    placeholder:"Enter your City"
},
{
    label:"Pincode",
    name:"pincode",
    type:"text",
    componentType:"input",
    placeholder:"Enter your pinode"
},{
    label:"Phone",
    name:"phone",
    type:"text",
    componentType:"input",
    placeholder:"Enter your Phone"
},

]



export default registerFormControls;

import {ProductModel} from '../../../models/product.js'
export const getFilteredProducts = async (req, res) => {
  try {
    const { category, brand, sortby = 'pricelowtohigh' } = req.query;
    
    // Initialize filter object
    let filters = {};
    
    // Process category filter - Check if it exists before accessing length
    if (category && category.length) {
      filters.category = { $in: category.split(',') };
    }
    
    // Process brand filter - Check if it exists before accessing length
    if (brand && brand.length) {
      filters.brand = { $in: brand.split(',') };
    }
    
    // Configure sort options
    let sort = {};
    switch (sortby) {
      case 'pricelowtohigh':
        sort.price = 1;
        break;
      case 'pricehightolow':
        sort.price = -1;
        break;
      case 'title-atoz':
        sort.title = 1;
        break;
      case 'title-ztoa':
        sort.title = -1;
        break;
      default:
        sort.price = 1;
    }
    
    // Query database with filters and sort
    const products = await ProductModel.find(filters).sort(sort);
    
    res.status(200).json({ 
      success: true, 
      data: products,
      count: products.length 
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
};
export const getProductDetails = async (req, res) => {
  try {
    const {id}=req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
    
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
    
  }
}
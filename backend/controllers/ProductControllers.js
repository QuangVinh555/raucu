const product = require('../models/product');
const upload = require('../ImageMulter/storgaeImage');
const fs = require('fs');

const ProductControllers = {
    // [GET] /cuahang
    getAllProducts: async(req,res,next) => {
        
        try {
            const products = await product.find();
            res.json({success: true, products})
        } catch (error) {
            console.log(error);
            res.json({success: false, message: "Lỗi lấy danh sách sản phẩm"});
        
        }

        // Phân trang
        // const PAGE_SIZE = 4 
        // var page = req.query.page;

        // if(page) {
        //     // getPage
        //     page = parseInt(page);

        //     if(page < 1){
        //         page = 1
        //     }

        //     var soLuongBoQua = (page - 1) * PAGE_SIZE; 

        //     product.find()
        //     .skip(soLuongBoQua)
        //     .limit(PAGE_SIZE)
        //     .then(products=>{
        //         res.json({success: true, products});
        //     })
        
        //     .catch(err=>{
        //         console.log(error);
        //         res.json({success: false, message: "Lỗi lấy danh sách sản phẩm"});
        //     })

        // }
        // else{
        //     // getAll
        //     product.find()
        //     .then(products=>{
        //         res.json({success: true, products});
        //     })
        
        //     .catch(err=>{
        //         console.log(error);
        //         res.json({success: false, message: "Lỗi lấy danh sách sản phẩm"});
        //     })
        // }
       
    },

    // [POST]/cuahang/create
    createProduct: (req,res) => {
        upload(req,res, (err) => {
            if(err) {
                console.log(err);
            }
            else {
                const newProduct = new product({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    images: {
                        data: fs.readFileSync('upload/' + req.file.filename),
                        contentType: 'image/jpg',
                    },
                    type: req.body.type,
                    slug: req.body.slug,
                    amount: req.body.amount
                });
                newProduct.save()
                    .then(() => res.json({success: true, message: 'Product saved successfully' ,product: newProduct}))
                    .catch(err => res.json({success: false, message:'lỗi'}))
            }                   
        });
    }
};

module.exports = ProductControllers;
const {productsServices} = require("./services");
const debug = require("debug")("app:productsController");
const {Response} = require("../common/response");
const createError  = require("http-errors");

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            const products = await productsServices.getAll();
            Response.success(res, 200, "Products", products);
        } catch (error) {
            debug(error);
            Response.error(res, error);        
        }
    },
    getProductById: async (req, res) => {
        try{
            const {params:{id}} = req;
            let product = await productsServices.getById(id);
            if(!product){
                Response.error(res, new createError.NotFound());
            }else{
                Response.success(res, 200, `Products${id}`, product);
            }
        }catch(error){
            debug(error);
            Response.error(res, error);        
        }
    },
    createProduct: async (req, res) => {
        try{
            const {body} = req;
            const product = await productsServices.Create(body);
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest("Invalid body"));
            }else{
                Response.success(res, 200, "Products", product);
            }
        }catch(error){
            debug(error);
            Response.error(res, error);        
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {params:{id}} = req;
            const {body} = req;
            const product = await productsServices.updateProduct(id, body);
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest("Invalid body"));
            }else{
                Response.success(res, 200, `Products${id}`, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    deleteProduct: async(req, res) => {
        try {
            const {params:{id}} = req;
            const product = await productsServices.deleteProduct(id);
            if(!product){
                Response.error(res, new createError.NotFound());
                return;
            }else{
                Response.success(res, 200, `Products${id}`, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    generateReport: (req, res) => {
        try{
            productsServices.reportGenerate("Inventario-Productos", res);
        }catch(error){
            debug(error);
            Response.error(res, error);
        }
    }
}
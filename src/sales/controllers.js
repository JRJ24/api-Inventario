const {salesServices} = require("./services");
const debug = require("debug")("app:salesController");
const {Response} = require("../common/response");
const createError  = require("http-errors");

module.exports.SalesController = {
    getSales: async (req, res) => {
        try {
            const sales = await salesServices.getAll();
            Response.success(res, 200, "Sales", sales);
        } catch (error) {
            debug(error);
            Response.error(res, error);        
        }
    },
    getSaleById: async (req, res) => {
        try{
            const {params:{id}} = req;
            let sale = await salesServices.getById(id);
            if(!sale){
                Response.error(res, new createError.NotFound());
            }else{
                Response.success(res, 200, `Sales${id}`, sale);
            }
        }catch(error){
            debug(error);
            Response.error(res, error);        
        }
    },
    createSale: async (req, res) => {
        try{
            const {body} = req;
            const sale = await salesServices.Create(body);
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest("Invalid body"));
            }else{
                Response.success(res, 200, "Sales", sale);
            }
        }catch(error){
            debug(error);
            Response.error(res, error);        
        }
    },
    updateSale: async (req, res) => {
        try {
            const {params:{id}} = req;
            const {body} = req;
            const sale = await salesServices.updateSale(id, body);
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest("Invalid body"));
            }else{
                Response.success(res, 200, `Sales${id}`, sale);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    deleteSale: async(req, res) => {
        try {
            const {params:{id}} = req;
            const sale = await salesServices.deleteSale(id);
            if(!sale){
                Response.error(res, new createError.NotFound());
                return;
            }else{
                Response.success(res, 200, `Sales${id}`, sale);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    }
}
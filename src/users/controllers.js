const {usersServices} = require("./services");
const debug = require("debug")("app:usersController");
const {Response} = require("../common/response");
const createError  = require("http-errors");

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            const users = await usersServices.getAll();
            Response.success(res, 200, "Users", users);
        } catch (error) {
            debug(error);
            Response.error(res, error);        
        }
    },
    getUserById: async (req, res) => {
        try{
            const {params:{id}} = req;
            let user = await usersServices.getById(id);
            if(!user){
                Response.error(res, new createError.NotFound());
            }else{
                Response.success(res, 200, `Users${id}`, user);
            }
        }catch(error){
            debug(error);
            Response.error(res, error);        
        }
    },
    createUser: async (req, res) => {
        try{
            const {body} = req;
            const user = await usersServices.Create(body);
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest("Invalid body"));
            }else{
                Response.success(res, 200, "Users", user);
            }
        }catch(error){
            debug(error);
            Response.error(res, error);        
        }
    },
    updateUser: async (req, res) => {
        try {
            const {params:{id}} = req;
            const {body} = req;
            const user = await usersServices.updateUser(id, body);
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest("Invalid body"));
            }else{
                Response.success(res, 200, `Users${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    deleteUser: async(req, res) => {
        try {
            const {params:{id}} = req;
            const user = await usersServices.deleteUser(id);
            if(!user){
                Response.error(res, new createError.NotFound());
                return;
            }else{
                Response.success(res, 200, `Users${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    }
}
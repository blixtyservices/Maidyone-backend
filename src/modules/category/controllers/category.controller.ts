import { Request, Response } from "express";

import CategoryService from "../services/category.service";

class CategoryController{

    async getAll(req:Request,res:Response){

        const data = await CategoryService.getAll();

        res.json({

            success:true,

            data

        });

    }

    async getById(req:Request,res:Response){

        const data = await CategoryService.getById(req.params.id);

        res.json({

            success:true,

            data

        });

    }

}

export default new CategoryController();
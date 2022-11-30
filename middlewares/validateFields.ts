import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Op } from 'sequelize';
import User from "../models/User";



export function validateFields(request: Request, response: Response, next: NextFunction) {
    const errors = validationResult(request);

    if ( !errors.isEmpty() ) {
        return response.status(400).json({
            ok: false,
            ...errors
        });
    }

    next();
}

export async function emailIsUnique(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;
    request.body.email = email.trim();

    const user = await User.count({
        where: { email: email.trim() }
    });

    if ( user )  return response.status(400).json({
        ok: false,
        mesaage: `El correo ${ email.trim() } ya existe en la base de datos`
    });
    
    next();
}

export async function emailIsUniqueWhenIsUpdated(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    const { id } = request.params;

    if ( body.email ) {
        body.email = body.email.trim();
        request.body.email = body.email;
    }

    try {
        const user = await User.count({ where: { 
            id: {
                [Op.ne] : id
            },
            email: body.email
        }});

        if ( user ) return response.status(400).json({
            ok: false,
            message: `El correo ${ body.email } ya existe en la base de datos`
        });

        next();
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: "Hubo un error en la conexión de la base de datos",
            error
        });
    }
}
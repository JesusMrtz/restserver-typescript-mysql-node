import { Request, Response } from "express";
import User from "../models/User";


export async function getUsers(request: Request, response: Response) {
    try {
        const users = await User.findAll({ where: { status: true } });

        return response.json({
            ok: true,
            users
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: "Error al obtener los usuarios",
            error
        });
    }
}

export async function getUser(request: Request, response: Response) {
    const { id } = request.params;
  
    try {
        const user = await User.findByPk(id);
    
        return response.json({
            ok: true,
            user
        }); 
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: `Error al obtener el usuario con el ID: ${ id }`,
            error
        });
    }
}

export async function createUser(request: Request, response: Response) {
    const { body } = request;

    try {
        const user =  await User.create(body);
        return response.status(201).json({
            ok: true,
            user
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: "Error al crear al usuario",
            error
        });
    }
}

export async function updateUser(request: Request, response: Response) {
    const { id } = request.params;
    const { body } = request;

    try {
        const user =  await User.findByPk(id);
        await user?.update(body);

        return response.status(203).json({
            ok: true,
            user
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: "Error al crear al usuario",
            error
        });
    }
}

export async function deleteUser(request: Request, response: Response) {
    const { id } = request.params;

    try {
        const user = await User.findByPk(id);

        /** Eliminado lógico */
        await user?.update({ status: 0 });
        /** Eliminado fisico */
        // await user?.destroy();

        return response.status(200).json({
            ok: true,
            user
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: "Hubo un error al eliminar el usuario",
            error
        }); 
    }
}
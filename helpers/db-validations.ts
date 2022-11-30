import User from "../models/User";


export async function userExistsInDB( id: number ) {
    const user = await User.count({
        where: { id, status: true }
    });

    if ( !user ) throw new Error("El usuario no existe en la base de datos");
    return true;
}
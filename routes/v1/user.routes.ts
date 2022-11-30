import { Router } from "express";
import { check } from "express-validator";
import { getUser, getUsers, createUser, updateUser, deleteUser } from "../../controllers/users.controller";
import { userExistsInDB } from "../../helpers/db-validations";
import { validateFields, emailIsUnique, emailIsUniqueWhenIsUpdated } from "../../middlewares/validateFields";


const router = Router();


router.get("/", getUsers);

router.get("/:id",[
    check("id", "El ID debe ser númerico").isNumeric(),
    check("id", "El usuario no existe en la base de datos").custom(userExistsInDB),
    validateFields
], getUser);

router.post("/", [
    emailIsUnique,
    validateFields
], createUser);

router.put("/:id", [
    check("id", "El ID debe ser númerico").isNumeric(),
    check("id", "El usuario no existe en la base de datos").custom(userExistsInDB),
    emailIsUniqueWhenIsUpdated,
    validateFields
], updateUser);

router.delete("/:id", [
    check("id", "El ID debe ser númerico").isNumeric(),
    check("id", "El usuario no existe en la base de datos").custom(userExistsInDB),
    validateFields
], deleteUser);


export default router;
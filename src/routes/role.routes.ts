import { Router } from 'express';
import { getRole, getRoles, createRole, updateRole, deleteRole } from '../controllers/role.controller';

const router = Router();

router.route('/')
    .get(getRoles)
    .post(createRole)

router.route('/:role_id')
    .get(getRole)
    .put(updateRole)
    .delete(deleteRole)


export default router;
import prisma from '../../prisma/prismaDB.js';
import CrudRepo from './crudRepo.js';

class UserRepo extends CrudRepo {
    constructor() {
        super(prisma.user);
    }

    getUserByEmail(email) {
        return prisma.user.findUnique({where: {email: email}});
    }

    getUserByPhone(phone) {
        return prisma.user.findUnique({where: {phone: phone}});
    }
}

export default new UserRepo();

import UserModel from '../models/user';

const getUsers = async () => {
    const responeItems =  await UserModel.find({});
    return responeItems;
}

export { getUsers }
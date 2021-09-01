import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUsersService from '../services/ListUsersService';

export default class usersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const users = await listUsers.execute();
    return response.json(users);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return response.json(user);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = new DeleteUserService();
    await deleteUser.execute({ id });
    return response.json([]);
  }
}

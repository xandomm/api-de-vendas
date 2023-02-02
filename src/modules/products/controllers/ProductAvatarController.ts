import { Request, Response } from 'express';
import UpdateProductAvatarService from '../services/UpdateProductAvatarService';
import { instanceToInstance } from 'class-transformer';

export default class ProductAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateProductAvatarService();
    const product = await updateAvatar.execute({
      product_id: request.params.id,
      avatarFilename: request.file.filename,
    });

    return response.json(instanceToInstance(product));
  }
}

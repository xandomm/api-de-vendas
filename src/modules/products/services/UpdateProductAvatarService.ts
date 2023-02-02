import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
  product_id: string;
  avatarFilename: string;
}

class UpdateProductAvatarService {
  public async execute({
    product_id,
    avatarFilename,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (product.avatar) {
        await s3Provider.deleteFile(product.avatar);
      }
      const filename = await s3Provider.saveFile(avatarFilename);
      product.avatar = filename;
    } else {
      const diskProvider = new DiskStorageProvider();
      if (product.avatar) {
        await diskProvider.deleteFile(product.avatar);
      }
      const filename = await diskProvider.saveFile(avatarFilename);
      product.avatar = filename;
    }

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductAvatarService;

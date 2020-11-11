import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    console.log('chegou aqui bb');
    const checkProductByName = await this.productsRepository.findByName(name);

    if (checkProductByName)
      throw new AppError('Este produto já existe no nosso banco de dados ');

    const productCreated = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    return productCreated;
  }
}

export default CreateProductService;

import {ProductService} from "../service/productService";
import {NextFunction, Request, Response} from "express";
import {inject, injectable} from "inversify";

@injectable()
export class ProductController {
  constructor(  private productService: ProductService) {
  }

  async getById(req: Request, res: Response) {
    const {id} = req.params
    let productById = await this.productService.getProductById(id)

    if (productById) return res.status(200).json(productById)
    else return res.status(404).json('not found')
  }

  async getAll(req: Request, res: Response) {
    const {search, limit, page, sort} = req.query
    let response = await this.productService.getAllProducts(search?.toString(), limit?.toString(), page?.toString(), sort?.toString())

    if (response) return res.status(200).json(response)
    else return res.status(404).json('not found')

  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {title, price} = req.body
      let newProduct = await this.productService.createProduct({title: title, price: price})

      return res.status(201).json(newProduct)
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response) {
    const {id} = req.params
    const {title, price} = req.body
    let product = await this.productService.updateProduct(id, {title, price})

    if (product) return res.status(200).json(product)
    else return res.status(400).json('Error')
  }

  async deleteById(req: Request, res: Response) {
    const {id} = req.params
    let product = await this.productService.deleteProduct(id)
    if (product) return res.status(200).json(product)
    else return res.status(400).json('Error')
  }

  async deleteAll(req: Request, res: Response) {
    let product = await this.productService.deleteAllProduct()
    if (product) return res.status(200).json(product)
    else return res.status(400).json('Error')
  }

}
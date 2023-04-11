import {NextFunction, Request, Response, Router} from "express";
import productService from "../service/productService";
import validateTitleAndPrice from "../middleware/validateTitleAndPrice";

const productsRoute = Router({})

productsRoute.get('/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  let productById = await productService.getProductById(id)

  if (productById) return res.status(200).json(productById)
  else return res.status(404).json('not found')
})
productsRoute.get('/', async (req: Request, res: Response) => {
  const {search} = req.query
  let response = await productService.getAllProducts(search?.toString())

  if (response) return res.status(200).json(response)
  else return res.status(404).json('not found')

})
productsRoute.post('/', validateTitleAndPrice, async (req: Request, res: Response, next: NextFunction) => {

  try {
    const {title, price} = req.body
    let newProduct = await productService.createProduct({title: title, price: price})

    return res.status(201).json(newProduct)
  } catch (err) {
    next(err)
  }

})
productsRoute.put('/:id', validateTitleAndPrice, async (req: Request, res: Response) => {
  const {id} = req.params
  const {title, price} = req.body
  let product = await productService.updateProduct(id, {title, price})

  if (product) return res.status(200).json(product)
  else return res.status(400).json('Error')
})
productsRoute.delete('/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  let product = await productService.deleteProduct(id)
  if (product) return res.status(200).json(product)
  else return res.status(400).json('Error')
})
productsRoute.delete('/', async (req: Request, res: Response) => {
  let product = await productService.deleteAllProduct()
  if (product) return res.status(200).json(product)
  else return res.status(400).json('Error')
})


export default productsRoute
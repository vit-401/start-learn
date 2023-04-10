import {NextFunction, Request, Response, Router} from "express";
import repo from "../repository/productRepository";
import validateTitleAndPrice from "../middleware/validateTitleAndPrice";

const productsRoute = Router({})

productsRoute.get('/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  let productById = await repo.getProductById(id)

  if (productById) return res.status(200).json(productById)
  else return res.status(404).json('not found')
})
productsRoute.get('/', async (req: Request, res: Response) => {
  const {search} = req.query
  let response = await repo.getAllProducts(search?.toString())

  if (response) return res.status(200).json(response)
  else return res.status(404).json('not found')

})
productsRoute.post('/', validateTitleAndPrice, async (req: Request, res: Response, next: NextFunction) => {

  try {
    const {title, price} = req.body
    let newProduct = await repo.createProduct({title: title, price: price})

    return res.status(201).json(newProduct)
  } catch (err) {
    next(err)
  }

})
productsRoute.put('/:id', validateTitleAndPrice, async (req: Request, res: Response) => {
  const {id} = req.params
  const {title, price} = req.body
  let product = await repo.updateProduct(id, {title, price})

  if (product) return res.status(200).json(product)
  else return res.status(400).json('Error')
})
productsRoute.delete('/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  let product = await repo.deleteProduct(id)
  if (product) return res.status(200).json(product)
  else return res.status(400).json('Error')
})


export default productsRoute
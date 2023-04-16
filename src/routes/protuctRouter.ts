import {NextFunction, Request, Response, Router} from "express";
import validateTitleAndPrice from "../middleware/validateTitleAndPrice";
import {ProductService} from "../service/productService";

const router = Router({})
const productsRoute = (productService:ProductService)=>{

  router.get('/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  let productById = await productService.getProductById(id)

  if (productById) return res.status(200).json(productById)
  else return res.status(404).json('not found')
})
  router.get('/', async (req: Request, res: Response) => {
  const {search, limit, page,sort} = req.query
  let response = await productService.getAllProducts(search?.toString(), limit?.toString(), page?.toString(),sort?.toString())

  if (response) return res.status(200).json(response)
  else return res.status(404).json('not found')

})
  router.post('/', validateTitleAndPrice, async (req: Request, res: Response, next: NextFunction) => {

  try {
    const {title, price} = req.body
    let newProduct = await productService.createProduct({title: title, price: price})

    return res.status(201).json(newProduct)
  } catch (err) {
    next(err)
  }

})
  router.put('/:id', validateTitleAndPrice, async (req: Request, res: Response) => {
  const {id} = req.params
  const {title, price} = req.body
  let product = await productService.updateProduct(id, {title, price})

  if (product) return res.status(200).json(product)
  else return res.status(400).json('Error')
})
  router.delete('/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  let product = await productService.deleteProduct(id)
  if (product) return res.status(200).json(product)
  else return res.status(400).json('Error')
})
  router.delete('/', async (req: Request, res: Response) => {
  let product = await productService.deleteAllProduct()
  if (product) return res.status(200).json(product)
  else return res.status(400).json('Error')
})

  return router
}


export default productsRoute
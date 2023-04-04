import {Request, Response, Router} from "express";
import repo from "../repository/productRepository";

const productsRoute = Router({})

productsRoute.get('/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  let productById = await repo.getProductById(id)

  if (productById) return res.status(200).json(productById)
  else return res.status(404).json('not found')
})
productsRoute.get('/', async (req: Request, res: Response) => {
  const {search} = req.query
  let response =  repo.getAllProducts(search?.toString())
  if (response) return res.status(200).json(response)
  else return res.status(404).json('not found')

})
productsRoute.post('/', (req: Request, res: Response) => {
  const {title, price} = req.body
  let newProduct = repo.createProduct({title:title,price:price, id:Number(new Date()).toString()})

  if (newProduct) return res.status(201).json(newProduct)
  else return res.status(400).json('Error')
})
productsRoute.put('/:id', (req: Request, res: Response) => {
  const {id} = req.params
  const {title,price} = req.body
  let product = repo.updateProduct(id, {title, price})

  if (product) return res.status(200).json(product)
  else return res.status(400).json('Error')
})
productsRoute.delete('/:id', (req: Request, res: Response) => {
  const {id} = req.params
  let product = repo.deleteProduct(id)
  if(product) return res.status(200).json(product)
  else return res.status(400).json('Error')
})


export default productsRoute
import {Request, Response, Router} from "express";

 const productsRoute = Router({})
const products = [{id: 1, title: "tomato"}, {id: 2, title: "banana"}]

productsRoute.get('/:id', (req: Request, res: Response) => {
  let productById = null
  const {id} = req.params
  if (Number(id)) productById = products.find(product => product.id === Number(id))

  if (productById) return res.status(200).json(productById)
  else return res.status(404).json('not found')
})
productsRoute.get('/', (req: Request, res: Response) => {
  const {search} = req.query
  let response: any = null
  if (search) response = products.find(product => product.title.includes(search.toString()))

  if (response) return res.status(200).json(response)
  if (!Object.keys(req.query).length) return res.status(200).json(products)
  else return res.status(200).json()

})
productsRoute.post('/', (req: Request, res: Response) => {
  const {title} = req.body
  let newProduct = null
  if (title) {
    newProduct = {id: (products[products.length - 1]?.id || products.length) + 1, title: title}
    products.push(newProduct)
  }

  if (newProduct) return res.status(201).json('product successful added')
  else return res.status(400).json('Error')
})
productsRoute.put('/:id', (req: Request, res: Response) => {
  const {id} = req.params
  const {title} = req.body
  let indexProduct = products.findIndex(product => product.id === Number(id))
  if (title && (indexProduct > -1)) {
    products[indexProduct] = {id: Number(id), title: title}
  }

  if (title && indexProduct > -1) return res.status(200).json(products)
  else return res.status(400).json('Error')
})
productsRoute.delete('/:id', (req: Request, res: Response) => {
  const {id} = req.params
  let indexProduct = products.findIndex(product => product.id === Number(id))
  if (indexProduct > -1) {
    products.splice(indexProduct, 1)
  }
  if (indexProduct > -1) return res.status(200).json(products)
  else return res.status(400).json('Error')
})


export default  productsRoute
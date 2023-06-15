import {Router} from "express";
import validateTitleAndPrice from "../middleware/validateTitleAndPrice";
import {productController} from "../compositions/product-composition";

const router = Router({})
const productsRoute = () => {

  router.get('/:id', productController.getById.bind(productController))
  router.get('/', productController.getAll.bind(productController))
  router.post('/', validateTitleAndPrice, productController.create.bind(productController))
  router.put('/:id', validateTitleAndPrice, productController.update.bind(productController))
  router.delete('/:id', productController.deleteById.bind(productController))
  router.delete('/', productController.deleteAll.bind(productController))

  return router
}


export default productsRoute
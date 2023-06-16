import {Router} from "express";
import validateTitleAndPrice from "../middleware/validateTitleAndPrice";
import {container} from "../root-compositions";
import {ProductController} from "../controllers/products-controller";

const router = Router({})
const productsRoute = () => {
  const productController = container.resolve(ProductController)

  router.get('/:id', productController.getById.bind(productController))
  router.get('/', productController.getAll.bind(productController))
  router.post('/', validateTitleAndPrice, productController.create.bind(productController))
  router.put('/:id', validateTitleAndPrice, productController.update.bind(productController))
  router.delete('/:id', productController.deleteById.bind(productController))
  router.delete('/', productController.deleteAll.bind(productController))

  return router
}


export default productsRoute
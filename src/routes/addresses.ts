import {Request, Response, Router} from "express";
const addressesRouter = Router({})
const addresses = [{id: 1, address: "getmana sagaidachnogo 121"}, {id: 2, address: "shevchanka 13"}]

addressesRouter.get('/', (req: Request, res: Response) => {
  const {search} = req.query
  let response: any = null
  if (search) response = addresses.find(address => address.address.includes(search.toString()))

  if (response) return res.status(200).json(response)
  if (!Object.keys(req.query).length) return res.status(200).json(addresses)
  else return res.status(200).json()
})

export default addressesRouter
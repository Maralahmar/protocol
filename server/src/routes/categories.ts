import { Router } from 'express'
import { getCategories } from '../data/seed.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json(getCategories())
})

export default router

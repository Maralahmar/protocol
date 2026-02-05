import { Router } from 'express'

const router = Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body || {}
  if (email && password) {
    const token = `mock_token_${Date.now()}_${email.replace(/@/g, '_')}`
    return res.json({ token })
  }
  res.status(400).json({ error: 'Invalid credentials' })
})

export default router

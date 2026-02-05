import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.post('/', authMiddleware, (req, res) => {
  const { eventId } = req.body || {}
  if (eventId) {
    return res.json({ success: true, bookingId: `booking_${Date.now()}`, eventId })
  }
  res.status(400).json({ error: 'Event ID required' })
})

export default router

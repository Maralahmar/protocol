import express from 'express'
import cors from 'cors'
import categoriesRouter from './routes/categories.js'
import eventsRouter from './routes/events.js'
import authRouter from './routes/auth.js'
import bookingsRouter from './routes/bookings.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use('/api/categories', categoriesRouter)
app.use('/api/events', eventsRouter)
app.use('/api/auth', authRouter)
app.use('/api/bookings', bookingsRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

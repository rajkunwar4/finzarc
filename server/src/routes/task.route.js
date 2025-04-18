import express from 'express'
import { 
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Protect all routes
router.use(auth)

// Task routes
router.post('/', createTask)
router.get('/', getTasks)
router.get('/:id', getTaskById)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)


export default router
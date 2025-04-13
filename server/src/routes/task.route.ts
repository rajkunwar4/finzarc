import express, { RequestHandler } from 'express'
import { 
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/task.controller'
import {
  createSubtask,
  updateSubtask,
  deleteSubtask,
  toggleSubtask
} from '../controllers/subtask.controller'
import { auth } from '../middleware/auth'

const router = express.Router()

// Protect all routes
router.use(auth as unknown as RequestHandler)

// Task routes
router.post('/', createTask as unknown as RequestHandler)
router.get('/', getTasks as unknown as RequestHandler)
router.get('/:id', getTaskById as unknown as RequestHandler)
router.put('/:id', updateTask as unknown as RequestHandler)
router.delete('/:id', deleteTask as unknown as RequestHandler)

// Subtask routes
router.post('/subtask', createSubtask as unknown as RequestHandler)
router.put('/subtask/:id', updateSubtask as unknown as RequestHandler)
router.delete('/subtask/:id', deleteSubtask as unknown as RequestHandler)
router.patch('/subtask/:id/toggle', toggleSubtask as unknown as RequestHandler)

export default router
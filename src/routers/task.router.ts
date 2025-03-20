import { taskController } from '../controllers/task.controller';
import { Router } from 'express';
import { validateTaskData } from '../middlewares/task.middleware';

const router = Router();

router.post('/', validateTaskData, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:taskId', taskController.getTaskById);
router.get('/user/:userId', taskController.getTasksByUserId);
router.patch('/:taskId', validateTaskData, taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

export const taskRouter = router;

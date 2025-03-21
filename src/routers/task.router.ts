import { taskController } from '../controllers/task.controller';
import { Router } from 'express';
import { validateTaskData } from '../middlewares/task.middleware';
import { commonMiddleware } from '../middlewares/common.middleware';

const router = Router();

router.post('/', validateTaskData, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:taskId',commonMiddleware.isIdValid('taskId'), taskController.getTaskById);
router.get('/user/:userId', commonMiddleware.isIdValid('userId'), taskController.getTasksByUserId);
router.patch('/:taskId', commonMiddleware.isIdValid('taskId'), validateTaskData, taskController.updateTask);
router.delete('/:taskId', commonMiddleware.isIdValid('taskId'), taskController.deleteTask);

export const taskRouter = router;

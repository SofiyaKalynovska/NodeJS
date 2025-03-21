import { taskController } from '../controllers/task.controller';
import { Router } from 'express';
import { commonMiddleware } from '../middlewares/common.middleware';
import { TaskValidator } from '../validators/task.validator';

const router = Router();

router.post('/', commonMiddleware.validateBody(TaskValidator.createSchema) , taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:taskId',commonMiddleware.isIdValid('taskId'), taskController.getTaskById);
router.get('/user/:userId', commonMiddleware.isIdValid('userId'), taskController.getTasksByUserId);
router.patch('/:taskId', commonMiddleware.isIdValid('taskId'), commonMiddleware.validateBody(TaskValidator.patchSchema), taskController.updateTask);
router.delete('/:taskId', commonMiddleware.isIdValid('taskId'), taskController.deleteTask);

export const taskRouter = router;

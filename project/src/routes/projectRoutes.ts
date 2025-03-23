import express from "express"
import { authMiddleware } from "../middleware"
import projectController from '../controllers/projectController';


const router: express.Router = express.Router()
const controller = new projectController();

/**
 * @swagger
 * /project:
 *   post:
 *     tags:
 *       - Project
 *     summary: Create a new project
 *     description: Create a new project record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.route('')
    .post(authMiddleware, controller.create)

/**
 * @swagger
 * /project/getall:
 *   get:
*     tags:
 *       - Project
 *     summary: Get all projects
 *     description: Retrieve a list of all projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       401:
 *         description: Unauthorized
 */
router.route('/getall')
    .get(authMiddleware, controller.getAll)

/**
 * @swagger
 * /project/changestatus/{id}:
 *   patch:
 *     tags:
 *       - Project
 *     summary: Change project status
 *     description: Update the status of a project by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "На проверке темы"
 *     responses:
 *       200:
 *         description: Project status updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.route('/changestatus/:id')
    .patch(authMiddleware, controller.changeStatus)

/**
 * @swagger
 * /project/{id}:
 *   get:
 *     tags:
 *       - Project
 *     summary: Get a project by ID
 *     description: Retrieve a project record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .get(authMiddleware, controller.get)

/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     tags:
 *       - Project
 *     summary: Delete a project by ID
 *     description: Delete a project record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The project ID
 *     responses:
 *       204:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .delete(authMiddleware, controller.delete)

/**
 * @swagger
 * /project/{id}:
 *   patch:
 *     tags:
 *       - Project
 *     summary: Update a project by ID
 *     description: Update a project record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .patch(authMiddleware, controller.update)

export default router
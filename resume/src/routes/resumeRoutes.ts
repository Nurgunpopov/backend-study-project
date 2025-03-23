import express from "express"
import { authMiddleware } from "../middleware"
import projectController from '../controllers/resumeController';


const router: express.Router = express.Router()
const controller = new projectController();

/**
 * @swagger
 * /resume:
 *   post:
 *     tags:
 *       - Resume
 *     summary: Create a new resume
 *     description: Create a new resume record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resume'
 *     responses:
 *       201:
 *         description: Resume created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.route('')
    .post(authMiddleware, controller.create)

/**
 * @swagger
 * /resume/getall:
 *   get:
 *     tags:
 *       - Resume
 *     summary: Get all resumes
 *     description: Retrieve a list of all resumes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of resumes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resume'
 *       401:
 *         description: Unauthorized
 */
router.route('/getall')
    .get(authMiddleware, controller.getAll)

/**
 * @swagger
 * /resume/bachelorid:
 *   get:
 *     tags:
 *       - Resume
 *     summary: Get a resume by bachelor ID
 *     description: Retrieve a resume record by bachelor ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bachelorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The bachelor ID
 *     responses:
 *       200:
 *         description: Resume retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resume'
 *       404:
 *         description: Resume not found
 *       401:
 *         description: Unauthorized
 */
router.route('/bachelorid')
    .get(controller.getByBachelorId)

/**
 * @swagger
 * /resume/{id}:
 *   get:
 *     tags:
 *       - Resume
 *     summary: Get a resume by ID
 *     description: Retrieve a resume record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The resume ID
 *     responses:
 *       200:
 *         description: Resume retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resume'
 *       404:
 *         description: Resume not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .get(authMiddleware, controller.get)

/**
 * @swagger
 * /resume/{id}:
 *   patch:
 *     tags:
 *       - Resume
 *     summary: Update a resume by ID
 *     description: Update a resume record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The resume ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resume'
 *     responses:
 *       200:
 *         description: Resume updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Resume not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .patch(authMiddleware, controller.update)

/**
 * @swagger
 * /resume/{id}:
 *   delete:
 *     tags:
 *       - Resume
 *     summary: Delete a resume by ID
 *     description: Delete a resume record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The resume ID
 *     responses:
 *       204:
 *         description: Resume deleted successfully
 *       404:
 *         description: Resume not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .delete(authMiddleware, controller.delete)

export default router
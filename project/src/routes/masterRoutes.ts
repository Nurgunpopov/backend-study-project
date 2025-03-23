import express from "express"
import { authMiddleware } from "../middleware"
import masterController from '../controllers/masterController';


const router: express.Router = express.Router()
const controller = new masterController();

/**
 * @swagger
 * /master:
 *   post:
 *     tags:
 *       - Master
 *     summary: Create a new master
 *     description: Create a new master record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               group:
 *                 type: string
 *                 example: K4140
 *     responses:
 *       200:
 *         description: Master created successfully
 *       400:
 *         description: Invalid input
 */
router.route('')
    .post(controller.create)

/**
 * @swagger
 * /master/{id}:
 *   get:
 *     tags:
 *       - Master
 *     summary: Get a master by ID
 *     description: Retrieve a master record by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The master ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Master retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Master'
 *       404:
 *         description: Master not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .get(authMiddleware, controller.get)

/**
 * @swagger
 * /master/{id}:
 *   patch:
 *     tags:
 *       - Master
 *     summary: Update a master by ID
 *     description: Update a master record by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The master ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               specialty:
 *                 group: string
 *                 example: K4140
 *     responses:
 *       200:
 *         description: Master updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Master not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .patch(authMiddleware, controller.update)

/**
 * @swagger
 * /master/{id}:
 *   delete:
 *     tags:
 *       - Master
 *     summary: Delete a master by ID
 *     description: Delete a master record by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The master ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Master deleted successfully
 *       404:
 *         description: Master not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .delete(authMiddleware, controller.delete)

export default router
import express from "express";
import { authMiddleware } from "../middleware";
import bachelorController from '../controllers/bachelorController';

const router: express.Router = express.Router();
const controller = new bachelorController();

/**
 * @swagger
 * /bachelor:
 *   post:
 *     tags:
 *       - Bachelor
 *     summary: Create a new bachelor
 *     description: Create a new bachelor record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bachelor'
 *     responses:
 *       201:
 *         description: Bachelor created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.route('')
    .post(controller.create)

/**
 * @swagger
 * /bachelor/userid:
 *   get:
 *     tags:
 *       - Bachelor
 *     summary: Get a bachelor by user ID
 *     description: Retrieve a bachelor record by user ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Bachelor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bachelor'
 *       404:
 *         description: Bachelor not found
 *       401:
 *         description: Unauthorized
 */
router.route('/userid')
    .get(controller.getByUserId)

/**
 * @swagger
 * /bachelor/{id}:
 *   get:
 *     tags:
 *       - Bachelor
 *     summary: Get a bachelor by ID
 *     description: Retrieve a bachelor record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The bachelor ID
 *     responses:
 *       200:
 *         description: Bachelor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bachelor'
 *       404:
 *         description: Bachelor not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .get(authMiddleware, controller.get)

/**
 * @swagger
 * /bachelor/{id}:
 *   patch:
 *     tags:
 *       - Bachelor
 *     summary: Update a bachelor by ID
 *     description: Update a bachelor record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The bachelor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bachelor'
 *     responses:
 *       200:
 *         description: Bachelor updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Bachelor not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .patch(authMiddleware, controller.update)

/**
 * @swagger
 * /bachelor/{id}:
 *   delete:
 *     tags:
 *       - Bachelor
 *     summary: Delete a bachelor by ID
 *     description: Delete a bachelor record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The bachelor ID
 *     responses:
 *       204:
 *         description: Bachelor deleted successfully
 *       404:
 *         description: Bachelor not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .delete(authMiddleware, controller.delete)
    
export default router
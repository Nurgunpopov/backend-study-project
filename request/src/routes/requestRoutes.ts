import express from "express";
import { authMiddleware } from "../middleware";
import requestController from '../controllers/requestController';

const router: express.Router = express.Router();
const controller = new requestController();

/**
 * @swagger
 * /request:
 *   post:
 *     tags:
 *       - Request
 *     summary: Create a new request
 *     description: Create a new request record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       201:
 *         description: Request created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.route('')
    .post(authMiddleware, controller.create);

/**
 * @swagger
 * /request/getAll:
 *   get:
 *     tags:
 *       - Request
 *     summary: Get all requests
 *     description: Retrieve a list of all requests
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
 *                 $ref: '#/components/schemas/Request'
 *       401:
 *         description: Unauthorized
 */
router.route('/getAll')
    .get(authMiddleware, controller.getAll);

// router.route('/changeStatus/:id')
//     .patch(authMiddleware, controller.changeStatus)

/**
 * @swagger
 * /request/{id}:
 *   get:
 *     tags:
 *       - Request
 *     summary: Get a request by ID
 *     description: Retrieve a request record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The request ID
 *     responses:
 *       200:
 *         description: Request retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       404:
 *         description: Request not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .get(authMiddleware, controller.get);

/**
 * @swagger
 * /request/{id}:
 *   patch:
 *     tags:
 *       - Request
 *     summary: Update a request by ID
 *     description: Update a request record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       200:
 *         description: Request updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Request not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .patch(authMiddleware, controller.update);

/**
 * @swagger
 * /request/{id}:
 *   delete:
 *     tags:
 *       - Request
 *     summary: Delete a request by ID
 *     description: Delete a request record by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The request ID
 *     responses:
 *       204:
 *         description: Request deleted successfully
 *       404:
 *         description: Request not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .delete(authMiddleware, controller.delete);

export default router;
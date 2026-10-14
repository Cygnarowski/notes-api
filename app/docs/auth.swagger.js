/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@test.pl
 *               password:
 *                 type: string
 *                 example: Test1234!
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request data
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@test.pl
 *               password:
 *                 type: string
 *                 example: Test1234!
 *     responses:
 *       200:
 *         description: User login successfully
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

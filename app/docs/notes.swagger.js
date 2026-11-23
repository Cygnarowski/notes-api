/**
 * @openapi
 * /api/notes:
 *   get:
 *     summary: Get user notes a new user
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Number of notes per page
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter notes by title
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         description: Filter notes by content
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter notes by tag
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description: Filter notes by status
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [createdAt]
 *           default: createdAt
 *         description: Sort notes by field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: User registered successfully
 *       401:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /api/notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: note ID
 *     responses:
 *       200:
 *         description: Note retrieved successfully
 *       400:
 *         description: Invalid note ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: title
 *               content:
 *                 type: string
 *                 example: content
 *               tag:
 *                 type: array
 *                 items:
 *                 example: ["home", "work"]
 *               status:
 *                 type: boolen
 *                 example: true
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /api/notes/{id}:
 *   put:
 *     summary: Update an existing note
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: updated title
 *               content:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 200
 *                 example: updated content
 *               tag:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["home", "work"]
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       400:
 *         description: Invalid note ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */

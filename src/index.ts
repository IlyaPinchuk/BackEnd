import express from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'


const jsonBody = express.json()
const app = express()
const port = process.env.PORT || 8080;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
            description: 'API для работы с курсами'
        },
        servers: [
            {url: `http://localhost:${port}`}
        ]
    },
    apis: process.env.NODE_ENV === 'production'
        ? ['./dist/**/*.js']    // Heroku prod: смотреть JS в dist
        : ['./**/*.ts']         // Dev: ts-node
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(jsonBody).use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const db = {
    courses: [
        {
            id: 1,
            title: 'front-end'
        },
        {
            id: 2,
            title: 'back-end'
        },
        {
            id: 3,
            title: 'fr'
        }
    ]
};
app.get('/', (req, res) => {

    res.send('Hello World!');
})

/**
 * @openapi
 * /courses:
 *   get:
 *     tags:
 *      - Courses
 *     summary: Get list
 *     responses:
 *       200:
 *         description: success
 */
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(course => course.title.indexOf(req.query.title as string) > -1);
    }
    res.json(foundCourses);
})

/**
 * @openapi
 * /courses/{id}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Course not found
 */
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(x => x.id === +req.params.id);
    if (!foundCourse) {
        res.status(404).json({message: 'Course not found'});
    }
    res.json(foundCourse);
})

/**
 * @openapi
 * /courses:
 *   post:
 *     tags:
 *     - Courses
 *     summary: Create
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Missing title
 */
app.post('/courses', (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({message: 'Missing title'});
    }
    const course = {
        ...req.body,
        id: +(new Date())
    };
    db.courses.push(course);
    res.status(201).json(course);
})

/**
 * @openapi
 * /courses/{id}:
 *   delete:
 *     tags:
 *     - Courses
 *     summary: Delete by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Course not found
 */
app.delete('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(x => x.id === +req.params.id);
    if (!foundCourse) {
        return res.status(404).json({message: 'Course not found'});
    }
    db.courses = db.courses.filter(x => x.id !== +foundCourse.id);
    res.status(200).json({message: 'Success'});
})

/**
 * @openapi
 * /courses/{id}:
 *   put:
 *    tags:
 *     - Courses
 *     summary: Update by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Course not found
 */
app.put('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(x => x.id === +req.params.id);
    if (!foundCourse) {
        return res.status(404).json({message: 'Course not found'});
    }
    foundCourse.title = req.body.title;
    res.status(200).json(foundCourse);
})


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

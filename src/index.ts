import express = require('express');

const jsonBody = express.json()

const app = express()
const port = 3000


app.use(jsonBody)
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
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(course => course.title.indexOf(req.query.title as string) > -1);
    }
    res.json(foundCourses);
})

app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(x => x.id === +req.params.id);
    if (!foundCourse) {
        res.status(404).json({message: 'Course not found'});
    }
    res.json(foundCourse);
})

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

app.delete('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(x => x.id === +req.params.id);
    if (!foundCourse) {
        return res.status(404).json({message: 'Course not found'});
    }
    db.courses = db.courses.filter(x => x.id !== +foundCourse.id);
    res.status(200).json({message: 'Success'});
})

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

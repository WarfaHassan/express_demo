const express = require('express')
const router = express.Router()

const courses = [
    {id: 1, name: 'math'},
    {id: 2, name: 'science'},
    {id: 3, name: 'gym'}
]



router.get('/', (req, res)=>{
    res.send(courses)
})

router.get('/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given id was not found')
    else res.send(course)
})

router.post('/', (req, res) =>{
    const {error} = validateCourse(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)

})

router.put('/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404
    //update course
    //Return the updated course

    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) return res.status(404).send("No course for given ID")

    const { error } = validateCourse(req.body)

    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }

    course.name = req.body.name
    res.send(course)
        

})

router.delete('/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course){ return res.status(404).send("No course for given ID")}

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)

})

function validateCourse(course){

    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)

}

module.exports = router
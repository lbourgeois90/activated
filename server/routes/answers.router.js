const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
var moment = require('moment');



router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in SERVER GET ACTIVATORS');
   
    let user_id = req.user.id;
    let class_id = req.query.class_id;
    let activatorDate = "'" + req.query.date + "'";
    // let activatorDate = moment(req.query.date).toDate();
    // activatorDate = moment(req.query.date).format("YYYY-MM-DD");
    // console.log('Class Id is',req.query.class_id);
    // console.log('Activator Date is', activatorDate);
    pool.query(`SELECT "student_answers"."date", "student_answers"."score", "students"."first_name", "students"."last_name", "questions"."question", "student_answers"."answer", "student_answers"."id" FROM "student_answers" JOIN "students" ON "student_answers"."students_id" = "students"."id" JOIN "questions" ON "questions"."id" = "student_answers"."questions_id" JOIN "user" ON "user"."id" = "students"."user_id" WHERE "student_answers"."date" =  ${activatorDate} AND "questions"."class_id" = ${class_id} ;`)
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch((error) =>{
        console.log(`Error getting answers!`, error);
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
    // console.log('in SERVER SCORE PUT');
    let student_answer_id = req.params.id;
    // console.log('student_answer_id is', student_answer_id);
    // console.log(req.body.score)
    let sqlText = `UPDATE "student_answers" SET "score" = $1 WHERE "id" = $2;`;
    pool.query(sqlText, [req.body.score, student_answer_id])
.then( (result) => {
    res.sendStatus(200);
}).catch( (error) => {
    console.log('Failed to update student score', error);
    res.sendStatus(500);
})
})


router.delete('/:id', (req,res) => {
    console.log('in SERVER ANSWER DELETE');
    let answerId = req.params.id;
    console.log('answerId is,', answerId)
    const sqlText = `DELETE FROM "students" WHERE "id" = $1;`
    pool.query(sqlText, [studentId])
    .then( (result) => {
        res.sendStatus(201);
    })
    .catch( (error) => {
        console.log('ERROR in DELETE', error);
        res.sendStatus(500);
    })
})

router.post('/studentanswer', (req,res) => {
    console.log('in SERVER STUDENT ANSWER POST');
    console.log(req.body);
    let answer = req.body;
    console.log('Answer is', answer)
    const sqlText= `INSERT INTO "student_answers" ("date", "answer", "students_id", "questions_id") VALUES ($1, $2, $3, $4)`
    pool.query(sqlText, [answer.date, answer.answer, answer.student_id, answer.question_id])
    .then( (result) => {
        res.sendStatus(201);
    })
    .catch( (error) => {
        console.log('ERROR in STUDENT ANSWER POST', error);
        res.sendStatus(500);
    })
})




module.exports = router;
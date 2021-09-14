import express, { Application, Request, Response } from 'express';
import HttpError from '../http-error';
import Connection from '../connection'
import e from 'express';
const router = express.Router();

router.post('/guessLatter', async (req, res, next) => {
    const {latter, wordId} = req.body;
    const sql = 'SELECT l.* FROM latters l WHERE l.word_id = ? AND l.latter = ?'
    // Connection.query(`SELECT l.* FROsM latters l WHERE l.word_id = ${wordId} AND l.latter = ${latter}`)
    Connection.query(sql, [wordId, latter],
        (err, results) => {
        if(err) throw err;
        console.log(JSON.parse(JSON.stringify(results)))
        if(JSON.parse(JSON.stringify(results)).length > 0){
            res.send(true);
        }else{
            res.send(false);
        }
})

})

router.get('/allLatters', async(req, res, next) => {
    const sql = 'SELECT l.* FROM latters l';

    Connection.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result)
    })
})


export default router;
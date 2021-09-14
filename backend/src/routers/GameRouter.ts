import express, { Application, Request, Response } from 'express';
import HttpError from '../http-error';
import Connection from '../connection'
const router = express.Router();

router.post('/addNewGame', async (req, res, next) => {
    const {userWord} = req.body;
    const randomGameId: number = Math.floor(Math.random() * 100000);
    const randomWordId: number = Math.floor(Math.random() * 100000);
    const randomLetterId: number = Math.floor(Math.random() * 100000);

    const game = {
        game_id: randomGameId,
        game_players_id: 1,
        game_type_id: 1,
        created_at: new Date(),
        word_id: randomWordId
    }
    const word = {
        word_id: randomWordId,
        word: userWord,
        game_id: randomGameId
    }

    const letterArr = userWord.split('');
    const letterObjs = letterArr.map((el :string, index: number) => {
        return [
            randomLetterId + index,
            el,
            randomWordId,
            0
            ]
        }
    )

    Connection.query('INSERT INTO game SET ?', game, (err, results) => {
        if(err) throw err;
    })

    Connection.query('INSERT INTO word SET ?', word, (err, results) => {
        if(err) throw err;
    })

    Connection.query('INSERT INTO latters (latter_id, latter, word_id, hit) VALUES ?', [letterObjs],  (err, results) => {
        if(err) throw err;
    })

    Connection.query('SELECT g.*, w.* FROM game g LEFT JOIN word w ON g.game_id = w.game_id  WHERE g.game_id = ?', randomGameId, (err, results) => {
        if(err) throw err;
        return res.send(results);
    })
   
})


router.get('/game/:id', async (req, res, next) => {
    const sql = `SELECT g.*, w.* 
                FROM game g 
                LEFT JOIN word w ON g.game_id = w.game_id 
                WHERE g.game_id = ${req.params.id}`;
    Connection.query(sql,  (err, results) => {
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

router.get('/allGames', async (req, res, next) =>{
    const sql = 'SELECT w.word FROM word w';

    Connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send(result)
    })
})








export default router;
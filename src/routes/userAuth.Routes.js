import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/userauth', async(req,res)=>{
    res.render('inicio');
});

export default router;
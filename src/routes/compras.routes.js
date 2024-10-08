import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/comadd', async(req,res)=>{
    res.render('compras/comadd');
});

router.post('/comadd', async(req, res)=>{
    try{
        const {fecha_com, cantidad_com, id_tp_com, id_pro_com} = req.body;
        const newBuy = {
            fecha_com, cantidad_com, id_tp_com, id_pro_com
        }
        await pool.query('INSERT INTO compra SET ?', [newBuy]);
        res.redirect('/comadd');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

export default router;
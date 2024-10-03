import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/comadd', async(req,res)=>{
    const [result] = await pool.query('SELECT * FROM compra');
    res.render('compras/comadd', {compra: result});
});

router.post('/comadd', async(req, res)=>{
    try{
        const {id_com, fecha_com, cantidad_com, id_tp_com, id_pro_com} = req.body;
        const newCompra = {
            id_com, fecha_com, cantidad_com, id_tp_com, id_pro_com
        }
        await pool.query('INSERT INTO compra SET ?', [newCompra]);
        res.redirect('/comlist');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/comlist', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM compra;');
        res.render('compras/comlist', {compra: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/comedit/:id_com', async(req, res)=>{
    try{
        const {id_com} = req.params;
        const [compra] = await pool.query('SELECT * FROM compra WHERE id = ?', [id_com]);
        const [result] = await pool.query('SELECT * FROM compra');
        const compraEdit = compra[0];
        res.render('compras/comedit', {compra:compraEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/comedit/:id_com', async(req, res)=>{
    try{
        const {id_com, fecha_com, cantidad_com, id_tp_com, id_pro_com} = req.body;
        const {id_com} = req.params;
        const editCompra = {id_com, fecha_com, cantidad_com, id_tp_com, id_pro_com};
        await pool.query('UPDATE compra SET ? WHERE id = ?', [editCompra, id]);
        res.redirect('/comlist');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/comdelete/:id_com', async(req, res)=>{
    try{
        const {id_com} = req.params;
        await pool.query('DELETE FROM compra WHERE id = ?', [id_com]);
        res.redirect('/comlist');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;
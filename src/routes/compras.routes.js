import {Router} from 'express'
import pool from '../database.js'

const router = Router();


router.get('/compracrear', async(req,res)=>{
    const [resultper] = await pool.query('SELECT * FROM personas');
    const [resultpro] = await pool.query('SELECT * FROM productos');
    res.render('compras/compracrear', {productos:resultpro, personas:resultper});
});

router.post('/compracrear', async(req, res)=>{
    try{
        const {cantidad_com, fecha_com, id_p_com, id_pro_com} = req.body;
        const newCompra = {
            cantidad_com, fecha_com, id_p_com, id_pro_com
        }
        await pool.query('INSERT INTO compras SET ?', [newCompra]);
        res.redirect('/compralistar');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/compralistar', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT p.name, pro.nombre_pro, date_format(c.fecha_com,\'%m/%d/%Y\') fecha, c.cantidad_com, c.id_com FROM personas p, compras c, productos pro WHERE id_p_com = id AND id_pro_com = id_pro;');
        res.render('compras/compralistar', {compras: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/compraedit/:id_com', async(req, res)=>{
    try{
        const {id_com} = req.params;
        const [compras] = await pool.query('SELECT c.id_pro_com, c.id_p_com, c.cantidad_com, c.id_com, p.id, p.name, pro.id_pro, pro.nombre_pro, date_format(c.fecha_com,\'%Y-%m-%d\') fecha, c.cantidad_com FROM compras c, personas p, productos pro WHERE id_com = ? AND id_p_com = id AND id_pro_com = id_pro;', [id_com]);
        const [result] = await pool.query('SELECT * FROM personas');
        const [resultpro] = await pool.query('SELECT * FROM productos');
        const compraEdit = compras[0];
        res.render('compras/compraeditar', {compras: compraEdit, productos:resultpro, personas: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/compraedit/:id_com', async(req, res)=>{
    try{
        const {cantidad_com, fecha_com, id_p_com, id_pro_com} = req.body;
        const {id_com} = req.params;
        const editCompra = {
            cantidad_com, fecha_com, id_p_com, id_pro_com
        };
        await pool.query('UPDATE compras SET ? WHERE id_com = ?', [editCompra, id_com]);
        res.redirect('/compralistar');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/compradelete/:id_com', async(req, res)=>{
    try{
        const {id_com} = req.params;
        await pool.query('DELETE FROM compras WHERE id_com = ?', [id_com]);
        res.redirect('/compralistar');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

//aqui el router del redireccionamiento del login hacia el inicio

router.get('login/inicio', async(req,res)=>{
    res.render('login/inicio');
});

export default router;
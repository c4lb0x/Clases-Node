import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/prodcrear', async(req,res) => {
    const [result] = await pool.query('SELECT * FROM productos');
    res.render('productos/productocrear', {productos: result});
});

router.post('/prodcrear', async(req, res)=>{
    try{
        const {nombre_pro, descripcion_pro, precio_pro, cantidad_pro} = req.body;
        const newProducto = {
            nombre_pro, descripcion_pro, precio_pro, cantidad_pro
        }
        await pool.query('INSERT INTO productos SET ?', [newProducto]);
        res.redirect('/prodlist');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/prodlist', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM productos');
        res.render('productos/productolistar', {articulos: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/prodedit/:id_pro', async(req, res)=>{
    try{
        const {id_pro} = req.params;
        const [producto] = await pool.query('SELECT * FROM productos WHERE id_pro = ?', [id_pro]);
        const prodEdit = producto[0];
        res.render('productos/productoeditar', {productos: prodEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.post('/prodedit/:id_pro', async(req, res)=>{
    try{
        const {nombre_pro, descripcion_pro, precio_pro, cantidad_pro} = req.body;
        const {id_pro} = req.params;
        const editProducto = {nombre_pro, descripcion_pro, precio_pro, cantidad_pro};
        await pool.query('UPDATE productos SET ? WHERE id_pro = ?', [editProducto, id_pro]);
        res.redirect('/prodlist');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/proddelete/:id_pro', async(req, res)=>{
    try{
        const {id_pro} = req.params;
        await pool.query('DELETE FROM productos WHERE id_pro = ?', [id_pro]);
        res.redirect('/prodlist');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

export default router;
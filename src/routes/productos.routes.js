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

// poner aqui el router de la compra desde aqui

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
        const [result] = await pool.query('SELECT * FROM personas p, compras c, productos pro WHERE id_p_com = id AND id_pro_com = id_pro;');
        res.render('compras/compralistar', {compras: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/compraedit/:id_com', async(req, res)=>{
    try{
        const {id_com} = req.params;
        const [compras] = await pool.query('SELECT * FROM compras WHERE id_com = ?', [id_com]);
        const compraEdit = compras[0];
        res.render('compras/compraeditar', {compras: compraEdit});
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
        await pool.query('UPDATE compras SET ? WHERE id_pro = ?', [editCompra, id_pro]);
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

export default router;
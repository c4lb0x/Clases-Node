import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add', async(req,res)=>{
    const [result] = await pool.query('SELECT * FROM tipoPersona');
    res.render('personas/add', {tipoPersona: result});
});

router.post('/add', async(req, res)=>{
    try{
        const {name, lastname, age, correo, id_tp_p} = req.body;
        const newPersona = {
            name, lastname, age, correo, id_tp_p
        }
        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/list', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM personas p, tipoPersona tp WHERE id_tp = id_tp_p;');
        res.render('personas/list', {personas: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [persona] = await pool.query('SELECT * FROM personas WHERE id = ?', [id]);
        const [result] = await pool.query('SELECT * FROM tipoPersona');
        const personaEdit = persona[0];
        res.render('personas/edit', {persona:personaEdit, tipoPersona:result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id', async(req, res)=>{
    try{
        const {name, lastname, age, correo, id_tp_p} = req.body;
        const {id} = req.params;
        const editPersona = {name, lastname, age, correo, id_tp_p};
        await pool.query('UPDATE personas SET ? WHERE id = ?', [editPersona, id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM personas WHERE id = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;
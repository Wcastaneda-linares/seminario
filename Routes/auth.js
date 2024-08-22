const express = require("express");
const router = express.Router();


    router.get('/tierras',(req, res)=>
    {
        res.render('Tierras')
    })
    router.get('/riegos',(req, res)=>
        {
            res.render('riegos')
        })
        router.get('/pesticidas',(req, res)=>
            {
                res.render('Pesticidas')
            })
            router.get('/plagas',(req, res)=>
                {
                    res.render('plagas')
                })
                router.get('/abonos',(req, res)=>
                    {
                        res.render('abonos')
                    })
             

module.exports= router
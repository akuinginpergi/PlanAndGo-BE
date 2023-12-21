
const express = require('express');
const  uuid = require('short-uuid')
const { PrismaClient} = require('@prisma/client')
let toCSV = require('json-2-csv')

const prisma = new PrismaClient()
const router = express.Router();

router.get('/list-my-plan', async (req, res) => {
  const result = await prisma.$queryRaw`SELECT * FROM pesananku`
  res.send(result)
})

router.get('/list-my-plan/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const datas = await prisma.$queryRaw`SELECT * FROM pesananku WHERE id = ${id}`
    if (!datas) {
      const err = new Error('data ga ada');
      return next(err)
    }
    res.send(datas)
  } catch (err) {
    next(err)
  }
})

router.delete('/list-my-plan/:id', async (req, res) => {
    const id = req.params.id
    await prisma.$executeRaw`DELETE FROM users WHERE kode_pengguna = ${id};`

    res.status(201).send("Data berhasil dihapus!")
})

module.exports = router
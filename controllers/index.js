const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
router.use("/api/users",userRoutes);

const postRoutes = require('./postRoutes');
router.use("/api/posts",postRoutes);

const frontEndRoutes = require('./frontEndController');
router.use("/",frontEndRoutes);

module.exports = router;
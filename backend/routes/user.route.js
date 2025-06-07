// backend/routes/user.route.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET /api/user     → возвращает { benefits: [...] }
router.get('/', userController.getUser);

// POST /api/user    → регистрация нового пользователя
router.post('/', userController.createUser);

// GET /api/user/:id → данные пользователя (без пароля)
router.get('/:id', userController.getUserById);

// PUT /api/user/:id → обновление профиля
router.put('/:id', userController.updateUser);

// DELETE /api/user/:id → удаление пользователя
router.delete('/:id', userController.deleteUser);

module.exports = router;

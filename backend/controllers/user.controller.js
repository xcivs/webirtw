// backend/controllers/user.controller.js

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt'); // npm install bcrypt

// Путь к файлу user.json
const userPath = path.join(__dirname, '../data/user.json');

function readUserData() {
  const raw = fs.readFileSync(userPath, 'utf-8');
  return JSON.parse(raw); // { benefits: [...], users: [...] }
}

function writeUserData(data) {
  fs.writeFileSync(userPath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  /**
   * GET /api/user
   * Возвращаем только benefits (или при наличии сессии – текущее user).
   */
  getUser: (req, res) => {
    try {
      const data = readUserData();
      res.json({ benefits: data.benefits });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка чтения данных пользователей' });
    }
  },

  /**
   * POST /api/user
   * Регистрирует нового пользователя. Принимает JSON в body:
   * { firstName, lastName, gender, email, password }
   */
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, gender, email, password } = req.body;

      // 1) Проверка обязательных полей
      if (!firstName || !lastName || !gender || !email || !password) {
        return res.status(400).json({ message: 'Неверные данные регистрации' });
      }

      // 2) Считываем текущие данные
      const data = readUserData();
      const { users, benefits } = data;

      // 3) Проверяем, что такого email ещё нет
      const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }

      // 4) Хешируем пароль (опционально, но рекомендуется)
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 5) Создаём нового пользователя
      const newUser = {
        id: uuidv4(),
        firstName,
        lastName,
        gender,
        email,
        password: hashedPassword
      };

      // 6) Добавляем его в массив и сохраняем файл
      users.push(newUser);
      writeUserData({ benefits, users });

      // 7) Возвращаем клиенту только публичные поля (без пароля)
      const { id, firstName: fn, lastName: ln, email: em } = newUser;
      res.status(201).json({ id, firstName: fn, lastName: ln, email: em });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка регистрации пользователя' });
    }
  },

  /**
   * GET /api/user/:id
   * Вернуть информацию о конкретном пользователе (без пароля).
   */
  getUserById: (req, res) => {
    try {
      const data = readUserData();
      const { users } = data;
      const { id } = req.params;

      const user = users.find((u) => u.id === id);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      // Удаляем пароль из ответа
      const { password, ...publicData } = user;
      res.json(publicData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка чтения данных пользователя' });
    }
  },

  /**
   * PUT /api/user/:id
   * Обновление профиля (например, firstName, lastName). Не даём менять email и пароль здесь.
   */
  updateUser: (req, res) => {
    try {
      const data = readUserData();
      let { users, benefits } = data;
      const { id } = req.params;
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      // Можно обновлять любые поля кроме id и email
      const updatedFields = { ...req.body };
      delete updatedFields.id;
      delete updatedFields.email;
      // Если пришёл password, его надо хешировать
      if (updatedFields.password) {
        // Мы не будем позволять менять пароль через этот endpoint:
        delete updatedFields.password;
      }

      const updatedUser = { ...users[idx], ...updatedFields };
      users[idx] = updatedUser;
      writeUserData({ benefits, users });

      const { password, ...publicData } = updatedUser;
      res.json(publicData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка обновления пользователя' });
    }
  },

  /**
   * DELETE /api/user/:id
   * Удаляет пользователя из файла.
   */
  deleteUser: (req, res) => {
    try {
      const data = readUserData();
      let { users, benefits } = data;
      const { id } = req.params;
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      const deleted = users.splice(idx, 1)[0];
      writeUserData({ benefits, users });
      const { password, ...publicData } = deleted;
      res.json(publicData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка удаления пользователя' });
    }
  }
};

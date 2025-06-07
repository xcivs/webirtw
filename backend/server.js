// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Для парсинга JSON-тела запросов
app.use(express.json());

// (Опционально) если понадобится CORS, подключим:
// const cors = require('cors');
// app.use(cors());

// Импортируем маршруты (еще не созданные, но позже будем)
const userRoutes = require('./routes/user.route');
const catalogRoutes = require('./routes/catalog.route');
const productRoutes = require('./routes/product.route');
const cartRoutes = require('./routes/cart.route');

// Привязываем каждый набор маршрутов к префиксу
app.use('/api/user', userRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

// Обработчик «ping» для проверки, что сервер запущен
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

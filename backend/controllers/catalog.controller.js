const fs = require('fs');
const path = require('path');

// Путь до каталога с JSON-файлом
const catalogPath = path.join(__dirname, '../data/catalog.json');

function readCatalogData() {
  const raw = fs.readFileSync(catalogPath, 'utf-8');
  return JSON.parse(raw).products; // массив объектов
}

function writeCatalogData(products) {
  // Перезаписываем JSON-файл новыми данными
  const toSave = JSON.stringify({ products }, null, 2);
  fs.writeFileSync(catalogPath, toSave, 'utf-8');
}

module.exports = {
  /**
   * GET /api/catalog
   * Поддерживает query-параметры: page, pageSize, category, search, sortBy
   */
  getAllCatalogItems: (req, res) => {
    try {
      const { page = 1, pageSize = 6, category, search, sortBy } = req.query;
      let products = readCatalogData();

      // 1) Фильтрация по категории
      if (category) {
        products = products.filter((p) => p.category === category);
      }
      // 2) Поиск по названию
      if (search) {
        const q = search.toLowerCase();
        products = products.filter((p) =>
          p.title.toLowerCase().includes(q)
        );
      }
      // 3) Сортировка по цене
      if (sortBy === 'priceAsc') {
        products.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'priceDesc') {
        products.sort((a, b) => b.price - a.price);
      }

      const totalItems = products.length;
      // 4) Пагинация
      const pg = parseInt(page, 10);
      const ps = parseInt(pageSize, 10);
      const start = (pg - 1) * ps;
      const paginatedItems = products.slice(start, start + ps);

      res.json({ items: paginatedItems, totalItems });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка чтения каталога' });
    }
  },

  /**
   * GET /api/catalog/:id
   */
  getCatalogItemById: (req, res) => {
    try {
      const products = readCatalogData();
      const { id } = req.params;
      const found = products.find((p) => p.id === id);
      if (!found) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      res.json(found);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка чтения каталога' });
    }
  },

  /**
   * POST /api/catalog
   * Ожидаем в body: { id, category, title, description, price, image }
   */
  createCatalogItem: (req, res) => {
    try {
      const products = readCatalogData();
      const newItem = req.body;

      // Простейшая проверка: поля должны быть. Можно расширить валидацией.
      if (!newItem.id || !newItem.title) {
        return res.status(400).json({ message: 'Недостаточно данных' });
      }
      products.push(newItem);
      writeCatalogData(products);
      res.status(201).json(newItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка добавления товара' });
    }
  },

  /**
   * PUT /api/catalog/:id
   * Ожидаем в body объект с любыми полями, которые нужно обновить
   */
  updateCatalogItem: (req, res) => {
    try {
      const products = readCatalogData();
      const { id } = req.params;
      const idx = products.findIndex((p) => p.id === id);
      if (idx === -1) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      const updated = { ...products[idx], ...req.body };
      products[idx] = updated;
      writeCatalogData(products);
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка обновления товара' });
    }
  },

  /**
   * DELETE /api/catalog/:id
   */
  deleteCatalogItem: (req, res) => {
    try {
      let products = readCatalogData();
      const { id } = req.params;
      const idx = products.findIndex((p) => p.id === id);
      if (idx === -1) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      const deleted = products.splice(idx, 1)[0];
      writeCatalogData(products);
      res.json({ deleted });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка удаления товара' });
    }
  }
};

// backend/controllers/product.controller.js
const fs = require('fs');
const path = require('path');

// Путь к вашему JSON-файлу с товарами
const productPath = path.join(__dirname, '../data/product.json');

function readProductData() {
  const raw = fs.readFileSync(productPath, 'utf-8');
  return JSON.parse(raw); // { products: [...], related: [...] }
}

module.exports = {
  /**
   * GET /api/product/:id
   * Возвращает { product, related }
   */
  getProductById: (req, res) => {
    try {
      const data = readProductData();
      const { products, related } = data;
      const { id } = req.params;

      // Ищем товар по id
      const product = products.find(p => p.id === id);
      if (!product) {
        return res.status(404).json({ message: 'Товар не найден' });
      }

      // Возвращаем свойство product и массив related
      res.json({
        product,
        related
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка чтения данных продукта' });
    }
  },

  /**
   * GET /api/product
   * (опционально) вернуть весь список products, если понадобятся,
   * но в данном случае не обязательно.
   */
  getAllProducts: (req, res) => {
    try {
      const data = readProductData();
      res.json({ products: data.products, related: data.related });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка получения списка продуктов' });
    }
  }
};

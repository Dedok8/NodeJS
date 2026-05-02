// Оновлена документація для проєкту users_manager_zod

# Users Manager (Mongoose + Zod)

## Структура проєкту

- app.mjs — головний файл застосунку

## Структура проєкту

- app.mjs — головний файл застосунку
- .env — змінні середовища
- config/
  - default.mjs — конфігурація проєкту
- db/
  - db.js — підключення до MongoDB
- models/
  - User.js — mongoose-модель користувача
- controllers/
  - userController.mjs — логіка для користувачів
  - mainController.mjs — логіка для головної сторінки
- services/
  - userService.js — CRUD-операції з користувачами
- routes/
  - userRoutes.mjs — маршрути для користувачів
  - index.mjs — маршрут для головної сторінки
- middlewares/
  - errorHandler.js — глобальний обробник помилок
  - validationMiddleware.js — middleware для валідації
- validation/
  - user.schema.js — схема валідації для zod
- public/
  - javascripts/ — клієнтські скрипти
  - stylesheets/ — стилі
- views/
  - \*.ejs — шаблони EJS
  - error.ejs — шаблон для помилок

## Основні API endpoints

- GET /users — список користувачів
- GET /users/register/:id? — форма реєстрації/редагування
- POST /users/register/:id? — створення/оновлення користувача
- DELETE /users — видалення користувача

## Приклади запитів

### Створення користувача

POST /users/register
{
"name": "Іван",
"email": "ivan@email.com",
"password": "Qwerty1!"
}

### Оновлення користувача

POST /users/register/1234567890abcdef
{
"name": "Петро",
"email": "petro@email.com",
"password": "Test123!"
}

### Видалення користувача

DELETE /users
{
"id": "1234567890abcdef"
}

## Запуск

1. Встановити залежності:
   npm install
2. Запустити MongoDB (локально або через MongoDB Atlas)
3. Запустити застосунок:
   npm start

## Тестування

- Додати unit та integration тести (Jest/Mocha)

---

Для питань — звертайтесь до README або коментарів у коді.

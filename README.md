# Backend API (Express + TypeScript)

Простой учебный backend на **Express** с поддержкой CRUD для сущности `courses`.

## 🚀 Запуск локально

```bash
# установка зависимостей
npm install

# запуск в dev режиме (ts-node + nodemon)
npm run dev

# сборка в dist/
npm run build

# запуск собранного JS (использует dist/index.js)
npm start
```

Сервер по умолчанию поднимается на [http://localhost:8080](http://localhost:8080).

Превью на Heroku: https://backendtest-f16f4a420396.herokuapp.com

---

## 📌 Endpoints

### GET `/`
Возвращает строку `Hello World!`.

### GET `/courses`
Возвращает список курсов.
Можно фильтровать по `?title=...`.

### GET `/courses/:id`
Возвращает курс по ID.
`404` если курс не найден.

### POST `/courses`
Создаёт новый курс.
Тело запроса (JSON):
```json
{
  "title": "New course"
}
```

### PUT `/courses/:id`
Обновляет название курса по ID.
Тело запроса (JSON):
```json
{
  "title": "Updated name"
}
```

### DELETE `/courses/:id`
Удаляет курс по ID.
Возвращает `{ "message": "Success" }`.

---

## 🌐 Деплой на Heroku

1. Убедитесь, что в `package.json` есть:
   ```json
   "scripts": {
     "build": "tsc",
     "start": "node dist/index.js"
   }
   ```
2. Добавьте в корень проекта файл `Procfile`:
   ```
   web: npm start
   ```
3. Выполните:
   ```bash
   git push heroku main
   ```

---

## 📖 Технологии

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Nodemon](https://nodemon.io/)


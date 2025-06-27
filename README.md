
### Sistema de Autenticação Node.js + MySQL

---
#### Objetivo
Construir um backend em Node.js com Express que permite o registro, login e autenticação JWT de usuários, armazenando tudo em um banco MySQL. O sistema foi testado usando o Postman.

#### Tecnologias Utilizadas
- [x] Node.js (ES Modules)
- [x] Express.js
- [x] MySQL2
- [x] bcrypt (para hashing de senhas)
- [x] jsonwebtoken (JWT)
- [x] dotenv (variáveis de ambiente)
- [x] CORS
- [x] Postman (testes de requisição)

---
### Imagem do autor
![Captura de tela 2025-06-25 212421](https://github.com/user-attachments/assets/6be5893e-7ee5-4a2f-9333-c923556e0fca)

---
### Rotas definidas
- [x] GET http://localhost:3000/api/home -> /home (200 ok)
- [x] POST http://localhost:3000/api/register -> /register (201 ok)
- [x] POST http://localhost:3000/api/login -> /login (200 ok)
- [x] POST http://localhost:3000/api/logoutAccount -> /logoutAccount (200 ok) 

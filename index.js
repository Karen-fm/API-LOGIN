import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Dados em memória
const users = [
  {
    username: "user1",
    password: "senha123",
    email: "user1@email.com",
    attempts: 0,
    blocked: false,
  },
];

// Contador global de tentativas inválidas
let globalInvalidAttempts = 0;

// Swagger config
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API REST de Login",
      version: "1.0.0",
      description: "API REST de estudo para login, bloqueio e lembrar senha.",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./index.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Usuário ou senha inválidos
 *       403:
 *         description: Usuário bloqueado
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  // Se login é inválido (usuário não existe OU senha errada)
  if (!user || (user && user.password !== password)) {
    globalInvalidAttempts++;

    if (globalInvalidAttempts >= 3) {
      return res.status(403).json({ message: "Usuário bloqueado" });
    }

    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  }

  // Login correto
  if (user.blocked) user.blocked = false;
  user.attempts = 0;
  return res.status(200).json({ message: "Login realizado com sucesso" });
});

/**
 * @swagger
 * /lembrar-senha:
 *   post:
 *     summary: Solicita lembrete de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lembrete enviado
 *       404:
 *         description: Email não encontrado
 */
app.post("/lembrar-senha", (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "Email não encontrado" });
  // Simula envio de email
  return res
    .status(200)
    .json({ message: "Lembrete de senha enviado para o email" });
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
  console.log("Swagger em http://localhost:3000/api-docs");
});

export default app;

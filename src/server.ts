import app from "./app";
import { env } from "./config/env";
import prisma from "./config/prisma";

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ PostgreSQL Connected");

    app.listen(env.PORT, () => {
      console.log(`
==========================================
🚀 Maidyone Backend Started
🌍 Environment : ${env.NODE_ENV}
📦 Port        : ${env.PORT}
==========================================
`);
    });
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

startServer();
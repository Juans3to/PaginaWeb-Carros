// server.js
import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Servidor de Calificaciones corriendo en puerto ${PORT}`);
});

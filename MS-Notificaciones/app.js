import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

// Configurar transporte con Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Ruta dinámica para enviar correo
app.post("/notificaciones/enviar", async (req, res) => {
  const { para, asunto, mensaje } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"Notificaciones Carros" <${process.env.EMAIL_USER}>`,
      to: para, // correo de la persona
      subject: asunto,
      text: mensaje,
    });

    console.log("Mensaje enviado: %s", info.messageId);
    res.json({ ok: true, mensaje: "📩 Notificación enviada con éxito" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Levantar servidor en 3004
app.listen(3004, () => {
  console.log("Microservicio de notificaciones corriendo en http://localhost:3004");
});
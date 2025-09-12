const nodemailer = require('nodemailer');
require('dotenv').config();

async function main() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        let info = await transporter.sendMail({
            from: `"Test Notificaciones" <${process.env.EMAIL_USER}>`,
            to: "grueso2412@gmail.com",  
            subject: "🔔 Prueba de correo",
            text: "Hola Juan, este es un correo de prueba desde Nodemailer 🚀"
        });

        console.log("✅ Correo enviado:", info.response);
    } catch (error) {
        console.error("❌ Error enviando correo:", error);
    }
}

main();

const express = require('express');
const router = express.Router();
const transporter = require('../config/nodemailer'); 

// Ruta para enviar correos
router.post('/enviar', async (req, res) => {
    const { para, asunto, mensaje } = req.body;

    try {
        const info = await transporter.sendMail({
            from: `"Notificaciones Carros" <${process.env.EMAIL_USER}>`,
            to: para,
            subject: asunto,
            text: mensaje
        });

        res.json({ ok: true, info });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

module.exports = router;

const { json } = require("express");
const authService = require("../services/auth.service.js");
const { messages } = require("../utils/messages.js");
const JWT = require("jsonwebtoken");

exports.render = async (req, res) => {
  const { user } = req.session;
  if (!user) res.status(403).send({ message: messages.error.loginFalse });
  res.render("example", user); // user tendrá el {id, username} que retornamos de loginController
};

exports.validateSession = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(200).json({ authenticated: false, message: "No token provided" });
  }

  try {
    const data = JWT.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ 
      authenticated: true, 
      user: data 
    });
  } catch (error) {
    return res.status(200).json({ 
      authenticated: false, 
      message: "Invalid token" 
    });
  }
};


exports.protected = async (req, res) => {
  const { user } = req.session;
  if (!user) res.status(403).send({ message: messages.auth.loginFalse });
  res.render("protected", user);
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const access = await authService.loginService(email, password);
    if (!access) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }
    const token = JWT.sign(
      { id: access.id, username: access.name },
      process.env.JWT_SECRET, //token hasheado y seguro
      {
        expiresIn: "10h", //expiración del token--verificar
        // secure: process.env.NODE_ENV === 'production', //la cookie solo se puede acceder en https
        // sameSite: 'strict' //la cookie solo se puede acceder en mi dominio
      }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true, // Guardar token en cookies: la cookie solo se puede acceder en el sv, no se podrá leer desde JS, una capa más de seguridad
      })
      .json({
        success: true,
        data: access,
        message: messages.auth.loginTrue,
      });

  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });

  }
};

exports.registerController = async (req, res) => {
  try {
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

exports.logoutController = async (req, res) => {
  res
  .clearCookie('access_token')
  .json({
    success: true,
    message: messages.auth.logout,
  })

};

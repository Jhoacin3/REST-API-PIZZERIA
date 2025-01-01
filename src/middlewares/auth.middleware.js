const JWT = require("jsonwebtoken");
//Nota: Lo que se pretende es que lo repititivo se haga en este middleware y no estar pendiente que en todas los métodos extraer el token, procesarlo, etc

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  req.session = {user: null}
  
  if (!token) {
    return res.status(403).json({ message: "No se proporcionó la llave de acceso" });
  }
  try {
    const data = JWT.verify(token, process.env.JWT_SECRET);
    req.session.user = data
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
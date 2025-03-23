const {app, server} = require('../server')
const request = require('supertest')

test('verificar si retorna menus y codigo 200', async () => {
    const response = await request(app)
    .get('/apiPizza/menu/getMenu')
    .expect('Content-Type', /application\/json/) // apuntes:  Verificamos que la respuesta sea JSON
    .expect(200); //apuntes: Verificamos el código de estado
    console.log(response.body).toHaveLength(1); //apuntes: (toHaveLength )Verificamos que la respuesta tenga un tamaño de 1
})

//para cerrar el servidor
afterAll(()=> {
    server.close();
})

const {app, server} = require('../server')
const request = require('supertest')

test('El edpoints debe de retornar un arreglo de objetos y codigo 200', async () => {
    const response = await request(app)
    .get('/apiPizza/menu/getMenu')
    .expect('Content-Type', /application\/json/) // apuntes:  Verificamos que la respuesta sea JSON
    .expect(200); //apuntes: Verificamos el código de estado
    // console.log(response)
})

//para cerrar el servidor
afterAll(() => {
    server.close();
})

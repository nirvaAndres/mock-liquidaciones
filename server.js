const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const server = http.createServer(app);

// Aca esta la data mock utilizada para este proyecto
const dataMock = [
  {
    issueDate: '2024-12-16',
    issueTime: '10:31:00',
    totalTransaction: 0,
    settledAmount: 0,
    taxAmount: 0,
    totalCommissionAmount: 0,
    collectionsDebts: 0,
    totalCredited: 0,
    state: 'empty',
    url: 'https://example.com/report1',
  },
  {
    issueDate: '2024-12-15',
    issueTime: '10:31:00',
    totalTransaction: 0,
    settledAmount: 0,
    taxAmount: 0,
    totalCommissionAmount: 0,
    collectionsDebts: 0,
    totalCredited: 0,
    state: 'empty',
    url: 'https://example.com/report2',
  },
  {
    issueDate: '2024-12-14',
    issueTime: '10:31:00',
    totalTransaction: 0,
    settledAmount: 0,
    taxAmount: 0,
    totalCommissionAmount: 0,
    collectionsDebts: 0,
    totalCredited: 0,
    state: 'empty',
    url: 'https://example.com/report3',
  },
  {
    issueDate: '2024-12-13',
    issueTime: '10:31:00',
    totalTransaction: 0,
    settledAmount: 0,
    taxAmount: 0,
    totalCommissionAmount: 0,
    collectionsDebts: 0,
    totalCredited: 0,
    state: 'empty',
    url: 'https://example.com/report4',
  },
  {
    issueDate: '2024-12-12',
    issueTime: '10:31:00',
    totalTransaction: 20,
    settledAmount: 5000000,
    taxAmount: 10000,
    totalCommissionAmount: 250000,
    collectionsDebts: 30000,
    totalCredited: 6000000,
    state: 'uninitialized',
    url: 'https://example.com/report5',
  },
  {
    issueDate: '2024-12-11',
    issueTime: '10:31:00',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'uninitialized',
    url: 'https://example.com/report6',
  },
  {
    issueDate: '2024-12-10',
    issueTime: '10:31:00',
    totalTransaction: 9,
    settledAmount: 1900000,
    taxAmount: 3800,
    totalCommissionAmount: 95000,
    collectionsDebts: 14000,
    totalCredited: 2800000,
    state: 'uninitialized',
    url: 'https://example.com/report7',
  },
  {
    issueDate: '2024-12-09',
    issueTime: '10:31:00',
    totalTransaction: 12,
    settledAmount: 2400000,
    taxAmount: 4800,
    totalCommissionAmount: 120000,
    collectionsDebts: 17000,
    totalCredited: 3500000,
    state: 'uninitialized',
    url: 'https://example.com/report8',
  },
  {
    issueDate: '2024-12-08',
    issueTime: '10:31:00',
    totalTransaction: 15,
    settledAmount: 3000000,
    taxAmount: 6000,
    totalCommissionAmount: 150000,
    collectionsDebts: 25000,
    totalCredited: 4500000,
    state: 'uninitialized',
    url: 'https://example.com/report9',
  },
  {
    issueDate: '2024-12-07',
    issueTime: '10:31:00',
    totalTransaction: 6,
    settledAmount: 1200000,
    taxAmount: 2400,
    totalCommissionAmount: 60000,
    collectionsDebts: 7000,
    totalCredited: 1800000,
    state: 'uninitialized',
    url: 'https://example.com/report10',
  },
  {
    issueDate: '2024-12-06',
    issueTime: '10:31:00',
    totalTransaction: 11,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'uninitialized',
    url: 'https://example.com/report11',
  },
  {
    issueDate: '2024-12-05',
    issueTime: '10:31:00',
    totalTransaction: 8,
    settledAmount: 1600000,
    taxAmount: 3200,
    totalCommissionAmount: 80000,
    collectionsDebts: 12000,
    totalCredited: 2400000,
    state: 'uninitialized',
    url: 'https://example.com/report12',
  },
  {
    issueDate: '2024-12-04',
    issueTime: '10:31:00',
    totalTransaction: 14,
    settledAmount: 2800000,
    taxAmount: 5600,
    totalCommissionAmount: 140000,
    collectionsDebts: 19000,
    totalCredited: 4200000,
    state: 'complete',
    url: 'https://example.com/report13',
  },
  {
    issueDate: '2024-12-03',
    issueTime: '10:31:00',
    totalTransaction: 5,
    settledAmount: 1000000,
    taxAmount: 2000,
    totalCommissionAmount: 50000,
    collectionsDebts: 5000,
    totalCredited: 1500000,
    state: 'regenerate',
    url: 'https://example.com/report14',
  },
  {
    issueDate: '2024-12-02',
    issueTime: '10:31:00',
    totalTransaction: 20,
    settledAmount: 5000000,
    taxAmount: 10000,
    totalCommissionAmount: 250000,
    collectionsDebts: 30000,
    totalCredited: 6000000,
    state: 'empty',
    url: 'https://example.com/report15',
  },
  {
    issueDate: '2024-12-01',
    issueTime: '10:31:00',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'pending',
    url: 'https://example.com/report16',
  },
  {
    issueDate: '2024-11-30',
    issueTime: '10:31:00',
    totalTransaction: 9,
    settledAmount: 1900000,
    taxAmount: 3800,
    totalCommissionAmount: 95000,
    collectionsDebts: 14000,
    totalCredited: 2800000,
    state: 'uninitialized',
    url: 'https://example.com/report17',
  },
  {
    issueDate: '2024-11-29',
    issueTime: '10:31:00',
    totalTransaction: 12,
    settledAmount: 2400000,
    taxAmount: 4800,
    totalCommissionAmount: 120000,
    collectionsDebts: 17000,
    totalCredited: 3500000,
    state: 'complete',
    url: 'https://example.com/report18',
  },
  {
    issueDate: '2024-11-28',
    issueTime: '10:31:00',
    totalTransaction: 15,
    settledAmount: 3000000,
    taxAmount: 6000,
    totalCommissionAmount: 150000,
    collectionsDebts: 25000,
    totalCredited: 4500000,
    state: 'regenerate',
    url: 'https://example.com/report19',
  },
  {
    issueDate: '2024-11-27',
    issueTime: '10:31:00',
    totalTransaction: 6,
    settledAmount: 1200000,
    taxAmount: 2400,
    totalCommissionAmount: 60000,
    collectionsDebts: 7000,
    totalCredited: 1800000,
    state: 'empty',
    url: 'https://example.com/report20',
  },
  {
    issueDate: '2024-11-26',
    issueTime: '10:31:00',
    totalTransaction: 11,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'pending',
    url: 'https://example.com/report21',
  },
  {
    issueDate: '2024-11-25',
    issueTime: '10:31:00',
    totalTransaction: 8,
    settledAmount: 1600000,
    taxAmount: 3200,
    totalCommissionAmount: 80000,
    collectionsDebts: 12000,
    totalCredited: 2400000,
    state: 'uninitialized',
    url: 'https://example.com/report22',
  },
  {
    issueDate: '2024-11-24',
    issueTime: '10:31:00',
    totalTransaction: 14,
    settledAmount: 2800000,
    taxAmount: 5600,
    totalCommissionAmount: 140000,
    collectionsDebts: 19000,
    totalCredited: 4200000,
    state: 'complete',
    url: 'https://example.com/report23',
  },
  {
    issueDate: '2024-11-23',
    issueTime: '10:31:00',
    totalTransaction: 5,
    settledAmount: 1000000,
    taxAmount: 2000,
    totalCommissionAmount: 50000,
    collectionsDebts: 5000,
    totalCredited: 1500000,
    state: 'regenerate',
    url: 'https://example.com/report24',
  },
  {
    issueDate: '2024-11-22',
    issueTime: '10:31:00',
    totalTransaction: 20,
    settledAmount: 5000000,
    taxAmount: 10000,
    totalCommissionAmount: 250000,
    collectionsDebts: 30000,
    totalCredited: 6000000,
    state: 'empty',
    url: 'https://example.com/report25',
  },
  {
    issueDate: '2024-11-21',
    issueTime: '10:31:00',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2024-11-21',
    issueTime: '10:31:00',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2024-11-21',
    issueTime: '10:31:00',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2024-11-21',
    issueTime: '10:31:00',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2024-11-21',
    issueTime: '10:31:00',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2024-11-21',
    issueTime: '10:31:00',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2024-11-21',
    issueTime: '10:31:00',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
];

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Crear un servidor WebSocket
const wss = new WebSocket.Server({ server });

// Middleware para parsear el cuerpo de las solicitudes POST como JSON
app.use(express.json());

// Aca esta la conexion al web socket el cual escucha  y envia los estados en tiempo real
// Cuando un cliente se conecta al WebSocket
wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');

  // Enviar un mensaje de bienvenida cuando un cliente se conecta
  ws.send(JSON.stringify({ message: 'Bienvenido a la comunicación en tiempo real!' }));

  // Escuchar por mensajes del cliente
  ws.on('message', (data) => {
    try {
      const receivedData = JSON.parse(data); // Parsear el mensaje JSON

      // Puedes procesar el JSON aquí (por ejemplo, mostrarlo en consola)
      // Luego, se puede emitir una respuesta o manejar lo que desees

      // Al momento de generarse la solicitud pasa a estado pendiente
      // El menssage acá es un ejemplo de como se mostraran los mensajes en el snack bar o mensajes
      // toast, es decir de ahi se tomaran.
      ws.send(
        JSON.stringify({
          requestId: 'req-12345',
          status: 'PENDING',
          message: 'La solicitud ha sido recibida y está en proceso de creación de archivo.',
          issueDate: receivedData.date.specificDay,
        })
      );

      // Y luego todo sale bien y se puede descargar el archivo
      // Estos set time out son para simular distintas respuestas en un lapso de tiempo
      setTimeout(() => {
        ws.send(
          JSON.stringify({
            requestId: 'req-12346',
            status: 'REGENERATE',
            message: 'Error en la generación del consolidado.',
            issueDate: receivedData.date.specificDay,
          })
        );
      }, 4000);

      // Supongamos que se presenta un problema en la generación del archivo
      setTimeout(() => {
        ws.send(
          JSON.stringify({
            requestId: 'req-12347',
            status: 'COMPLETE',
            message: 'Consolidado generado exitosamente.',
            downloadUrl: 'https://example-bucket.s3.amazonaws.com/procesados/file.csv?signature=abc123',
            issueDate: receivedData.date.specificDay,
          })
        );
      }, 8000);
    } catch (error) {
      ws.send(
        JSON.stringify({
          requestId: 'req-12348',
          status: 'REGENERATE',
          message: 'Error en la generación del consolidado.',
          issueDate: receivedData.date.specificDay,
        })
      );
    }
  });

  // Cuando un cliente se desconecta
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// Este es el servicio mock que construi con la finalidad de traer el resumen
app.post('/consolidados', (req, res) => {
  // Asegurarnos de que page y limit sean números
  const pageNumber = req.body.pagination.page;
  const limitNumber = req.body.pagination.pageSize || 25;

  // Calcular el índice inicial y final para la paginación
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  // Obtener los registros paginados
  const result = dataMock.slice(startIndex, endIndex);

  // Devolver la respuesta con los registros y la información de paginación
  res.json({
    code: 1,
    message: 'Created',
    date: '2024-12-12',
    time: '15:17:50.305247271',
    data: {
      data: {
        standard: result,
        addcolumns: null,
      },
      pagination: {
        page: req.body.pagination.page,
        pageSize: limitNumber,
        totalRecords: dataMock.length,
        totalPages: Math.ceil(dataMock.length / limitNumber),
      },
      status: {
        code: 200,
        message: 'Success',
      },
    },
  });
});

// Servir archivos estáticos (como el archivo HTML del cliente)
app.use(express.static('public'));

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});

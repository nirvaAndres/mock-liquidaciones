const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const server = http.createServer(app);

// Aca esta la data mock utilizada para este proyecto
const dataMock = [
  {
    issueDate: '2025-03-20',
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
    issueDate: '2025-03-19',
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
    issueDate: '2025-03-17',
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
    issueDate: '2025-03-16',
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
    issueDate: '2025-03-15',
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
    issueDate: '2025-03-14',
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
    issueDate: '2025-03-13',
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
    issueDate: '2025-03-12',
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
    issueDate: '2025-03-11',
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
    issueDate: '2025-03-10',
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
    issueDate: '2025-03-09',
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
    issueDate: '2025-03-08',
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
    issueDate: '2025-03-07',
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
    issueDate: '2025-03-06',
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
    issueDate: '2025-03-05',
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
    issueDate: '2025-03-04',
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
    issueDate: '2025-03-03',
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
    issueDate: '2025-03-02',
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
    issueDate: '2025-03-01',
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
    issueDate: '2025-02-29',
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
    issueDate: '2025-02-28',
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
    issueDate: '2025-02-27',
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
    issueDate: '2025-02-26',
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
    issueDate: '2025-02-25',
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
    issueDate: '2025-02-24',
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
    issueDate: '2025-02-23',
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
    issueDate: '2025-02-22',
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
    issueDate: '2025-02-21',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2025-02-20',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2025-02-19',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2025-02-18',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2025-02-17',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2025-02-16',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
  {
    issueDate: '2025-02-15',
    totalTransaction: 10,
    settledAmount: 2200000,
    taxAmount: 4400,
    totalCommissionAmount: 110000,
    collectionsDebts: 16000,
    totalCredited: 3300000,
    state: 'complete',
  },
];

const dataMockMonth = [
  {
    issueDate: 'Marzo 2025',
    totalTransaction: 12,
    settledAmount: 2400000,
    taxAmount: 4800,
    totalCommissionAmount: 120000,
    collectionsDebts: 17000,
    totalCredited: 3500000,
    state: 'uninitialized',
    url: 'https://example.com/report18',
  },
  {
    issueDate: 'Febrero 2025',
    totalTransaction: 15,
    settledAmount: 3000000,
    taxAmount: 6000,
    totalCommissionAmount: 150000,
    collectionsDebts: 25000,
    totalCredited: 4500000,
    state: 'uninitialized',
    url: 'https://example.com/report19',
  },
  {
    issueDate: 'Enero 2025',
    totalTransaction: 12,
    settledAmount: 2400000,
    taxAmount: 4800,
    totalCommissionAmount: 120000,
    collectionsDebts: 17000,
    totalCredited: 3500000,
    state: 'uninitialized',
    url: 'https://example.com/report18',
  },
];

const generateRut = () => {
  const randomNumber = Math.floor(1000000 + Math.random() * 90000000); // Número entre 1.000.000 y 99.999.999
  const digits = randomNumber.toString().split('').reverse();
  let sum = 0;
  let multiplier = 2;

  for (let digit of digits) {
    sum += parseInt(digit) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const dv = remainder === 0 ? '0' : remainder === 1 ? 'K' : (11 - remainder).toString();

  return `${randomNumber}-${dv}`;
};

const generateRandomDate = () => {
  const year = 2024;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generateMockData = () => {
  return {
    customerId: generateRut(),
    branchCode: Math.floor(Math.random() * 1000),
    settlementDate: generateRandomDate(),
    transactionDate: generateRandomDate(),
    transactionTime: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    tip: Math.floor(Math.random() * 10000),
    change: Math.floor(Math.random() * 5000),
    totalAmount: Math.floor(Math.random() * 100000),
    salesTax: Math.floor(Math.random() * 19000),
    netSales: Math.floor(Math.random() * 81000),
    commissionExcludingTax: Math.floor(Math.random() * 5000),
    taxOnCommission: parseFloat((Math.random() * 1000).toFixed(2)),
    commission: Math.floor(Math.random() * 6000),
    paidAmount: Math.floor(Math.random() * 100000),
    klapCode: Math.floor(Math.random() * 1000000),
    branch: `Sucursal ${Math.floor(Math.random() * 100)}`,
    terminal: Math.floor(Math.random() * 100000),
    installments: `${Math.floor(Math.random() * 12) + 1}`,
    liquidatedInstallment: `${Math.floor(Math.random() * 12) + 1}`,
    channel: 'Online',
    transactionType: 'Compra',
    brand: 'Visa',
    consumerTransactionId: Math.floor(Math.random() * 10000000),
    originalMcCode: Math.floor(Math.random() * 100000),
    fixedCommission: parseFloat((Math.random() * 1000).toFixed(2)),
    variableCommission: parseFloat((Math.random() * 5).toFixed(2)),
    interchangeRate: parseFloat((Math.random() * 2).toFixed(2)),
    brandCost: parseFloat((Math.random() * 3).toFixed(2)),
    acquiringMargin: Math.floor(Math.random() * 1000),
    issuer: 'Banco X',
    accountType: 'Corriente',
    accountNumber: `00${Math.floor(Math.random() * 99999999)}`,
    cardNumber: Math.floor(Math.random() * 99999999),
    year: '2024',
    month: String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'),
    day: String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'),
  };
};

const dataMockPersonalizado = Array.from({ length: 32 }, generateMockData);

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

  // Escuchar por mensajes del cliente
  ws.on('message', (data) => {
    try {
      //personalizado
      const receivedData = JSON.parse(data); // Parsear el mensaje JSON

      // Verificar que el mensaje contiene la acción 'register'
      if (receivedData.action === 'register' && [1, 2, 3].includes(receivedData.requestId)) {
        // Generar la respuesta según el requestId
        const response = generateLiqConsolidateResponse(receivedData.requestId);

        // Enviar la respuesta al cliente
        ws.send(JSON.stringify(response));
        return;
      } else {
        // diario y mensual
        const receivedData = JSON.parse(data); // Parsear el mensaje JSON

        // Puedes procesar el JSON aquí (por ejemplo, mostrarlo en consola)
        // Luego, se puede emitir una respuesta o manejar lo que desees

        // Al momento de generarse la solicitud pasa a estado pendiente
        // El menssage acá es un ejemplo de como se mostraran los mensajes en el snack bar o mensajes
        // toast, es decir de ahi se tomaran.
        ws.send(
          JSON.stringify({
            requestId: 'req-12345',
            status: 'pending',
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
              status: 'regenerate',
              message: 'Error en la generación del consolidado.',
              issueDate: receivedData.date.specificDay,
            })
          );
        }, 2000);

        // Supongamos que se presenta un problema en la generación del archivo
        setTimeout(() => {
          ws.send(
            JSON.stringify({
              requestId: 'req-12347',
              status: 'complete',
              message: 'Consolidado generado exitosamente.',
              downloadUrl: 'https://filesamples.com/samples/document/csv/sample1.csv',
              issueDate: receivedData.date.specificDay,
            })
          );
        }, 4000);
      }
    } catch (error) {
      ws.send(
        JSON.stringify({
          requestId: 'req-12348',
          status: 'regenerate',
          message: 'Error en la generación del consolidado.' + error,
          //issueDate: receivedData.date.specificDay,
        })
      );
    }
  });

  // Cuando un cliente se desconecta
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// Función para generar la respuesta de LiqConsolidateDailyResponse
function generateLiqConsolidateResponse(requestId) {
  const statusMap = {
    1: 'complete',
    2: 'pending',
    3: 'regenerate',
  };

  const response = {
    requestId: requestId,
    status: statusMap[requestId], // Si requestId no es 1 o 3, asignar 'pending'
    downloadUrl: 'https://es.getsamplefiles.com/download/csv/sample-2.csv', // URL estática de descarga
    message: `El proceso para el requestId ${requestId} ha sido procesado.`,
    issueDate: new Date().toISOString().split('T')[0], // Obtener la fecha actual en formato "YYYY-MM-DD"
  };

  return response;
}

// Este es el servicio mock que construi con la finalidad de traer el resumen
app.post('/consolidados', (req, res) => {
  // Asegurarnos de que page y limit sean números
  const pageNumber = req.body.pagination.page;
  const limitNumber = req.body.pagination.pageSize || 25;
  const type = req.body.date.type;

  // Calcular el índice inicial y final para la paginación
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  // Obtener los registros paginados

  if (type === 'month') {
    let result = dataMockMonth.slice(startIndex, endIndex);
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
          totalRecords: dataMockMonth.length,
          totalPages: Math.ceil(dataMockMonth.length / limitNumber),
        },
        status: {
          code: 200,
          message: 'Success',
        },
      },
    });
  } else {
    let result = dataMock.slice(startIndex, endIndex);
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
  }
});

// Endpoint para descargar el reporte
app.post('/consolidated/custom', (req, res) => {
  const pageNumber = req.body.pagination.page;
  const limitNumber = req.body.pagination.pageSize || 25;

  // Calcular el índice de inicio y fin para la paginación
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  // Generar mock data y aplicar paginación
  const allMockData = dataMockPersonalizado; // 32 elementos generados
  const paginatedData = allMockData.slice(startIndex, endIndex);

  // Preparar la respuesta
  const response = {
    code: 1,
    message: 'Reporte descargado exitosamente',
    date: new Date().toISOString().split('T')[0], // Fecha actual (YYYY-MM-DD)
    time: new Date().toISOString().split('T')[1].split('.')[0], // Hora actual (HH:mm:ss)
    data: {
      contentList: paginatedData, // Lista de datos de la página actual
    },
    pagination: {
      page: pageNumber,
      pageSize: limitNumber,
      totalPages: Math.ceil(allMockData.length / limitNumber), // Calcular total de páginas
      totalRecords: allMockData.length, // Total de registros
    },
  };

  // Responder con la estructura ApiResponse
  res.json(response);
});

app.post('/custom/settlement', (req, res) => {
  const { date, filter, output } = req.body;

  // Validar si 'Todas' está presente en el arreglo de filtros
  //   if (filter.includes("Todas") && filter.length > 1) {
  //     return res.status(400).json({
  //       message: "'Todas' no puede estar junto con otros filtros.",
  //       status: "error"
  //     });
  //   }

  // Validar que los valores de filter sean correctos
  const validFilters = [
    'Todas',
    'Hora de Emisión',
    'Código Sucursal',
    'Canal de Venta',
    'Tipo de Tarjeta',
    'Comisión Fija',
    'Comisión Variable',
    'Tasa de Intercambio',
    'Costo de Marca',
    'Margen Adquirente',
    'Consumer Transaction ID',
    'Tipo de Cuenta',
    'N° de Cuenta',
    'BIN de la Tarjeta',
  ];

  const isValid = filter.optionalColumns.every((f) => validFilters.includes(f));

  if (!isValid) {
    return res.status(400).json({
      message: 'Filtros no válidos.',
      status: 'error',
    });
  }

  // Generar un requestID aleatorio entre 1 y 3
  const requestID = Math.floor(Math.random() * 3) + 1;

  // Crear la respuesta
  const response = {
    message: 'El proceso está en cola, esperando procesamiento.',
    status: 'Success',
    requestId: requestID,
  };

  // Enviar la respuesta
  res.json(response);
});

app.post('/getRequestId', (req, res) => {
  const { date, output } = req.body;
  res.json({
    message: 'Solicitud procesada correctamente',
    status: 'Success',
    requestId: 'pruebaandres',
  });
});

// Servir archivos estáticos (como el archivo HTML del cliente)
app.use(express.static('public'));

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});

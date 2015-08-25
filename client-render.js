'use strict';

var path = require('path'),
    fs = require('fs'),
    Promises = require('bluebird'),
    jsReportClient = require('jsreport-client');

var REPORT_SERVER_URL = 'http://localhost:4500',
    REPORT_SERVER_USER = 'admin',
    REPORT_SERVER_PWD = '1234';

var writeFileAsync = Promises.promisify(fs.writeFile, fs);

var reportClient = jsReportClient(REPORT_SERVER_URL, REPORT_SERVER_USER, REPORT_SERVER_PWD);

var asyncPDFRender = new Promises(function(resolve, reject) {
  reportClient.render({
    template: {
      shortid: 'VkNparuL',
      recipe: 'phantom-pdf'
    },
    data: {
    "electronicdocument":
   { "serie": "FF11",
      "correlativo" :"01",
     "idEmpresa": 2,
     "nombreEmisor": "MINERIA CORPORATIVA S.A.C.",
     "RUTEmisor": "20518915119",
     "direccionOrigen": "CAL. CHINCHON NRO. 1018 INT. 501 LIMA - LIMA - SAN ISIDRO",
     "direccionUbigeo": "150131",
     "nombreComercial": "MINERIA CORPORATIVA S.A.C.",
     "tipoDocumento": "01",
     "tipoRutReceptor": "6",
     "RUTRecep": "10304834744",
     "razonSocRecep": "QUISPE HUAMAN TEOFILO",
     "dirRecep": "Av. Sebastian Barranca Mza 14, Lote 5, Acara, Caravela, Arequipa",
     "tipoMoneda": "USD",
     "codigoAutorizacion": "000",
     "mntNeto": "154.24",
     "mntTotalIgv": "27.76",
     "mntTotal": "182.00",
     "fechaEmision": "2015-06-10" },
    "taxes":
   [ { "codigoImpuesto": "1000",
        "idEmpresa": 2,
       "montoImpuesto": "27.76",
       "tasaImpuesto": "0.18" } ],
     "electronicdocumentDet":
   [ { "numeroLinea": "1",
       "idEmpresa": 2,
      "cantidadItem": "2.000",
       "unidadMedidaItem": "NIU",
       "codigoItem": "0005053",
       "nombreItem": "FILTRO AIRE PRIMARIO 54717145",
       "precioItem": "69.08",
       "precioItemSinIgv": "58.54",
       "montoItem": "117.08",
       "indExe": "10",
       "codigoTipoIgv": "1000",
       "tasaIgv": "0.18",
       "impuestoIgv": "21.08" },
   { "numeroLinea": "2",
       "idEmpresa": 2,
       "cantidadItem": "1.000",
       "unidadMedidaItem": "NIU",
       "codigoItem": "0005072",
       "nombreItem": "FILTRO ACEITE ASSY RMI-30A 4000 105- MITSUBISHI",
       "precioItemv": "37.93",
       "precioItemSinIgv": "32.14",
       "montoItem": "32.14",
       "indExe": "10",
       "codigoTipoIgv": "1000",
       "tasaIgv": "0.18",
       "impuestoIgv": "5.79" },
  { "numeroLinea": "3",
       "idEmpresa": 2,
      "cantidadItem": "1.000",
       "unidadMedidaItemv": "NIU",
       "codigoItem": "0003139",
       "nombreItem": "FILTRO DE ACEITE MOTOR (1R-0734) DONALDSON",
       "precioItem": "5.91",
       "precioItemSinIgv": "5.01",
       "montoItem": "5.01",
       "indExe": "10",
       "codigoTipoIgv": "1000",
       "tasaIgv": "0.18",
       "impuestoIgv": "0.90" } ],
     "discounts": [ {} ],
  "references": [ {} ],
  "additionalinfo": [ {} ],
  "processedTables": [ "A", "A2", "B" ] }
  }, function(err, reportResponse) {
    if (err) {
      return reject(new Error('Error in PDF generation'));
    }

    resolve(reportResponse);
  });
});

/* WITH BUFFER */
asyncPDFRender.then(function(report) {
  return new Promises(function(resolve, reject) {
    report.body(function(reportBody) {
      console.log('jsreport-client response buffer length:', reportBody.length);
      console.log('jsreport-client response is correct:', reportBody.length === 27776);
      resolve(writeFileAsync(path.join(__dirname, 'dist-pdf', 'report-from-buffer.pdf'), reportBody));
    });
  });
}).then(function() {
  console.log('Reporte generado en PDF!');
}).catch(function(err) {
  console.error('Ocurrio un error al tratar de renderizar el reporte:', err);
});

/* WITH STREAM */
// asyncPDFRender.then(function(report) {
//   var wstream = fs.createWriteStream(path.join(__dirname, 'dist-pdf', 'report-from-stream.pdf'));
//   report.pipe(wstream);

//   console.log('Reporte generado en PDF!');
// }).catch(function(err) {
//   console.error('Ocurrio un error al tratar de renderizar el reporte:', err);
// });

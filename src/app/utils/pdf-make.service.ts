import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { EvaluarResponse } from '../models/response/evaluarResponse';
import { PreguntaResponse } from '../models/response/preguntaResponse';

@Injectable({
  providedIn: 'root'
})
export class PdfMakeService {

  fechaRegistro!: Date;

  constructor() {
    this.fechaRegistro = new Date();
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }

  generateAndDownloadPDF(docDefinition: any, filename: string): void {
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download(filename);
  }
  convertToBase64(docDefinition: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.getBase64((data) => {
        resolve(data);
      });
    });
  }
  generatePreguntasPDF(respuestas: PreguntaResponse){
    let fechaFormateada = this.fechaRegistro.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const content = [
      { text: 'Lista de Preguntas:', style: 'header', alignment: 'center' },
      { text: 'Fecha de Ejecución: ' + fechaFormateada, style: 'fechaRegistro' }, // Agregar la fecha de registro
      {
        type:'none',
        ol: respuestas.respuestas?.map(respuesta => ({
          text: `${respuesta.id}. ${respuesta.descripcion || 'N/A'}`,
          style: 'item'
        }))
      }
    ];
    const docDefinition = {
      content: content,
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 10] // Margen inferior
        },
        item: {
          fontSize: 12,
          margin: [0, 5, 0, 5], // Margen inferior y superior
        },
        fechaRegistro: {
          fontSize: 12,
          italic: true,
          margin: [0, 0, 0, 10] // Margen inferior
        }
      },
      // Centrar el contenido
      pageOrientation: 'portrait',
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60], // Márgenes [izquierdo, superior, derecho, inferior]
      alignment: 'center'
    };
    this.generateAndDownloadPDF(docDefinition, 'AI_Interviewer_Preguntas.pdf');
  }

    GenerateResultadosPDF(evaluacion: EvaluarResponse): Promise<string> {
      let fechaFormateada = this.fechaRegistro.toLocaleDateString('es-PE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      });
      const docDefinition = {
          content: [
              { text: 'Evaluación', style: 'header', alignment: 'center'},
              { text: 'Fecha de Ejecución: ' + fechaFormateada, style: 'fechaRegistro' },
              { text: 'Resultado: ', style: 'subheader' },
              evaluacion.resultado,
              { text: 'Criterios: ', style: 'subheader' },
              evaluacion.criterios,
              { text: 'Feedback: ', style: 'subheader' },
              evaluacion.feedback
          ],
          styles: {
              header: {
                  fontSize: 18,
                  bold: true,
                  margin: [0, 0, 0, 10] // Margen inferior
              },
              subheader: {
                  fontSize: 14,
                  bold: true,
                  margin: [0, 10, 0, 5] // Margen inferior y superior
              },
              fechaRegistro: {
                  fontSize: 12,
                  italic: true,
                  margin: [0, 0, 0, 10] // Margen inferior
              }
          }
      };

      try {
          const base64 = this.convertToBase64(docDefinition);
          return base64;
      } catch (error) {
          console.error("Error al generar el PDF:", error);
          throw error;
      }
  }
}

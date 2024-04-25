import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfMakeService {

  constructor() {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }
  generateAndDownloadPDF(docDefinition: any, filename: string): void {
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download(filename);
  }
}

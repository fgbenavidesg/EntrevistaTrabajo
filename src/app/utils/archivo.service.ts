import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor() { }

  public async readFileAsBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1] || '';
        resolve(base64String);
      };
      reader.onerror = () => {
        reject(new Error('Error al leer el archivo.'));
      };
      reader.readAsDataURL(file);
    });
  }
  public async downloadPDF(base64String: string, nombreArchivo: string) {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });

    // Crea un enlace de descarga
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = nombreArchivo + '.pdf';
    link.click();
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FILE } from 'src/app/models/file.constants';
import { PreguntaRequest } from 'src/app/models/request/preguntaRequest';
import { EvaluarUsuarioService } from 'src/app/services/evaluar-usuario.service';
import { AlertService } from 'src/app/utils/alert.service';
import { LoadingService } from 'src/app/utils/loading.service';
import { PdfMakeService } from 'src/app/utils/pdf-make.service';

@Component({
  selector: 'app-evaluar-usuario',
  templateUrl: './evaluar-usuario.component.html',
  styleUrls: ['./evaluar-usuario.component.scss'],
})
export class EvaluarUsuarioComponent  implements OnInit {

  responseData = {
    "response": {
      "respuestas": [
        {
          "id": 1,
          "descripcion": "Lorem ipsum dolor sit amet"
        },
        {
          "id": 2,
          "descripcion": "consectetur adipiscing elit"
        },
        {
          "id": 3,
          "descripcion": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        }
      ]
    }
  };


  @ViewChild("fileInput") fileInput!: ElementRef;
  isFileSelected: boolean = false;
  file?: File;
  selectedFileName: string | undefined;

  preguntasForm! : FormGroup;
  evaluarForm! : FormGroup;
  respuestas!: string[];
  constructor(
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private evaluarsvc : EvaluarUsuarioService,
    private alertService :AlertService,
    private pdfService: PdfMakeService,
  ) {
    this.preguntasForm = this.PreguntasForm();
    this.evaluarForm=this.EvaluarForm();
   }

  ngOnInit() {

  }

  PreguntasForm(){
    return this.formBuilder.group({
      perfil: ['', Validators.required],
      nivel: ['', Validators.required],
      nroPreguntas: [''],
    });
  }
  EvaluarForm(){
    return this.formBuilder.group({
      perfil_evaluar: ['', Validators.required],
      nivel_evaluar: ['', Validators.required],
    });
  }

  isVideo = (file: File): boolean => {
    const videoMimeTypes = [
      'video/mp4',
      'video/mpeg',
      'video/webm',
      'video/quicktime',
    ];
    return videoMimeTypes.includes(file.type);
  };
  generatePDF(): void {
    const responseData = this.responseData;

    const content = [
      { text: 'Lista de Preguntas:', style: 'header', alignment: 'center' },
      {
        type:'none',
        ol: responseData.response.respuestas.map(respuesta => ({
          text: `${respuesta.id}. ${respuesta.descripcion || 'N/A'}`,
          style: 'item' // Aplicar estilo 'item' a cada elemento de lista
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
        }
      },
      // Centrar el contenido
      pageOrientation: 'portrait',
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60], // Márgenes [izquierdo, superior, derecho, inferior]
      alignment: 'center'
    };
    this.pdfService.generateAndDownloadPDF(docDefinition, 'EntrevistaIA_Preguntas.pdf');
  }

  fileInputChange(event: Event) {
    this.handleFileSelection(() => {
      const input = event.target as HTMLInputElement;
      const selectedFile = input.files?.[0];

      if (!selectedFile || !this.isVideo(selectedFile)) {
        this.alertService.showAlertOk("", "Solo se admiten archivos con formato PDF");
        return;
      }

      this.setFile(selectedFile);
    });
  }
  ValidarUsuario() {
    if (this.isFileSelected && this.file) {
      this.alertService.showAlertOkCancel(
        "Confirmación",
        "Esta acción no podrá deshacerse y los cambios serán permanentes.",
        () => {
          // aplicar servicio
        }
      );
    }
  }
  private handleFileSelection(callback: () => void) {
    if (!this.isFileSelected) {
      callback();
      return;
    }
  }

  public generarPregunta(){
    this.respuestas = [];
    let perfil = this.preguntasForm.value.perfil;
    let nivel= this.preguntasForm.value.nivel;
    let nroPreguntas= this.preguntasForm.value.nroPreguntas;
    if(!this.preguntasForm.valid){
      this.alertService.showAlertOk("Datos incompletos", "Por favor, completa los campos correctamente");
      return;
    }
    let param : PreguntaRequest={
      perfil: perfil,
      nivel: nivel,
      preguntas:Number(nroPreguntas),
    }
    this.loadingService.presentLoading('Generando Preguntas ...')
    return this.evaluarsvc.GenerarPreguntas(param).subscribe(
      (resp)=>{
        console.log(resp.response);
        //this.respuestas= resp.response
        this.respuestas=resp.response.split('?');
        this.respuestas.pop();
        console.log(this.respuestas)
        this.loadingService.dismissLoading();
      }
    )
  }
  private setFile(selectedFile: File) {
    if (selectedFile.size <= FILE.MIN_FILE_SIZE_KB) {
      this.alertService.showAlertOk("", "El archivo seleccionado está vacío. Seleccione un archivo válido.");
      return;
    }

    // Tamaño máximo de 500KB (500 * 1024 bytes)
    if (selectedFile.size > FILE.MAX_FILE_SIZE_KB * 1024) {
      this.alertService.showAlertOk("", "El tamaño del archivo seleccionado excede el límite de 500KB. Seleccione un archivo más pequeño.");
      return;
    }

    this.file = selectedFile;
    this.isFileSelected = true;
    this.selectedFileName = selectedFile.name;
  }

}

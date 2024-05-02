import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FILE } from 'src/app/models/file.constants';
import { EnvioCorreoRequest } from 'src/app/models/request/envioCorreoRequest';
import { EvaluarRequest } from 'src/app/models/request/evaluarRequest';
import { PreguntaRequest } from 'src/app/models/request/preguntaRequest';
import { EvaluarResponse } from 'src/app/models/response/evaluarResponse';
import { PreguntaResponse,  } from 'src/app/models/response/preguntaResponse';
import { EvaluarUsuarioLogicService } from 'src/app/serviceLogic/evaluar-usuario-logic.service';
import { AlertService } from 'src/app/utils/alert.service';
import { ArchivoService } from 'src/app/utils/archivo.service';
import { PdfMakeService } from 'src/app/utils/pdf-make.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evaluar-usuario',
  templateUrl: './evaluar-usuario.component.html',
  styleUrls: ['./evaluar-usuario.component.scss'],
})
export class EvaluarUsuarioComponent  implements OnInit {


  @ViewChild("fileInput") fileInput!: ElementRef;
  perfiles = [
    "Desarrollador Frontend",
    "Desarrollador Backend",
    "Ingeniero de Software",
    "Arquitecto de Software",
    "Analista de Sistemas",
    "Diseñador UX/UI",
    "Ingeniero de Calidad de Software",
    "Especialista en Seguridad Informática",
    "Desarrollador Full Stack",
    "Especialista en DevOps",
    "RPA developer"
  ];

  niveles = [
    "Junior",
    "Semi Senior",
    "Senior",
  ];
  videoMimeTypes = [
    'video/mp4',
    'video/mpeg',
    'video/webm',
    'video/quicktime',
  ];
  videoIconPath: string = "assets/video.png";
  isFileSelected: boolean = false;
  file?: File;
  fileBase64?: string;
  selectedFileName: string | undefined;
  preguntasForm! : FormGroup;
  evaluarForm! : FormGroup;
  respuestas!: PreguntaResponse;
  evaluacion!:EvaluarResponse
  segmentValue: string = 'segment1';
  gmail!:string;
  constructor(
    private formBuilder: FormBuilder,
    private evaluarsvc : EvaluarUsuarioLogicService,
    private alertService :AlertService,
    private pdfService: PdfMakeService,
    private archivosvc: ArchivoService
  ) {
    this.preguntasForm = this.PreguntasForm();
    this.evaluarForm=this.EvaluarForm();
   }

  ngOnInit() {

  }

  presentPopover(){
    window.open(environment.wsp, '_blank');
  }
//fromularios
  PreguntasForm(){
    return this.formBuilder.group({
      perfil: ['', Validators.required],
      nivel: ['', Validators.required],
      nroPreguntas: [''],
    });
  }
  EvaluarForm(){
    return this.formBuilder.group({
      perfil_evaluar: [{ value: '', disabled: true }, Validators.required],
      nivel_evaluar: [{ value: '', disabled: true }, Validators.required],
    });
  }
//Logica de manejo de video
resetFile() {
  this.fileInput.nativeElement.value = "";
  this.isFileSelected = false;
  this.file=undefined;
}
isVideo = (file: File): boolean => {
  return this.videoMimeTypes.includes(file.type);
};
private setFile(selectedFile: File) {
  if (selectedFile.size <= FILE.MIN_FILE_SIZE_MB) {
    this.alertService.showAlertOk("", "El archivo seleccionado está vacío. Seleccione un archivo válido.");
    return;
  }
  // Tamaño máximo de 500MB (500 * 1024 bytes * 1024 bytes)
  if (selectedFile.size > FILE.MAX_FILE_SIZE_MB * 1024 * 1024) {
    this.alertService.showAlertOk("", "El tamaño del archivo seleccionado excede el límite de 500MB. Seleccione un archivo más pequeño.");
    return;
  }
  this.file = selectedFile;
  this.isFileSelected = true;
  this.selectedFileName = selectedFile.name;
}
//manejo de video arrastrandolo
onDragOver(event: DragEvent) {
  event.preventDefault();
}

onDrop(event: DragEvent) {
  event.preventDefault();
  this.handleFileSelection(() => {
    let file = event.dataTransfer?.files[0];
    if (!file || !this.isVideo(file)) {
      this.alertService.showAlertOk("", "Solo se admiten archivos con formato mp4/video");
      return;
    }
    if (file) {
      this.setFile(file)
    }
  });
}
//manejo de video normal
  private handleFileSelection(callback: () => void) {
    if (!this.isFileSelected) {
      callback();
      return;
    }
    this.alertService.showAlertOk("", "Ya se ha seleccionado un archivo. Desseleccione el archivo actual antes de seleccionar uno nuevo.");
    return;
  }
  selectFile = () =>
    this.handleFileSelection(() => this.fileInput.nativeElement.click());

  fileInputChange(event: Event) {
    this.handleFileSelection(() => {
      const input = event.target as HTMLInputElement;
      const selectedFile = input.files?.[0];

      if (!selectedFile || !this.isVideo(selectedFile)) {
        this.alertService.showAlertOk("", "Solo se admiten archivos con formato mp4/video");
        return;
      }

      this.setFile(selectedFile);
    });
  }

  ValidarRespuestas() {
    let perfil_evaluar = this.evaluarForm.value.perfil_evaluar;
    let nivel_evaluar= this.evaluarForm.value.nivel_evaluar;
    let param : EvaluarRequest={
      video_base64: "",
      perfil: perfil_evaluar,
      nivel: nivel_evaluar,
    }
    if(!this.preguntasForm.valid && !this.isFileSelected && !this.file){
      this.alertService.showAlertOk("Datos incompletos", "Por favor, completa los campos correctamente");
      return;
    }
    this.alertService.showAlertOkCancel(
      "Confirmación",
      "Esta acción no podrá deshacerse y los cambios serán permanentes.",
      () => {
        this.archivosvc.readFileAsBase64(this.file!).then(
          (resp)=>{
            param.video_base64=resp;
            this.evaluarsvc.EvaluarRespuestas(param).subscribe(
              (resp)=>{
                if(resp){
                  this.evaluacion = resp;
                  if(this.evaluacion){
                    this.generateResultadosPDF(this.evaluacion);
                  }
                }
               }
             )
          }
        )

      }
    );
  }
  generateResultadosPDF( evaluacion : EvaluarResponse ){
    this.gmail = localStorage.getItem('gmail')!;
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const nombreArchivo = `AI_INTERVIEWER_ResultadoEvaluacion_${fecha}`;
   this.pdfService.GenerateResultadosPDF(evaluacion).then(
    (resp)=>{
      let paramCorreo: EnvioCorreoRequest ={
        correos_to: this.gmail,
        correo_cc: "",
        correo_cco: "",
        asunto:"AI INTERVIEWER-Resultado de Evaluación",
        mensaje:"<h2>Estimado usuario,</h2>"
                 +"<p>Espero que estés teniendo un gran día.</p>"
                 +"<p>Quería compartir contigo los resultados de la evaluación de tu candidato que completaste recientemente:</p>"
                 +"<p>Por favor, descarga el PDF adjunto para ver el resultado.</p>"
                 +"<p>¡Gracias por tu participación y esfuerzo!</p>"
                 +"<p>Atentamente,<br/>AI INTERVIEWER</p>",
        nombre_config:environment.nombre_config_correo,
        adjuntos: [
          {
            base64: resp,
            extension: "pdf",
            nombre_archivo: nombreArchivo,
            ruta: ""
          }
        ]
      }
      this.archivosvc.downloadPDF(resp,nombreArchivo);
      this.evaluarsvc.EnviarCorreo(paramCorreo).subscribe();
    }
   )
  }
  // ejemplo: EvaluarResponse = {
  //   criterios: "Experiencia laboral",
  //   feedback: "El candidato tiene una experiencia relevante en el campo.",
  //   resultado: "Cumple"
  // };
//Logica de generar preguntas
  public generarPregunta(){
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
      preguntas: nroPreguntas,
    }
    this.evaluarsvc.GenerarPreguntas(param).subscribe(
      (resp)=>{
        if(resp){
          this.respuestas=resp;
        }
      }
    )
  }
  generatePreguntasPDF(){
    this.pdfService.generatePreguntasPDF(this.respuestas);
  }
}

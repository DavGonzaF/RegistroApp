import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { AlertController, AnimationController, LoadingController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements  AfterViewInit {

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public escaneando = false;
  public datosQR: any = null;
  public loading: HTMLIonLoadingElement | null = null;
  public usuario: Usuario = new Usuario();
  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController, 
    private activatedRoute: ActivatedRoute,
    private animationController: AnimationController,
    private router: Router
  ) {
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  navegarInicio() {
    const navigationExtras: NavigationExtras = {
      state: { usuario: this.usuario }
    };
    this.router.navigate(['/inicio'], navigationExtras);
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(-50%)', 'translate(100%)')
      .play();
  }

  public async comenzarEscaneoQR() {
    const mediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    let w = this.canvas.nativeElement.width;
    let h = this.canvas.nativeElement.height;

    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    }

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source ? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode: QRCode | null = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });

    if (qrCode) {
      this.escaneando = false;
      try {
        this.datosQR = JSON.parse(qrCode.data);
      } catch (error) {
        this.datosQR = qrCode.data;
      }
      return true;
    }

    return false;
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando = true;
      }
      if (this.obtenerDatosQR()) {
        let stream = this.video.nativeElement.srcObject;
        let tracks: MediaStreamTrack[] = stream.getTracks();  // Especificar el tipo aquí
        tracks.forEach((track: MediaStreamTrack) => track.stop());
      } else if (this.escaneando) {
        requestAnimationFrame(this.verificarVideo.bind(this));
      }
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
    let stream = this.video.nativeElement.srcObject;
    let tracks: MediaStreamTrack[] = stream.getTracks();  // Especificar el tipo aquí
    tracks.forEach((track: MediaStreamTrack) => track.stop());
  }

  public limpiarDatos(): void {
    this.escaneando = false;
    this.datosQR = null;
    this.loading = null;
  }

  
}

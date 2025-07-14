import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root' // Nota: Hace que el servicio esté disponible en toda la aplicación
})
export class AlertService {

  constructor() { }

  /**
   * Muestra una alerta de éxito.
   * @param title Título de la alerta.
   * @param text Texto del cuerpo de la alerta.
   */
  success(title: string, text: string = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'success',
      title: title || '¡Operación Exitosa!',
      text: text,
      confirmButtonText: 'Aceptar',
      timer: 3000, // Cierra automáticamente después de 3 segundos
      timerProgressBar: true
    });
  }

  /**
   * Muestra una alerta de error.
   * @param title Título de la alerta.
   * @param text Texto del cuerpo de la alerta.
   */
  error(title: string, text: string = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'error',
      title: title || 'Hubo un problema:',
      text: text,
      confirmButtonText: 'Cerrar'
    });
  }

  /**
   * Muestra una alerta de advertencia.
   * @param title Título de la alerta.
   * @param text Texto del cuerpo de la alerta.
   */
  warning(title: string, text: string = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      confirmButtonText: 'Entendido'
    });
  }

  /**
   * Muestra una alerta de información.
   * @param title Título de la alerta.
   * @param text Texto del cuerpo de la alerta.
   */
  info(title: string, text: string = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      confirmButtonText: 'OK'
    });
  }

  /**
   * Muestra una alerta de pregunta.
   * @param title Título de la alerta.
   * @param text Texto del cuerpo de la alerta.
   */
  question(title: string, text: string = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'question',
      title: title,
      text: text,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      showCancelButton: true
    });
  }

  /**
   * Muestra una alerta de confirmación con opciones personalizadas.
   * @param title Título de la alerta.
   * @param text Texto del cuerpo de la alerta.
   * @param confirmButtonText Texto para el botón de confirmación.
   * @param cancelButtonText Texto para el botón de cancelación.
   * @param icon Icono de la alerta ('warning', 'error', 'success', 'info', 'question').
   * @returns Promesa que resuelve con el resultado de la interacción del usuario.
   */
  confirm(
    title: string,
    text: string,
    confirmButtonText: string = 'Confirmar',
    cancelButtonText: string = 'Cancelar',
    icon: SweetAlertIcon = 'warning'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6', // Puedes personalizar colores
      cancelButtonColor: '#d33',    // Puedes personalizar colores
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    });
  }

  /**
   * Muestra una alerta con opciones totalmente personalizables.
   * @param options Objeto de configuración de SweetAlert2.
   * @returns Promesa que resuelve con el resultado de la interacción del usuario.
   */
  customAlert(options: any): Promise<SweetAlertResult> {
    return Swal.fire(options);
  }

  /**
   * Muestra un toast (notificación flotante).
   * @param icon Icono del toast.
   * @param title Texto del toast.
   * @param timer Duración del toast en milisegundos (default 3000).
   */
  showToast(
    icon: SweetAlertIcon,
    title: string,
    timer: number = 3000
  ): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end', // Posición en la pantalla
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: icon,
      title: title
    });
  }

  /**
   * Cierra cualquier alerta de SweetAlert2 que esté abierta.
   */
  closeAlert(): void {
    Swal.close();
  }

}

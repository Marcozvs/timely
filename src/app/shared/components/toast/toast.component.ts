import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-5 right-5 z-50 space-y-3">
      @for (toast of toasts$ | async; track toast.id) {
        <div
          [id]="toast.id"
          class="flex items-center w-full max-w-sm p-4 text-gray-500 bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out animate-slide-in"
          [ngClass]="{
            'border-l-4 border-green-500': toast.type === 'success',
            'border-l-4 border-red-500': toast.type === 'error',
            'border-l-4 border-yellow-500': toast.type === 'warning',
            'border-l-4 border-blue-500': toast.type === 'info'
          }"
          role="alert"
        >
          <!-- Ícone -->
          <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
            [ngClass]="{
              'text-green-500 bg-green-100': toast.type === 'success',
              'text-red-500 bg-red-100': toast.type === 'error',
              'text-yellow-500 bg-yellow-100': toast.type === 'warning',
              'text-blue-500 bg-blue-100': toast.type === 'info'
            }"
          >
            <!-- Success Icon -->
            @if (toast.type === 'success') {
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>
            }

            <!-- Error Icon -->
            @if (toast.type === 'error') {
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
              </svg>
            }

            <!-- Warning Icon -->
            @if (toast.type === 'warning') {
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
              </svg>
            }

            <!-- Info Icon -->
            @if (toast.type === 'info') {
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
            }
          </div>

          <!-- Mensagem -->
          <div class="ml-3 text-sm font-normal flex-1">
            {{ toast.message }}
          </div>

          <!-- Botão Fechar -->
          <button
            type="button"
            (click)="closeToast(toast.id)"
            class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 transition-colors"
            [attr.aria-label]="'Close ' + toast.type"
          >
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
  `]
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toasts$ = this.toastService.toasts$;

  closeToast(id: string): void {
    this.toastService.remove(id);
  }
}

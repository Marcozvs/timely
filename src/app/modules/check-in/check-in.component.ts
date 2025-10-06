import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckInService } from '../../services/check-in/check-in.service';
import { CheckIn, CreateCheckInResponse } from '../../core/interfaces/check-in.interfaces';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-in.component.html'
})
export class CheckInComponent implements OnInit {
  checkInForm!: FormGroup;
  isLoading = false;
  isGettingLocation = false;

  private fb = inject(FormBuilder);
  private checkInService = inject(CheckInService);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.checkInForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  handleSubmit(): void {
    if (!this.checkInForm.valid) {
      this.checkInForm.markAllAsTouched();
      this.toastService.warning('Por favor, preencha o campo nome corretamente.');
      return;
    }

    this.isGettingLocation = true;
    const name = this.checkInForm.value.name.trim();
    const date = new Date().toISOString();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude},${position.coords.longitude}`;
          this.isGettingLocation = false;
          this.sendCheckIn(name, date, location);
        },
        (error) => {
          console.warn('Localização indisponível:', error);
          this.isGettingLocation = false;
          this.toastService.info('Localização não disponível. Registrando sem localização.');
          this.sendCheckIn(name, date, '');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      this.isGettingLocation = false;
      this.toastService.info('Geolocalização não suportada. Registrando sem localização.');
      this.sendCheckIn(name, date, '');
    }
  }

  private sendCheckIn(name: string, date: string, location: string): void {
    this.isLoading = true;
    const checkIn: CheckIn = { name, date, location };

    this.checkInService.create(checkIn).subscribe({
      next: (res: CreateCheckInResponse) => {
        this.isLoading = false;

        if (res.result === 'success') {
          this.toastService.success(`✅ Check-in registrado com sucesso!`);
          this.checkInForm.reset();
        } else {
          this.toastService.error('Erro ao registrar check-in. Tente novamente.');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao registrar check-in:', err);

        const errorMessage = err?.message || 'Erro desconhecido ao registrar check-in.';
        this.toastService.error(`❌ ${errorMessage}`);
      }
    });
  }

  get nameControl() {
    return this.checkInForm.get('name');
  }

  get isNameInvalid(): boolean {
    return !!(this.nameControl?.invalid && this.nameControl?.touched);
  }

  get currentDate(): Date {
    return new Date();
  }
}

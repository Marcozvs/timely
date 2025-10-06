import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { CheckInComponent } from "./modules/check-in/check-in.component";
import { ToastComponent } from "./shared/components/toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CheckInComponent, ToastComponent],
  templateUrl: './app.html'
})
export class App implements OnInit {
  protected readonly title = signal('timely');

  ngOnInit(): void {
    initFlowbite();
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App implements OnInit {
  protected readonly title = signal('timely');

  ngOnInit(): void {
    initFlowbite();
  }
}

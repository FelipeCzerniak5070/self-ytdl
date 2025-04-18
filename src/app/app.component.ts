import { Component } from '@angular/core';
import { MainComponent } from "./main/main.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@Component({
  selector: 'app-root',
  imports: [MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'self-ytdl';
}

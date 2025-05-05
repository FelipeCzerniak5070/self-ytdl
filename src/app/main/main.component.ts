import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [ButtonModule,InputTextModule, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule, Menubar, HttpClientModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
    videoUrl: string = '';

  constructor(private http: HttpClient) {}

  items: MenuItem[] | undefined;
  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home',
          },
          {
              label: 'Projects',
              icon: 'pi pi-search',
              badge: '3',
              items: [
                  {
                      label: 'Core',
                      icon: 'pi pi-bolt',
                      shortcut: '⌘+S',
                  },
                  {
                      label: 'Blocks',
                      icon: 'pi pi-server',
                      shortcut: '⌘+B',
                  },
                  {
                      separator: true,
                  },
                  {
                      label: 'UI Kit',
                      icon: 'pi pi-pencil',
                      shortcut: '⌘+U',
                  },
              ],
          },
      ];
  }

  async pasteFromClipboard(inputElement: HTMLInputElement) {
        try {
            const text = await navigator.clipboard.readText();
            inputElement.value = text;
        } catch (err) {
            console.error('Falha ao colar da área de transferência', err);
        }
    }

    downloadVideo() {
        
        if (this.videoUrl) {
            this.http.post('http://localhost:3000/download', { url: this.videoUrl }, { responseType: 'blob' })
                .subscribe({
                    next: (blob: Blob) => {
                        saveAs(blob, 'video.mp4'); // Salva o arquivo
                    },
                    error: (error) => {
                        console.error('Erro ao baixar o vídeo:', error);
                    }
                });
        } else {
            alert('Por favor, insira uma URL do vídeo.');
        }
    }

    saveAs(blob: Blob, filename: string) {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    


}

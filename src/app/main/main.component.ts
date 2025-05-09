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

  temUrl:boolean = false;

  async pasteFromClipboard(inputElement: HTMLInputElement) {
        try {
            const text = await navigator.clipboard.readText();
            inputElement.value = text;
        } catch (err) {
            console.error('Falha ao colar da área de transferência', err);
        }
    }
    teste(){
        this.http.post('http://localhost:3000/teste',{url:this.videoUrl},{ responseType: 'text' })
            .subscribe(
                {
                    next: (res) => {
                        alert(res);
                    },
                    error: (error) => {
                        console.error('Erro ao testar:', error);
                    }
                }
        )
    }

    downloadVideo() {
        if (this.videoUrl) {
            this.http.post('http://localhost:3000/download', { url: this.videoUrl }, { responseType: 'blob' })
                .subscribe({
                    next: (blob: Blob) => {
                        console.log('Sucesso');
                        // Usa o nome do arquivo padrão "audio.mp3"
                        saveAs(blob, 'audio.mp3');
                    },
                    error: (error) => {
                        console.error('Erro ao baixar o vídeo:', error);
                        alert('Erro ao baixar o vídeo.');
                    }
                });
        } else {
            alert('Por favor, insira uma URL do vídeo.');
        }
    }

    saveAs(response:any, filename: string) {
        const a = document.createElement('a');
        const url = response.url;
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    


}

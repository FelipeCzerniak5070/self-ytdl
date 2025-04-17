import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import * as fs from 'fs';
import * as path from 'path';

@Component({
  selector: 'app-main',
  imports: [ButtonModule,InputTextModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {



  criarArquivoVazio(){
    const nomeArquivo = 'teste.txt';
    const caminhoArquivo = path.join(__dirname, nomeArquivo); // Define o caminho do arquivo no diretório atual
  
    fs.writeFile(caminhoArquivo, '', (err) => {
      if (err) {
        console.error('Erro ao criar o arquivo:', err);
      } else {
        console.log(`Arquivo "${nomeArquivo}" criado com sucesso em: ${caminhoArquivo}`);
      }
    });
  };

}

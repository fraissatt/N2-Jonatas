import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/Livro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livros-lista',
  standalone: true,
  templateUrl: './livros-lista.component.html',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
  ],
})
export class LivrosListaComponent implements OnInit {
  livros: Livro[] = [];
  loading = false;

  constructor(
    private livroService: LivroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros() {
    this.loading = true;
    this.livroService.listar().subscribe({
      next: (data: Livro[]) => {
        this.livros = data;
        this.loading = false;
      },
      error: () => {
        console.error('Erro ao carregar livros');
        this.loading = false;
      },
    });
  }

  novoLivro() {
    this.router.navigate(['/livros/novo']);
  }

  editarLivro(id: number) {
    this.router.navigate(['/livros/editar', id]);
  }

  excluirLivro(id: number) {
    if (confirm('Deseja excluir este livro?')) {
      this.livroService.excluir(id).subscribe({
        next: () => this.carregarLivros(),
        error: () => console.error('Erro ao excluir livro'),
      });
    }
  }
}

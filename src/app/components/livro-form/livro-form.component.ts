import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../../models/Livro';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  templateUrl: './livro-form.component.html',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
  ],
})
export class LivroFormComponent implements OnInit {
  livro: Livro = { titulo: '', autor: '', disponivel: true };
  id?: number;
  editando = false;

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.editando = true;
      this.livroService.buscarPorId(this.id).subscribe({
        next: (data) => (this.livro = data),
        error: () => console.error('Erro ao carregar livro'),
      });
    }
  }

  salvar() {
    const operacao = this.editando
      ? this.livroService.atualizar(this.id!, this.livro)
      : this.livroService.salvar(this.livro);

    operacao.subscribe({
      next: () => this.router.navigate(['/livros']),
      error: () => console.error('Erro ao salvar livro'),
    });
  }

  cancelar() {
    this.router.navigate(['/livros']);
  }
}

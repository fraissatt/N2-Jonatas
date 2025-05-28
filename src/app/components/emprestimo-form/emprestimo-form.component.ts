import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { Livro } from '../../models/Livro';
import { Usuario } from '../../models/Usuario';
import { Emprestimo } from '../../models/Emprestimo';

import { LivroService } from '../../services/livro.service';
import { UsuarioService } from '../../services/usuario.service';
import { EmprestimoService } from '../../services/emprestimo.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-emprestimo-form',
  standalone: true,
  templateUrl: './emprestimo-form.component.html',
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
  ],
})
export class EmprestimoFormComponent implements OnInit {
  livros: Livro[] = [];
  usuarios: Usuario[] = [];
  emprestimo: Partial<Emprestimo> = {};

  constructor(
    private livroService: LivroService,
    private usuarioService: UsuarioService,
    private emprestimoService: EmprestimoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.livroService.listar().subscribe({
      next: (data) => this.livros = data.filter(l => l.disponivel),
      error: () => console.error('Erro ao carregar livros')
    });

    this.usuarioService.listar().subscribe({
      next: (data) => this.usuarios = data,
      error: () => console.error('Erro ao carregar usuários')
    });
  }

  salvar() {
    if (this.emprestimo.livro && this.emprestimo.usuario) {
      this.emprestimoService.salvar(this.emprestimo).subscribe({
        next: () => this.router.navigate(['/emprestimos']),
        error: () => console.error('Erro ao salvar empréstimo')
      });
    }
  }

  cancelar() {
    this.router.navigate(['/emprestimos']);
  }
}

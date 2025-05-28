import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { Emprestimo } from '../../models/Emprestimo';
import { EmprestimoService } from '../../services/emprestimo.service';

@Component({
  selector: 'app-emprestimos-lista',
  standalone: true,
  templateUrl: './emprestimos-lista.component.html',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
  ],
})
export class EmprestimosListaComponent implements OnInit {
  emprestimos: Emprestimo[] = [];
  loading = false;

  constructor(private emprestimoService: EmprestimoService) {}

  ngOnInit(): void {
    this.carregarEmprestimos();
  }

  carregarEmprestimos() {
    this.loading = true;
    this.emprestimoService.listar().subscribe({
      next: (data: Emprestimo[]) => {
        this.emprestimos = data;
        this.loading = false;
      },
      error: () => {
        console.error('Erro ao carregar empréstimos');
        this.loading = false;
      },
    });
  }

  devolver(id: number) {
    if (confirm('Confirmar devolução?')) {
      this.emprestimoService.devolver(id).subscribe({
        next: () => this.carregarEmprestimos(),
        error: () => console.error('Erro ao devolver empréstimo')
      });
    }
  }
}

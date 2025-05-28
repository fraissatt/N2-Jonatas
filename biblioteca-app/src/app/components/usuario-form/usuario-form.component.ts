import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  templateUrl: './usuario-form.component.html',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class UsuarioFormComponent implements OnInit {
  usuario: Usuario = { nome: '', email: '' };
  id?: number;
  editando = false;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.editando = true;
      this.usuarioService.buscarPorId(this.id).subscribe({
        next: (data) => (this.usuario = data),
        error: () => console.error('Erro ao carregar usuário'),
      });
    }
  }

  salvar() {
    const operacao = this.editando
      ? this.usuarioService.atualizar(this.id!, this.usuario)
      : this.usuarioService.salvar(this.usuario);

    operacao.subscribe({
      next: () => this.router.navigate(['/usuarios']),
      error: () => console.error('Erro ao salvar usuário'),
    });
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }
}

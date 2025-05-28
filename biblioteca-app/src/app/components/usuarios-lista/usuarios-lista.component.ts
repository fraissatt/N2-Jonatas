import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-lista',
  standalone: true,
  templateUrl: './usuarios-lista.component.html',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
  ],
})
export class UsuariosListaComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.loading = true;
    this.usuarioService.listar().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: () => {
        console.error('Erro ao carregar usuários');
        this.loading = false;
      },
    });
  }

  novoUsuario() {
    this.router.navigate(['/usuarios/novo']);
  }

  editarUsuario(id: number) {
    this.router.navigate(['/usuarios/editar', id]);
  }

  excluirUsuario(id: number) {
    if (confirm('Deseja excluir este usuário?')) {
      this.usuarioService.excluir(id).subscribe({
        next: () => this.carregarUsuarios(),
        error: () => console.error('Erro ao excluir usuário'),
      });
    }
  }
}

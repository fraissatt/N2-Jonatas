import { Routes } from '@angular/router';

import { LivrosListaComponent } from './components/livros-lista/livros-lista.component';
import { LivroFormComponent } from './components/livro-form/livro-form.component';

import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

import { EmprestimosListaComponent } from './components/emprestimos-lista/emprestimos-lista.component';
import { EmprestimoFormComponent } from './components/emprestimo-form/emprestimo-form.component';

export const routes: Routes = [
  { path: 'livros', component: LivrosListaComponent },
  { path: 'livros/novo', component: LivroFormComponent },
  { path: 'livros/editar/:id', component: LivroFormComponent },

  { path: 'usuarios', component: UsuariosListaComponent },
  { path: 'usuarios/novo', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },

  { path: 'emprestimos', component: EmprestimosListaComponent },
  { path: 'emprestimos/novo', component: EmprestimoFormComponent },

  { path: '', redirectTo: 'livros', pathMatch: 'full' },
  { path: '**', redirectTo: 'livros' }, 
];

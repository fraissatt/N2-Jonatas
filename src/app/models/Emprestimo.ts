import { Livro } from './Livro';
import { Usuario } from './Usuario';

export interface Emprestimo {
  id?: number;
  livro: Livro;
  usuario: Usuario;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  status: 'ATIVO' | 'DEVOLVIDO';
}

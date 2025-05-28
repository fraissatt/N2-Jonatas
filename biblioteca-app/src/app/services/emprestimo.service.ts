import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emprestimo } from '../models/Emprestimo';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmprestimoService {
  private apiUrl = 'http://localhost:8080/api/emprestimos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Emprestimo> {
    return this.http.get<Emprestimo>(`${this.apiUrl}/${id}`);
  }

  salvar(emprestimo: Partial<Emprestimo>): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(this.apiUrl, emprestimo);
  }

  devolver(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/devolver`, {});
  }
}

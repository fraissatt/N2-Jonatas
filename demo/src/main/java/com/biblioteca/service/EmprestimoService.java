package com.biblioteca.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.biblioteca.model.Emprestimo;
import com.biblioteca.model.Livro;
import com.biblioteca.model.StatusEmprestimo;
import com.biblioteca.model.Usuario;
import com.biblioteca.repository.EmprestimoRepository;
import com.biblioteca.repository.LivroRepository;
import com.biblioteca.repository.UsuarioRepository;

@Service
public class EmprestimoService {

    private final EmprestimoRepository emprestimoRepository;
    private final LivroRepository livroRepository;
    private final UsuarioRepository usuarioRepository;

    public EmprestimoService(EmprestimoRepository emprestimoRepository,
                              LivroRepository livroRepository,
                              UsuarioRepository usuarioRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Emprestimo> listarTodos() {
        return emprestimoRepository.findAll();
    }

    public Emprestimo buscarPorId(Long id) {
        return emprestimoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Empréstimo não encontrado."
                ));
    }

    public Emprestimo emprestar(Long livroId, Long usuarioId) {
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Livro não encontrado."
                ));
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Usuário não encontrado."
                ));

        boolean livroEmprestado = emprestimoRepository.existsByLivroIdAndStatus(livroId, StatusEmprestimo.EMPRESTADO);
        if (livroEmprestado) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Livro já está emprestado.");
        }

        int emprestimosAtivos = emprestimoRepository
                .findByUsuarioIdAndStatus(usuarioId, StatusEmprestimo.EMPRESTADO)
                .size();
        if (emprestimosAtivos >= 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário já possui 3 empréstimos ativos.");
        }

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setLivro(livro);
        emprestimo.setUsuario(usuario);
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataDevolucaoPrevista(LocalDate.now().plusDays(7));
        emprestimo.setStatus(StatusEmprestimo.EMPRESTADO);

        return emprestimoRepository.save(emprestimo);
    }

    public Emprestimo devolver(Long id) {
        Emprestimo emprestimo = buscarPorId(id);

        if (emprestimo.getStatus() == StatusEmprestimo.DEVOLVIDO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este empréstimo já foi devolvido.");
        }

        emprestimo.setStatus(StatusEmprestimo.DEVOLVIDO);
        return emprestimoRepository.save(emprestimo);
    }

    public void excluir(Long id) {
        emprestimoRepository.deleteById(id);
    }
}

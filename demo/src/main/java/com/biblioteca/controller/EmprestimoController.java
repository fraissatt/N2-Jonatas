package com.biblioteca.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.model.Emprestimo;
import com.biblioteca.service.EmprestimoService;

@RestController
@RequestMapping("/api/emprestimos")
@CrossOrigin("*")
public class EmprestimoController {

    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @GetMapping
    public List<Emprestimo> listarTodos() {
        return emprestimoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Emprestimo buscarPorId(@PathVariable Long id) {
        return emprestimoService.buscarPorId(id);
    }

    @PostMapping
    public Emprestimo emprestar(@RequestParam Long livroId, @RequestParam Long usuarioId) {
        return emprestimoService.emprestar(livroId, usuarioId);
    }

    @PutMapping("/devolver/{id}")
    public Emprestimo devolver(@PathVariable Long id) {
        return emprestimoService.devolver(id);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        emprestimoService.excluir(id);
    }
}

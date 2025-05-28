package com.senai.jonatas.aluguelveiculoapi.controller;

import com.senai.jonatas.aluguelveiculoapi.dto.VeiculoRequestDTO;
import com.senai.jonatas.aluguelveiculoapi.entity.Veiculo;
import com.senai.jonatas.aluguelveiculoapi.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos")
@CrossOrigin("*")
public class VeiculoController {
    @Autowired
    private VeiculoService repo;

    @GetMapping
    public List<Veiculo> listar() {
        return repo.listarTodos();
    }

    @GetMapping(value = "/disponiveis")
    public List<Veiculo> listarDisponiveis() {
        return repo.listarDisponiveis();
    }

    @PostMapping
    public ResponseEntity<Veiculo> criarVeiculo(@RequestBody VeiculoRequestDTO veiculoDTO) {
        Veiculo veiculo = repo.criarVeiculo(veiculoDTO);
        return ResponseEntity.ok(veiculo);
    }

}


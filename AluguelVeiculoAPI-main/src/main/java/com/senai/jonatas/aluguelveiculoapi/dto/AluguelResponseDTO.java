package com.senai.jonatas.aluguelveiculoapi.dto;

import com.senai.jonatas.aluguelveiculoapi.entity.TipoVeiculo;

import java.time.LocalDate;

public record AluguelResponseDTO(
    Long id,
    String clienteNome,
    String veiculoModelo,
    LocalDate dataInicio,
    LocalDate dataFim,
    boolean ativo
) {}

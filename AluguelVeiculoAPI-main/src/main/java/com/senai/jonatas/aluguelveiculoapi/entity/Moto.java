package com.senai.jonatas.aluguelveiculoapi.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("MOTO")
public class Moto extends Veiculo {
    @Override
    public double calcularValorDiaria() {
        return 100.0;
    }
}

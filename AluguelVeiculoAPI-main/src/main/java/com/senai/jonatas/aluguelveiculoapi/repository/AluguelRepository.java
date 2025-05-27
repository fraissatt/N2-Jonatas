package com.senai.jonatas.aluguelveiculoapi.repository;

import com.senai.jonatas.aluguelveiculoapi.entity.Aluguel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AluguelRepository extends JpaRepository<Aluguel, Long> {
    List<Aluguel> findByAtivoTrue();
    List<Aluguel> findByAtivoFalse();

}

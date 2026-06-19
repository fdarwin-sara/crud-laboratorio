package com.upc.crud.repositorios;

import com.upc.crud.entidades.Microscopio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MicroscopioRepository extends JpaRepository<Microscopio, Long> {
}

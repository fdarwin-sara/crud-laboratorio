package com.upc.crud.controllers;

import com.upc.crud.dto.MicroscopioDto;
import com.upc.crud.interfaces.IMicroscopioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", exposedHeaders = "Authorization")
@RequestMapping("/api-upc")
public class MicroscopioController {

    @Autowired
    private IMicroscopioService microscopioService;

    @GetMapping("/microscopios")
    public ResponseEntity<List<MicroscopioDto>> getMicroscopios() {
        List<MicroscopioDto> lista = microscopioService.listarMicroscopio();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/microscopio/{id}")
    public ResponseEntity<MicroscopioDto> getMicroscopioById(@PathVariable Long id) {
        MicroscopioDto Dto = microscopioService.obtenerPorId(id);
        return ResponseEntity.ok(Dto);
    }

    @PostMapping("/microscopio")
    public ResponseEntity<MicroscopioDto> createMicroscopio(@Valid @RequestBody MicroscopioDto microscopioDto) {
        MicroscopioDto creado = microscopioService.insertarMicroscopio(microscopioDto);
        return new ResponseEntity<>(creado, HttpStatus.CREATED);
    }

    @PutMapping("/microscopio/{id}")
    public ResponseEntity<MicroscopioDto> updateMicroscopio(
            @PathVariable Long id, 
            @Valid @RequestBody MicroscopioDto microscopioDto) {
        MicroscopioDto actualizado = microscopioService.actualizarMicroscopio(id, microscopioDto);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/microscopio/{id}")
    public ResponseEntity<Void> deleteMicroscopio(@PathVariable Long id) {
        microscopioService.eliminarMicroscopio(id);
        return ResponseEntity.noContent().build();
    }
}

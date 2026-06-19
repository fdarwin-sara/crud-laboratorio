package com.upc.crud.servicios;

import com.upc.crud.dto.MicroscopioDto;
import com.upc.crud.entidades.Microscopio;
import com.upc.crud.interfaces.IMicroscopioService;
import com.upc.crud.repositorios.MicroscopioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class MicroscopioService implements IMicroscopioService {
    @Autowired
    private MicroscopioRepository microscopioRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    @Override
    public MicroscopioDto insertarMicroscopio(MicroscopioDto microscopioDto) {
        validarFechaFabricacion(microscopioDto.getFechaFabricacion());
        Microscopio microscopio = modelMapper.map(microscopioDto, Microscopio.class);
        microscopio = microscopioRepository.save(microscopio);
        return modelMapper.map(microscopio, MicroscopioDto.class);
    }

    @Transactional
    @Override
    public void eliminarMicroscopio(Long id) {
        if (microscopioRepository.existsById(id)) {
            microscopioRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("No existe el microscopio con id: " + id);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<MicroscopioDto> listarMicroscopio() {
        return microscopioRepository.findAll().stream()
                .map(x -> modelMapper.map(x, MicroscopioDto.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MicroscopioDto obtenerPorId(Long id) {
        Microscopio microscopio = microscopioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No existe el microscopio con id: " + id));
        return modelMapper.map(microscopio, MicroscopioDto.class);
    }

    @Transactional
    @Override
    public MicroscopioDto actualizarMicroscopio(Long id, MicroscopioDto microscopioDto) {
        validarFechaFabricacion(microscopioDto.getFechaFabricacion());
        
        Microscopio microscopioExistente = microscopioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No existe el microscopio con id: " + id));

        microscopioExistente.setCodigo(microscopioDto.getCodigo());
        microscopioExistente.setMarca(microscopioDto.getMarca());
        microscopioExistente.setPrecio(microscopioDto.getPrecio());
        microscopioExistente.setFechaFabricacion(microscopioDto.getFechaFabricacion());
        microscopioExistente.setEstado(microscopioDto.getEstado());

        Microscopio microscopioActualizado = microscopioRepository.save(microscopioExistente);
        return modelMapper.map(microscopioActualizado, MicroscopioDto.class);
    }

    private void validarFechaFabricacion(LocalDate fecha) {
        if (fecha != null && !fecha.isBefore(LocalDate.of(2022, 1, 1))) {
            throw new IllegalArgumentException("La fecha de fabricación debe ser anterior al 2022-01-01");
        }
    }
}

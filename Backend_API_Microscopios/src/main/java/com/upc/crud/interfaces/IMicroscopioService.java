package com.upc.crud.interfaces;

import com.upc.crud.dto.MicroscopioDto;

import java.util.List;

public interface IMicroscopioService {
    MicroscopioDto insertarMicroscopio(MicroscopioDto microscopioDto);
    void eliminarMicroscopio(Long id);
    List<MicroscopioDto> listarMicroscopio();
    MicroscopioDto obtenerPorId(Long id);
    MicroscopioDto actualizarMicroscopio(Long id, MicroscopioDto microscopioDto);
}

package com.upc.crud.entidades;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Marca {
    OLYMPUS("OLYMPUS"),
    NIKON("NIKON"),
    LEICA("LEICA"),
    ZEISS("ZEISS"),
    CARL_ZEISS("CARL ZEISS");

    private final String nombre;

    Marca(String nombre) {
        this.nombre = nombre;
    }

    @JsonValue
    public String getNombre() {
        return nombre;
    }
}

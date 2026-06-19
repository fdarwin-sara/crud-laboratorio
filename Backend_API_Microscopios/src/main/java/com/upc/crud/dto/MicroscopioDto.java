package com.upc.crud.dto;

import com.upc.crud.entidades.Marca;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MicroscopioDto implements Serializable {
    private Long id;

    @NotBlank(message = "El código es obligatorio")
    @Pattern(regexp = "^\\d{3}-\\d{7}$", message = "El formato de código debe ser 888-8888888")
    private String codigo;

    @NotNull(message = "La marca es obligatoria")
    private Marca marca;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a cero")
    private Double precio;

    @NotNull(message = "La fecha de fabricación es obligatoria")
    private LocalDate fechaFabricacion;

    @NotNull(message = "El estado es obligatorio")
    private Boolean estado;
}

import { apiGet, apiPost, apiPatch } from "../api.js";

export async function obtenerPerfil() {
    return await apiGet("/cuenta-config/perfil/obtener");
}

export async function actualizarPerfil(data){
    return await apiPatch("/cuenta-config/perfil/actualizar", data);
}

export async function cambiarPassword(data){
    return await apiPost("/cuenta-config/cambiar-password", data);
}

export async function obtenerDireccion(){
    return await apiGet("/cuenta-config/direccion/obtener");
}

export async function agregarDireccion(data){
    return await apiPost("/cuenta-config/direccion/agregar", data);
}

export async function actualizarDireccion(data){
    return await apiPatch("/cuenta-config/direccion-actualizar", data);
}

export async function obtenerMetodosPago(){
    return await apiGet("/cuenta-config/metodos-pago");
}

export async function agregarMetodoPago(data){
    return await apiPost("/cuenta-config/metodo-pago-agregar", data);
}

export async function actualizarMetodoPago(data){
    return await apiPatch("/cuenta-config/metodo-pago-actualizar", data);
}
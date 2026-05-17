import {
  desactivarUsuario,
  editarUsuario,
  obtenerUsuarioActual,
  obtenerUsuarios,
} from "../../services/admin.services.js";
import { filtrarLista } from "../../utils/filters.js";

import { listarTablaUsuarios } from "./admin.users.ui.js";
import { crearModalEditarUsuario } from "./admin.users.ui.js";

export function registrarEliminarUsuarios({ onActualizarResumen, contenedor }) {
  document.addEventListener("click", async (e) => {
    const btnEliminar = e.target.closest(".btn-eliminar-usuario");

    if (!btnEliminar) return;

    const id = btnEliminar.dataset.id;

    const confirmar = confirm(
      "¿Está seguro de que quiere eliminar este usuario?",
    );

    if (!confirmar) return;

    try {
      await desactivarUsuario(id);

      const data = await obtenerUsuarios();

      listarTablaUsuarios(contenedor, data.usuarios || []);

      await onActualizarResumen();
    } catch (error) {
      console.error("Error eliminando usuario", error);
    }
  });
}

export function registrarEditarUsuario({
  abrirModal,
  cerrarModal,
  contenedor,
  getUsuarios,
  onActualizarResumen,
  onActualizarUsuarios,
}) {
  document.addEventListener("click", (e) => {
    const btnEditar = e.target.closest(".btn-editar-usuario");

    if (!btnEditar) return;

    const id = btnEditar.dataset.id;

    const usuario = getUsuarios().find(
      (usuario) => Number(usuario.id) === Number(id),
    );

    if (!usuario) {
      alert("Usuario no encontrado");
      return;
    }

    abrirModal(crearModalEditarUsuario(usuario));
  });

  document.addEventListener("submit", async (e) => {
    const form = e.target.closest("#formEditarUsuario");

    if (!form) return;

    e.preventDefault();

    const id = form.dataset.id;

    const dataUsuario = {
      nombre: form.nombre.value,
      email: form.email.value.trim(),
      rol: form.rol.value,
      estado: Number(form.estado.value),
    };

    try {
      await editarUsuario(id, dataUsuario);

      await onActualizarUsuarios();

      await onActualizarResumen();

      cerrarModal();
    } catch (error) {
      console.error("Error al editar usuario", error);
    }
  });
}

export function registrarFiltrosUsuarios({ filtros, contenedor, getUsuarios }) {
  if (!filtros.buscarUsuario || !filtros.filtroEstadoUsuario) return;

  function aplicarFiltros() {
    const usuarios = getUsuarios();
    const usuariosFiltrados = filtrarLista(getUsuarios(), {
      nombre: filtros.buscarUsuario.value,
      estado: filtros.filtroEstadoUsuario.value,
    });

    listarTablaUsuarios(contenedor, usuariosFiltrados);
  }

  filtros.buscarUsuario.addEventListener("input", aplicarFiltros);
  filtros.filtroEstadoUsuario.addEventListener("change", aplicarFiltros);
}

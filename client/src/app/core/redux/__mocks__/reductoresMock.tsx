import { Calendario } from 'app/feature/Admin/models/Calendario';
import { CategoriaUsuarios } from 'app/feature/Admin/models/CategoriaUsuarios';
import { CentroVacacional } from 'app/feature/Admin/models/CentroVacacional';
import { Cotizacion } from 'app/feature/Cotizador/models/Cotizacion';

export const calendarioMock = {
  id: 1,
  nombre: 'Calendario de prueba festivos',
  descripcion: 'Descripción de prueba',
  festivos: [ 
    '2021-12-18T00:00:00-05:00',
    '2022-02-22T00:00:00-05:00'
  ]
} as Calendario;

export const categoriaUsuariosMock = {
  id: 5,
  nombre: 'Categoría de usuarios de prueba',
  descripcion: 'Descripción de categoría de usuarios',
  valorAlta: 64000,
  valorBaja: 30000
} as CategoriaUsuarios;

export const centroVacacionalMock = {
  id: 1,
  nombre: 'Centro de prueba',
  descripcion: 'Descripción de prueba',
  calendarios: [],
  categoriaUsuarios: [{
      id: 1,
      nombre: 'Categoría prueba',
      descripcion: '',
      valorAlta: 200,
      valorBaja: 100
  }],
  calendarioActivo: 1  
} as CentroVacacional;

export const cotizacionMock = {
  id: 1,
  codigo: '123-123-123',
  centroVacacional: 1,
  categoriaUsuarios: 1,
  fechaInicio: '2021-12-18',
  fechaFin: '2021-12-18',
  personas: 3
} as Cotizacion;
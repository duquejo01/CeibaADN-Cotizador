import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importaciones generales
import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';

// Transactional Operations
import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { repositorioCalendarioFestivosProvider } from 'src/infraestructura/calendariofestivos/proveedor/repositorio/repositorio-calendariofestivos.proveedor';

/**
 * Guardar
 */
import { ServicioGuardarCalendarioFestivos } from 'src/dominio/calendariofestivos/servicio/servicio-guardar-calendariofestivos';
import { ManejadorGuardarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/guardar-calendariofestivos.manejador';
import { servicioGuardarCalendarioFestivosProveedor } from 'src/infraestructura/calendariofestivos/proveedor/servicio/servicio-guardar-calendariofestivos.proveedor';

/**
 * Actualizar
 */
import { ServicioActualizarCalendarioFestivos } from 'src/dominio/calendariofestivos/servicio/servicio-actualizar-calendariofestivos';
import { ManejadorActualizarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/actualizar-calendariofestivos.manejador';
import { servicioActualizarCalendarioFestivosProveedor } from 'src/infraestructura/calendariofestivos/proveedor/servicio/servicio-actualizar-calendariofestivos.proveedor';

/**
 * Borrar
 */
import { ServicioBorrarCalendarioFestivos } from 'src/dominio/calendariofestivos/servicio/servicio-borrar-calendariofestivos';
import { ManejadorBorrarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/borrar-calendariofestivos.manejador';
import { servicioBorrarCalendarioFestivosProveedor } from 'src/infraestructura/calendariofestivos/proveedor/servicio/servicio-borrar-calendariofestivos.proveedor';

/**
 * Operaciones de lectura
 */
import { ManejadorObtenerCalendarioFestivos } from 'src/aplicacion/calendariofestivos/consulta/obtener-calendariofestivos.manejador';
import { daoCalendarioFestivosProvider } from 'src/infraestructura/calendariofestivos/proveedor/dao/dao-calendariofestivos.proveedor';
import { DaoCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/dao/dao-calendariofestivos';

@Module({
  imports: [TypeOrmModule.forFeature( [ CalendarioFestivosEntidad ] ) ],
  providers: [
    {
      provide: ServicioGuardarCalendarioFestivos, // Dominio / Servicio
      inject: [ RepositorioCalendarioFestivos ], // Dominio / Repositorio
      useFactory: servicioGuardarCalendarioFestivosProveedor // Infraestructura / Proveedor / Servicio
    },
    {
      provide: ServicioActualizarCalendarioFestivos,
      inject: [ RepositorioCalendarioFestivos ],
      useFactory: servicioActualizarCalendarioFestivosProveedor
    },
    {
      provide: ServicioBorrarCalendarioFestivos,
      inject: [ RepositorioCalendarioFestivos ],
      useFactory: servicioBorrarCalendarioFestivosProveedor
    },

    // Read Operations
    ManejadorObtenerCalendarioFestivos, // Aplicaci??n / Consulta / DTO
    daoCalendarioFestivosProvider, // Infraestructura / Proveedor / DAO

    // Transactional Operations
    ManejadorGuardarCalendarioFestivos, // Aplicaci??n / Comando
    ManejadorActualizarCalendarioFestivos, // Aplicaci??n / Comando
    ManejadorBorrarCalendarioFestivos, // Aplicaci??n / Comando

    repositorioCalendarioFestivosProvider, // Aplicaci??n / Proveedor / Repositorio
  ],
  exports: [

    // Read Operations
    ManejadorObtenerCalendarioFestivos, // Aplicaci??n / Consulta / DTO
    DaoCalendarioFestivos, // Dominio / Puerto / DAO

    // Transactional Operations
    RepositorioCalendarioFestivos, // Dominio / Repositorio
    
    ServicioGuardarCalendarioFestivos, // Dominio / Servicio
    ManejadorGuardarCalendarioFestivos, // Aplicaci??n / Comando

    ServicioActualizarCalendarioFestivos, // Dominio / Servicio
    ManejadorActualizarCalendarioFestivos, // Aplicaci??n / Comando

    ServicioBorrarCalendarioFestivos, // Dominio / Servicio
    ManejadorBorrarCalendarioFestivos, // Aplicaci??n / Comando
  ],
})
export class CalendarioFestivosProveedorModule {}

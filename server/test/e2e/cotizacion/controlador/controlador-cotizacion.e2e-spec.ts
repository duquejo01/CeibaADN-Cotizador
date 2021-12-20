import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { createStubObj } from '../../../util/create-object.stub';
import { HttpStatus, INestApplication, Body, HttpCode } from '@nestjs/common';
import { createSandbox, SinonStubbedInstance } from 'sinon';

import { AppLogger } from '../../../../src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from '../../../../src/infraestructura/excepciones/filtro-excepciones-negocio';
import { RepositorioCotizacion } from '../../../../src/dominio/cotizacion/puerto/repositorio/repositorio-cotizacion';
import { DaoCotizacion } from '../../../../src/dominio/cotizacion/puerto/dao/dao-cotizacion';
import { CotizacionControlador } from '../../../../src/infraestructura/cotizacion/controlador/cotizacion.controlador';
import { ServicioCrearCotizacion } from '../../../../src/dominio/cotizacion/servicio/servicio-registrar-cotizacion';
import { servicioCrearCotizacionProveedor } from '../../../../src/infraestructura/cotizacion/proveedor/servicio/servicio-registrar-cotizacion.proveedor';
import { ManejadorCrearCotizacion } from '../../../../src/aplicacion/cotizacion/comando/registrar-cotizacion.manejador';
import { ManejadorObtenerCotizacion } from '../../../../src/aplicacion/cotizacion/consulta/obtener-cotizacion.manejador';

// Generales

// Leer

// Guardar

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de la cotización', () => {

  let app: INestApplication;
  let repositorioCotizacion: SinonStubbedInstance<RepositorioCotizacion>;
  // let repositorioCentroVacacional: SinonStubbedInstance<RepositorioCentroVacacional>;
  let daoCotizacion: SinonStubbedInstance<DaoCotizacion>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll( async () => {

    repositorioCotizacion = createStubObj<RepositorioCotizacion>([
      'crear'
    ], sinonSandbox);

    // repositorioCentroVacacional = createStubObj<RepositorioCentroVacacional>([
    //   'obtenerUnCentroVacacional'
    // ], sinonSandbox);

    daoCotizacion         = createStubObj<DaoCotizacion>(['obtenerUnaCotizacion'], sinonSandbox);
    
    const moduleRef = await Test.createTestingModule({
      controllers: [ CotizacionControlador ],
      providers: [
        AppLogger,
        {
          provide:    ServicioCrearCotizacion,
          inject:     [ RepositorioCotizacion ],
          // inject:     [ RepositorioCotizacion, RepositorioCentroVacacional ],
          useFactory: servicioCrearCotizacionProveedor,
        },
        { provide: RepositorioCotizacion, useValue: repositorioCotizacion },
        { provide: DaoCotizacion, useValue: daoCotizacion },

        /**
         * CRUD Handlers
         */
        ManejadorCrearCotizacion,
        ManejadorObtenerCotizacion
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    const logger = await app.resolve( AppLogger );
    logger.customError = sinonSandbox.stub();

    app.useGlobalFilters( new FiltroExcepcionesDeNegocio( logger ) );

    await app.init();
  });

  afterEach( () => sinonSandbox.restore() );

  afterAll( async () => await app.close() );

  it('Debería obtener un cotización registrada', () => {

    const cotizacionDataMock : any = {
      centroVacacional: 1,
      categoriaUsuarios: 2,
      personas: 3,
      fechaInicio: '2021-12-10',
      fechaFin: '2021-12-18'
    };

    const cotizacionId = 1;

    daoCotizacion.obtenerUnaCotizacion.returns( Promise.resolve( cotizacionDataMock ) );

    return request( app.getHttpServer() )
      .get( `/cotizaciones/${ cotizacionId }` )
      .expect( HttpStatus.OK )
      .expect( cotizacionDataMock );
  });

  // it('Debería fallar al registrar si la cotización no tiene un centro vacacional válido', async () => {

  //   const centroVacacionalDataMock = {
  //     calendarioActivo: 1,
  //     calendarios: [{
  //       id: 1,
  //       festivos: [
  //         "2021-12-18"
  //       ]
  //     }]
  //   } as CentroVacacionalEntidad;
  
  //   const categoriaUsuariosDataMock = {
  //     nombre: "Menor a $800.000 COP",
  //     descripcion: "Cartagena",
  //     valorAlta: 50000,
  //     valorBaja: 25000
  //   } as CategoriaUsuariosEntidad;  

  //   const cotizacionDataMock : ComandoCrearCotizacion = {
  //     centroVacacional: 1,
  //     categoriaUsuarios: 2,
  //     personas: 3,
  //     fechaInicio: '2021-12-10',
  //     fechaFin: '2021-12-18'
  //   };

  //   repositorioCentroVacacional.obtenerUnCentroVacacional.returns( Promise.resolve( centroVacacionalDataMock ) );

  //   return request( app.getHttpServer() )
  //     .post('/cotizaciones')
  //     .send( cotizacionDataMock )
  //     .expect( HttpStatus.NOT_FOUND );   
  // });
});
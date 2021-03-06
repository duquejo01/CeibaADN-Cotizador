import { Calendario } from '../../feature/Admin/models/Calendario';
import { CategoriaUsuarios } from '../../feature/Admin/models/CategoriaUsuarios';
import { CentroVacacional } from '../../feature/Admin/models/CentroVacacional';
import { EstadoCalendario } from './modelo/EstadoCalendario';
import { EstadoCategoriaUsuarios } from './modelo/EstadoCategoriaUsuarios';
import { EstadoCentroVacacional } from './modelo/EstadoCentroVacacional';
import { EstadoUI } from './modelo/EstadoUI';
import { createStore } from 'redux';
import rootReducer from './reductores';

describe('Pruebas sobre el RootStore', () => {

    const store = createStore( rootReducer );

    const estadoInicialCalendario: EstadoCalendario = {
        calendarios: Array<Calendario>(),
        calendarioActivo: null
    };

    const estadoInicialCategoriaUsuarios: EstadoCategoriaUsuarios = {
        categoriasUsuarios: Array<CategoriaUsuarios>()
    };   
    
    const estadoInicialCentroVacacional: EstadoCentroVacacional = {
        centrosVacacionales: Array<CentroVacacional>(),
        centroVacacionalActivo: null
    };

    const estadoInicialUI: EstadoUI = {
        modalOpen: Boolean(),
        type: false
    };

    it('Debería instanciar el RootStore', () => {
        expect( store.getState().calendarios ).toEqual( estadoInicialCalendario );
        expect( store.getState().categoriasUsuarios ).toEqual( estadoInicialCategoriaUsuarios );
        expect( store.getState().centrosVacacionales ).toEqual( estadoInicialCentroVacacional );
        expect( store.getState().ui ).toEqual( estadoInicialUI ); 
    });
});

import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorGestionCotizaciones } from '../hoc/ProveedorGestionCotizaciones';
import { RouteComponentProps } from 'react-router-dom';

const CotizadorMainPage: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <h1>Generación de cotizaciones</h1>    
      <Layout title="Cotizador" description="Generación de cotizaciones">

        {/* Proveedor Redux Gestión de Cotizaciones */}
        <ProveedorGestionCotizaciones />

      </Layout>
    </>
  );
};

CotizadorMainPage.displayName = 'CotizadorMainPage';

export default CotizadorMainPage;

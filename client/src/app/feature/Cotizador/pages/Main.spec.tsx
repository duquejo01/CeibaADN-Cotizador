import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import CotizadorMainPage from 'app/feature/Cotizador/pages/Main';

jest.mock('ChildrenNode', () => {
    return ( <span>ChildrenNode</span> );
}, { virtual: true });

const historyMock = { push: jest.fn() };

describe('Pruebas sobre <CotizadorMainPage />', () => {

    let componentWrapper: ShallowWrapper;
    let componentProps: React.ComponentProps<typeof CotizadorMainPage> & {
        children: ChildNode
    };
    
    beforeEach( () => {
        componentWrapper = shallow( <CotizadorMainPage {...componentProps} /> );
    });

    it('Debería renderizar bien el elemento padre', () => {
        expect( componentWrapper ).toMatchSnapshot();
    });
});
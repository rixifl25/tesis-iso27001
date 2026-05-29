// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { User, List, FileText } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
    return (
        <Nav pills className='mb-2'>
            <NavItem>
                <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
                    <User size={18} className='me-50' />
                    <span className='fw-bold'>ANALISIS</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
                    <List size={18} className='me-50' />
                    <span className='fw-bold'>ESTADO DE LOS CONTROLES</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
                    <List size={18} className='me-50' />
                    <span className='fw-bold'>ESTADO GENERAL DE LOS CONTROLES</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
                    <FileText size={18} className='me-50' />
                    <span className='fw-bold'>ENCUESTAS ANTERIORES</span>
                </NavLink>
            </NavItem>
        </Nav>
    )
}

export default Tabs
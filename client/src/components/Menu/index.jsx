import { Container, Nav, Navbar, } from 'react-bootstrap';

import { AuthGate } from '../AuthGate'

export const Menu = () => {

    const logout = () => {
        localStorage.removeItem('currentUser');
        window.location.assign('/');
    }

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/">FLOM</Navbar.Brand>

                <AuthGate type='menu'>
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard/survey">ActiveSurveys</Nav.Link>
                        <Nav.Link href="/dashboard/surveyAdd">ImportSurvey</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link onClick={logout}>Log Out</Nav.Link>
                    </Nav>
                </AuthGate>
                <AuthGate type='menu' toggle={true} >
                <Nav className="justify-content-end">
                    <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </AuthGate>
            </Container>
        </Navbar>
    )
};
import React, { useEffect } from 'react'
import firebase from '../firebase';
import { Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, loginUser } from '../Reducer/userSlice';
import { useNavigate } from 'react-router-dom';

/* assets */
import '../Assets/AdminMainpage.css';

function AdminMainpage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    useEffect(() => {

        firebase.auth().onAuthStateChanged((userInfo) => {

            if (userInfo !== null) {
                dispatch(loginUser(userInfo.multiFactor.user));
            } else {
                dispatch(clearUser());
            }

        })

    }, [])

    useEffect(() => {

        if (user.isLoading && !user.accessToken) {
            navigate("/adm");
        }

    }, [user])

    const logoutHandler = () => {
        firebase.auth().signOut();
        navigate("/adm");
    }


    return (
        <>
            <header id='header'>
                <Navbar expand='lg'>
                    <Container>
                        <Navbar.Brand>관리자페이지</Navbar.Brand>
                        <button onClick={() => logoutHandler()}>로그아웃</button>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default AdminMainpage
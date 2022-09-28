import React, { useEffect, useState } from 'react'
import firebase from '../firebase';
import { Container, Form, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, loginUser } from '../Reducer/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/* assets */
import '../Assets/AdminMainpage.css';

function AdminMainpage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Image, setImage] = useState("");

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

    const fileUpload = (e) => {
        console.log(e);

        var formData = new FormData();
        formData.append("file", (e.target.files[0]));

        axios.post("/api/post/image/upload", formData).then((res) => {
            if (res.data.success) {
                setImage(res.data.filePath);
            }
        });
    }

    const onSubmit = (e) => {

        e.preventDefault();

        if (Image === "") {
            return alert("이미지를 선택해주세요.");
        }

        let body = {
            image: Image
        }

        axios.post("/api/post/submit", body).then((res) => {

            if (res.data.success) {
                window.location.reload();
            } else {
                alert("이미지 등록 실패!");
            }

        }).catch((err) => {
            console.log(err);
        })
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
            <div id='admin-body'>
                <Container>
                    <div className='admin-body-studio-image'>
                        <div className='admin-body-title'>
                            <h2>작업실 이미지 수정</h2>
                        </div>
                        <div className='admin-body-content'>
                            <Form.Control type='file' accept='image/*' onChange={(e) => fileUpload(e)}></Form.Control>
                        </div>
                        <div className='admin-body-submit-button'>
                            <button onClick={(e) => { onSubmit(e) }}>등록</button>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default AdminMainpage
import React, { useState } from 'react'
import { } from 'react-bootstrap';
import firebase from '../firebase.js';
import { useNavigate } from 'react-router-dom'

/* assets */
import '../Assets/AdminLogin.css';

function AdminLogin() {

    let navigate = useNavigate();

    const [Id, setId] = useState("");
    const [Pw, setPw] = useState("");

    const login = async (e) => {
        e.preventDefault();

        try {

            await firebase.auth().signInWithEmailAndPassword(Id, Pw);
            navigate("/admmain");

        } catch (err) {

            if (err.code === "auth/user-not-found") {
                console.log("존재하지 않는 이메일 입니다.");
            } else if (err.code === "auth/wrong-password") {
                console.log("비밀번호가 일치하지 않습니다.")
            } else {
                console.log("로그인이 실패하였습니다.")
            }

        }
    }

    return (
        <>
            <div id='reservation-view-admin-login-wrap'>
                <div className='reservation-view-admin-login'>
                    <div className='reservation-view-admin-login-title'>
                        <span>SO.A_TATTOO</span>
                    </div>
                    <div className='reservation-view-admin-login-form'>
                        <form>
                            <label>이메일</label>
                            <div className='reservation-view-admin-login-id'>
                                <input type='email' value={Id} onChange={(e) => { setId(e.currentTarget.value) }} placeholder="이메일" required></input>
                            </div>
                            <label>비밀번호</label>
                            <div className='reservation-view-admin-login-pw'>
                                <input type='password' value={Pw} onChange={(e) => { setPw(e.currentTarget.value) }} placeholder="비밀번호" required></input>
                            </div>
                            <div className='reservation-view-admin-login-button'>
                                <button onClick={(e) => login(e)}>로그인</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import axios from 'axios';

/* assets */
import '../Assets/Mainpage.css';

/* components */
import Calendar from './Calendar';

function Mainpage() {

    const [ProfileImage, setProfileImage] = useState("");
    const [ProfileIntro, setProfileIntro] = useState("");
    const [StudioImage, setStudioImage] = useState("");
    const [StudioLocation, setStudioLocation] = useState("");
    const [StudioEtc, setStudioEtc] = useState("");

    useEffect(() => {

        axios.post("/api/post/profileimage").then((res) => {

            if (res.data.success) {
                setProfileImage(`http://localhost:5000/${res.data.filePath}`);
            }

        }).catch((err) => {
            console.log(err);
        })

    }, [ProfileImage])

    useEffect(() => {

        axios.post("/api/info/profileintro").then((res) => {
            if (res.data.success) {
                setProfileIntro(res.data.intro);
            }
        }).catch((err) => {
            console.log(err);
        })

    }, [ProfileIntro])

    useEffect(() => {

        axios.post("/api/post/studioimage").then((res) => {

            if (res.data.success) {
                setStudioImage(`http://localhost:5000/${res.data.filePath}`);
            }

        }).catch((err) => {
            console.log(err);
        })

    }, [StudioImage])

    useEffect(() => {

        axios.post("/api/info/studiolocation").then((res) => {
            if (res.data.success) {
                setStudioLocation(res.data.location);
            }
        }).catch((err) => {
            console.log(err);
        })

    }, [StudioLocation])

    useEffect(() => {
        axios.post("/api/info/studioetc").then((res) => {
            if (res.data.success) {
                setStudioEtc(res.data.etc);
            }
        }).catch((err) => {
            console.log(err);
        })

    }, [StudioEtc])

    return (
        <>
            <div id='reservation-view-title-wrap'>
                <Container>
                    <div className='reservation-view-content-wrap'>
                        <div className='reservation-view-content-image-wrap'>
                            <div className='reservation-view-content-image'>
                                <img src={ProfileImage} alt='profileImage'></img>
                            </div>
                        </div>
                        <div className='reservation-view-content-name'>
                            <span>SO.A</span>
                        </div>
                        <div className='reservation-view-content-intro'>
                            <p style={{ whiteSpace: "pre-line", lineHeight: "2rem" }}>{ProfileIntro}</p>
                        </div>
                        <div className='reservation-view-content-link'>
                            <a href='https://www.instagram.com/so.a_tattoo'>
                                <div className='reservation-view-content-link-instagram'>@so.a_tattoo</div>
                            </a>
                            <a href='https://pf.kakao.com/_EpeXb'>
                                <div className='reservation-view-content-link-kakao'>카카오톡 문의하기</div>
                            </a>
                        </div>
                    </div>
                </Container>
            </div>

            {/* 달력 */}
            <div>
                <Container>
                    <Calendar></Calendar>
                </Container>
            </div>

            {/* 작업실 소개 */}
            <div id='studio-info-wrap'>
                <Container>
                    <div className='studio-info-content-wrap'>
                        {/* 작업실 사진 */}
                        <div className='studio-info-content-image'>
                            <img src={StudioImage} alt='studioImage'></img>
                        </div>
                        {/* 작업실 소개글 */}
                        <div className='studio-info-content-text'>
                            <div className='studio-info-content-text-title'>
                                <span>작업실 소개</span>
                            </div>
                            <div className='studio-info-content-text-location'>
                                <p>{StudioLocation}</p>
                            </div>
                            <div className='studio-info-content-text-etc'>
                                <p style={{ whiteSpace: "pre-line", lineHeight: "2rem" }}>{StudioEtc}</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Mainpage
import React from 'react'
import { Container } from 'react-bootstrap';

/* assets */
import '../Assets/Mainpage.css';
import profileImage from '../Assets/SoaProfile.jpg';
import studioImage from '../Assets/studio.jpg';

function Mainpage() {

    return (
        <>
            <div id='reservation-view-title-wrap'>
                <Container>
                    <div className='reservation-view-content-wrap'>
                        <div className='reservation-view-content-image-wrap'>
                            <div className='reservation-view-content-image'>
                                <img src={profileImage} alt='profileImage'></img>
                            </div>
                        </div>
                        <div className='reservation-view-content-name'>
                            <span>SO.A</span>
                        </div>
                        <div className='reservation-view-content-intro'>
                            <p>자기소개 공간입니다.</p>
                            <p>자기소개를 입력하세요.</p>
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

            {/* 작업실 소개 */}
            <div id='studio-info-wrap'>
                <Container>
                    <div className='studio-info-content-wrap'>
                        {/* 작업실 사진 */}
                        <div className='studio-info-content-image'>
                            <img src={studioImage} alt='studioImage'></img>
                        </div>
                        {/* 작업실 소개글 */}
                        <div className='studio-info-content-text'>
                            <p>동촌역 인근 도보 5분거리</p>
                            <p>공유 오피스</p>
                            <p>주차 가능</p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Mainpage
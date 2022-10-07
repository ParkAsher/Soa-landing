import React, { useEffect, useState } from 'react'
import firebase from '../firebase';
import { Container, Dropdown, DropdownButton, Form, Navbar, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, loginUser } from '../Reducer/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import moment from 'moment';
import 'moment/locale/ko';

/* assets */
import '../Assets/AdminMainpage.css';
import 'react-datepicker/dist/react-datepicker.css';

function AdminMainpage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Sort, setSort] = useState("예약");
    const [ReserveList, setReserveList] = useState([]);

    const [IsChecked, setIsChecked] = useState(false);
    const [CheckedId, setCheckedId] = useState("");

    const [ReserveType, setReserveType] = useState("예약");
    const [StartDate, setStartDate] = useState(new Date());
    const [ReserveName, setReserveName] = useState("");
    const [ReserveEtc, setReserveEtc] = useState("");

    const [ProfileImage, setProfileImage] = useState("");
    const [ProfileIntro, setProfileIntro] = useState("");

    const [StudioImage, setStudioImage] = useState("");

    const [StudioLocation, setStudioLocation] = useState("");
    const [StudioEtc, setStudioEtc] = useState("");

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

    /* list */
    const getreservelist = () => {

        let body = {
            sort: Sort,
        }

        axios.post("/api/reserve/list", body).then((res) => {

            if (res.data.success) {
                setReserveList([...res.data.reserveList]);
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getreservelist();
        setIsChecked(false);
        setCheckedId("");
    }, [Sort])

    /* reserve */
    const reserveonsubmit = (e) => {
        e.preventDefault();

        if (ReserveType === "예약" && ReserveName === "") {
            return alert("이름을 입력해주세요.");
        }

        let body = {
            reserveType: ReserveType,
            reserveDate: moment(StartDate).format("YYYY-MM-DD"),
            reserveName: ReserveName,
            reserveEtc: ReserveEtc,
        }

        axios.post("/api/reserve/submit", body).then((res) => {
            if (res.data.success) {
                window.location.reload();
            } else {
                alert("일정 등록 실패!");
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    /* studio */
    const studiofileUpload = (e) => {
        console.log(e);

        var formData = new FormData();
        formData.append("file", (e.target.files[0]));

        axios.post("/api/post/image/upload", formData).then((res) => {
            if (res.data.success) {
                setStudioImage(res.data.filePath);
            }
        });
    }

    const studioonSubmit = (e) => {

        e.preventDefault();

        if (StudioImage === "") {
            return alert("이미지를 선택해주세요.");
        }

        let body = {
            imageType: "studio",
            image: StudioImage
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

    /* profile */
    const profileFileUpload = (e) => {
        console.log(e);

        var formData = new FormData();
        formData.append("file", (e.target.files[0]));

        axios.post("/api/post/image/upload", formData).then((res) => {
            if (res.data.success) {
                setProfileImage(res.data.filePath);
            }
        });
    }

    const profileonsubmit = (e) => {

        e.preventDefault();

        if (ProfileImage === "") {
            return alert("이미지를 선택해주세요.");
        }

        let body = {
            imageType: "profile",
            image: ProfileImage
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

    /* 작업실 위치 */
    const locationonsubmit = (e) => {
        e.preventDefault();

        if (StudioLocation === "") {
            return alert("작업실 위치를 입력해주세요.")
        }

        let body = {
            infoType: "location",
            info: StudioLocation
        }

        axios.post("/api/info/submit", body).then((res) => {
            if (res.data.success) {
                window.location.reload();
            } else {
                alert("작업실 위치 등록 실패");
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    /* 작업실 설명 */
    const etconsubmit = (e) => {
        e.preventDefault();

        if (StudioEtc === "") {
            return alert("작업실 설명을 입력해주세요.")
        }

        let body = {
            infoType: "etc",
            info: StudioEtc
        }

        axios.post("/api/info/submit", body).then((res) => {
            if (res.data.success) {
                window.location.reload();
            } else {
                alert("작업실 설명 등록 실패");
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    /* 프로필 자기소개 */
    const introonsubmit = (e) => {
        e.preventDefault();

        if (ProfileIntro === "") {
            return alert("자기소개를 입력해주세요.")
        }

        let body = {
            infoType: "intro",
            info: ProfileIntro
        }

        axios.post("/api/info/submit", body).then((res) => {
            if (res.data.success) {
                window.location.reload();
            } else {
                alert("자기소개 등록 실패");
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const inputCheckedId = (e, id) => {

        if (e.target.checked) {
            setIsChecked(true)
            setCheckedId(id)
        } else {
            setIsChecked(false)
            setCheckedId("")
        }

    }

    const checkedReserveDelete = (e) => {
        e.preventDefault();

        if (IsChecked === false || CheckedId === "") {
            return alert("삭제할 일정을 선택해주세요!");
        }

        let body = {
            reserveId: CheckedId,
        }

        axios.post("/api/reserve/delete", body).then((res) => {

            if (res.data.success) {
                window.location.reload();
            } else {
                alert("삭제에 실패했습니다.")
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
                    <div className='admin-body-reservation-status'>
                        <div className='admin-body-title'>
                            <h2>일정</h2>
                        </div>
                        <div className='admin-body-content'>
                            <div className='admin-body-content-btn'>
                                <div className='admin-body-content-btn-left'>
                                    <DropdownButton variant='outline-secondary' title={Sort} >
                                        <Dropdown.Item onClick={() => setSort("예약")}>예약</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setSort("휴무")}>휴무</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                                <div className='admin-body-content-btn-right'>
                                    <button onClick={(e) => checkedReserveDelete(e)}>삭제</button>
                                </div>
                            </div>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>종류</th>
                                        <th>날짜</th>
                                        <th>이름</th>
                                        <th>특이사항</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ReserveList.map((reserve, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td><Form.Check onChange={(e) => { inputCheckedId(e, reserve._id) }} disabled={IsChecked && (CheckedId !== reserve._id) ? true : false}></Form.Check></td>
                                                <td style={{ display: "none" }}>{reserve._id}</td>
                                                <td>{reserve.reserveType}</td>
                                                <td>{moment(reserve.reserveDate).format("YYYY년 MM월 DD일")}</td>
                                                <td>{reserve.reserveName}</td>
                                                <td>{reserve.reserveEtc}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <div className='admin-body-reservation'>
                        <div className='admin-body-title'>
                            <h2>예약 / 휴무 등록</h2>
                            <p style={{ color: "red" }}>예약/휴무, 날짜, 이름, 특이사항</p>
                        </div>
                        <div className='admin-body-content'>
                            <div className='admin-body-content-first'>
                                <Form.Select defaultValue={ReserveType} onChange={(e) => setReserveType(e.currentTarget.value)}>
                                    <option value="예약">예약</option>
                                    <option value="휴무">휴뮤</option>
                                </Form.Select>
                                <Datepicker className='form-control' dateFormat="yyyy/MM/dd" locale={ko} selected={StartDate} minDate={new Date()} onChange={(date) => setStartDate(date)}></Datepicker>
                                <Form.Control type='text' onChange={(e) => setReserveName(e.currentTarget.value)} placeholder="이름" disabled={ReserveType === "휴무" ? true : false}></Form.Control>
                            </div>
                            <div className='admin-body-content-second'>
                                <Form.Control type='text' onChange={(e) => setReserveEtc(e.currentTarget.value)} placeholder="특이사항"></Form.Control>
                            </div>
                        </div>
                        <div className='admin-body-submit-button'>
                            <button onClick={(e) => reserveonsubmit(e)}>등록</button>
                        </div>
                    </div>
                    <div className='admin-body-profile-image'>
                        <div className='admin-body-title'>
                            <h2>프로필 이미지 수정</h2>
                        </div>
                        <div className='admin-body-content'>
                            <Form.Control type='file' accept='image/*' onChange={(e) => profileFileUpload(e)}></Form.Control>
                        </div>
                        <div className='admin-body-submit-button'>
                            <button onClick={(e) => { profileonsubmit(e) }}>등록</button>
                        </div>
                    </div>
                    <div className='admin-body-profile-intro'>
                        <div className='admin-body-title'>
                            <h2>프로필 자기소개 수정</h2>
                        </div>
                        <div className='admin-body-content'>
                            <Form.Control as="textarea" onChange={(e) => setProfileIntro(e.currentTarget.value)}></Form.Control>
                        </div>
                        <div className='admin-body-submit-button'>
                            <button onClick={(e) => { introonsubmit(e) }}>등록</button>
                        </div>
                    </div>
                    <div className='admin-body-studio-image'>
                        <div className='admin-body-title'>
                            <h2>작업실 이미지 수정</h2>
                        </div>
                        <div className='admin-body-content'>
                            <Form.Control type='file' accept='image/*' onChange={(e) => studiofileUpload(e)}></Form.Control>
                        </div>
                        <div className='admin-body-submit-button'>
                            <button onClick={(e) => { studioonSubmit(e) }}>등록</button>
                        </div>
                    </div>
                    <div className='admin-body-studio-info'>
                        <div className='admin-body-title'>
                            <h2>작업실 소개 수정</h2>
                        </div>
                        <div className='admin-body-content'>
                            <div className='admin-body-content-subtitle'>
                                <span>작업실 위치</span>
                            </div>
                            <div>
                                <Form.Control type='text' onChange={(e) => setStudioLocation(e.currentTarget.value)}></Form.Control>
                            </div>
                            <div className='admin-body-submit-button'>
                                <button onClick={(e) => { locationonsubmit(e) }}>등록</button>
                            </div>
                            <div className='admin-body-content-subtitle'>
                                <span>작업실 설명</span>
                            </div>
                            <div>
                                <Form.Control as='textarea' onChange={(e) => setStudioEtc(e.currentTarget.value)}></Form.Control>
                            </div>
                            <div className='admin-body-submit-button'>
                                <button onClick={(e) => { etconsubmit(e) }}>등록</button>
                            </div>
                        </div>

                    </div>
                </Container>
            </div >
        </>
    )
}

export default AdminMainpage
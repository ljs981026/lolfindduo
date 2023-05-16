import axios from "axios";
import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinForm = ({changeBtn, sub, form}) => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [correctId, setCorrectId] = useState(false);
    const [correctPw, setCorrectPw] = useState(false);
    const [chkId, setChkId] = useState(false);
    const [chkPw, setChkPw] = useState(false);
    const [pw, setPw] = useState("");
    const [summonerName, setSummonerName] = useState("");
    const [equal, setEqual] = useState(false);

    const onChange = (e) => {
        const {target: {value}} = e;
        if(e.target.placeholder === "아이디") {
            setId(value);
            return joinForm(e);
        }
        if(e.target.placeholder === "비밀번호") {
            setPw(value);
            return joinForm(e);
        }
        if(e.target.placeholder === "소환사 명") {
            setSummonerName(value);
            return joinForm(e);
        }
    }

    const joinForm = (e) => {
        const {target: {value}} =e;
        let regExpid = /^[a-z]+[0-9]{5,19}$/;
        let regExppw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
        console.log(value);
        if(e.target.placeholder === "아이디") {
            if(regExpid.test(value)) {
                setCorrectId(true)
            } else {
                setCorrectId(false)
                setChkId(false);
            }
        } 
        if(e.target.placeholder === "비밀번호") {
            if(regExppw.test(value)) {
                setCorrectPw(true)
            } else {
                setCorrectPw(false)
                setChkPw(false)
            }
        }
    }

    const onJoin = (e) => {
        e.preventDefault();
        if(chkId === false) {      
            if(id === "") {
                alert("아이디를 입력해주세요");
            } else if(correctId === false) {
                alert("아이디 조건을 일치시켜주세요.");
            } else {
                alert("중복 여부를 체크해주세요");
            }
        }
        if(chkPw === false) {
            console.log(equal);
            if(pw === "") {
                alert("비밀번호를 입력해주세요");
            } else if(correctPw === false) {
                alert("비밀번호 조건을 충족시켜주세요.")
            } else if(equal === false) {
                alert("비밀번호가 일치하지 않습니다. 확인해주세요.");
            } 
        }
         else if(summonerName === "") {
            alert("소환사 이름을 입력해주세요")
        } else {
            userInsert();
        }
    }

    const isEqualPW = (e) => {
        const {target: {value}} = e;
        console.log(value);
        if(value === pw) {
            setEqual(true);
            setChkPw(true)
        } else {
            setEqual(false);
            setChkPw(false);
        }
    }

    const userInsert = () => {
        console.log(id, pw, summonerName);
        axios.post(
            // /api/join?ID={id}&PW={pw}&summonerNAME={summonerName}
            '/api/memberInput', null,
            { params: {
                id: id,
                pw: pw,
                userName: summonerName,
            }})
            .then(function(response) {
                console.log(response);
                sessionStorage.setItem("id", id);
                sessionStorage.setItem("sname", summonerName);
                alert("회원가입완료");                
                navigate("/main", {state:{id: sessionStorage.getItem("id")}})
            })
            .catch(function(error) {
                console.log(error);
                alert("회원가입실패");
            }
        )
    }

    const isIdDuplicate = (e) => {
        e.preventDefault();
        if(id === "") {
            alert("아이디를 먼저 입력해주세요.");
        } else if(correctId === false) {
            alert("아이디 조건을 일치시켜주세요.");
        } else {
            axios.get(
                '/api/idDupChk',
            { params : {
                id: id
                }
            }
            ).then(function(response) {
                if(response.data) {
                    alert("중복된 아이디입니다.")
                } else {
                    alert("사용 가능한 아이디입니다.")
                    setChkId(true);
                }
            })
            .catch(function(error) {
                console.log(error);
            }) 
        }
    }

    return (
        <div className="login_form">
            {/* <div className="logo_box"></div> */}
            <form onSubmit={onJoin}>
                <div className="input_box join">
                    <div className="input_id_box">
                        <input type="text" placeholder="아이디" value={id} onChange={onChange}/>
                        <input type="button" className="dupbtn" value="중복검사" onClick={isIdDuplicate} />                        
                    </div>
                    {correctId ? <span className="case correct">조건이 충족된 아이디입니다.</span> : <span className="case">* 영문자로 시작하는 영문자 또는 숫자 6~20자</span>}
                    <div className="input_pw_box">
                        <input type="password" placeholder="비밀번호" value={pw} onChange={onChange}></input>
                        {correctPw ? <span className="case correct">조건이 충족된 비밀번호입니다.</span> : <span className="case">* 최소 8 자, 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상</span>}
                        <input type="password" placeholder="PW" onChange={isEqualPW}></input>
                        {equal ? <span className="case correct">일치합니다.</span> : <span className="case">일치하지않습니다.</span>}
                        <input type="text" placeholder="소환사 명" value={summonerName} onChange={onChange}></input>
                        <input type="submit" value="회원가입"/>
                    </div>
                </div>
            </form>    
        </div>
    )
}

export default JoinForm;
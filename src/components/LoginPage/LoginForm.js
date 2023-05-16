import axios from "axios";
import Navigator from "components/Navigator";
import { animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [textId, setTextId] = useState('');
    const [textPw, setTextPw] = useState('');
    const [userAuth, setUserAuth] = useState(false);
    const navigate = useNavigate();

    const onChange = (e) => {
        console.log(e.target.type);
        if(e.target.type === "text") {
            const {target: {value}} = e;
            setTextId(value);
            
        }
        if(e.target.type === "password") {
            const {target: {value}} = e;
            setTextPw(value);            
        }        
    }

    const getUserAuth = (e) => {
        e.preventDefault();
          axios.get(
            '/api/login',
            { params: {
                id: textId,
                pw: textPw,
            }})
            .then(function(response) {                
                if(response.data) {
                    sessionStorage.setItem("id", response.data.id);
                    sessionStorage.setItem("sname", response.data.summoner_Name);
                    alert("로그인 성공");
                    // window.location.replace('/main');
                    navigate("/main", {state:{id: sessionStorage.getItem("id")}})
                } else {
                    alert("회원 정보가 없습니다.")
                }
            })
            .catch(function(error) {
                console.log(error);
            }
        )
    }
    return (
        <div className="login_form">
            <div className="logo_box"></div>
            <form onSubmit={getUserAuth}>
                    <div className="input_box">
                        <input type="text" placeholder=" 아이디" value={textId} onChange={onChange}/>
                        <input type="password" placeholder=" 비밀번호" value={textPw} onChange={onChange}></input>
                        <span className="forgetpw">비밀번호를 잃어버리셨나요?</span>
                        <input type="submit" value="로그인"/>
                    </div>           
            </form>
            
        </div>
    )
}

export default LoginForm;
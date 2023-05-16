import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import JoinForm from "./JoinForm";
import LoginForm from "./LoginForm";
import "style/joinform.css";
import "style/formbox.scss";

const Login = () => {
    
    const sub = useRef();
    const sub2 =useRef();
    const [form, setForm] = useState(false);
    const changeBtn = () => {
        if(form === false) {
            setForm(true);  
            animate(sub.current, {x: [0+"%", -100+"%"]}, {duration: 0.5})
            animate(sub2.current, {x: [0+"%", 380+"%"]}, {duration: 0.5})
            
        } 
        else {
            setForm(false);  
            animate(sub.current, {x: [-100+"%", 0+"%"]}, {duration: 0.5})
            animate(sub2.current, {x: [380+"%", 0+"%"]}, {duration: 0.5})                 
        }
    }
    return(
        
        <div className="form_wrapper">
            <div className="form_box">  
                <div className="change_form" ref={sub2} onClick={changeBtn}>
                    <span>{form ? "로그인" : "회원가입"}</span>
                </div>
                <div className="sub" ref={sub}>
                {form ? 
                    <>                    
                        <JoinForm />
                    </> :
                    <>
                        <LoginForm />
                    </>
                }
                </div>
                
            </div>
        </div>
    )
}

export default Login;
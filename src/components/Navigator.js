import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "./LoginPage/Login";
import Main from "./Main";

const Navigator = ({ component}) => {
    const location = useLocation();
    let isAuth = "";
    if(location.state) {
        isAuth = location.state.id;
    }
    
    // const navigate = useNavigate();
    // console.log(isAuth)
    return (
        isAuth ? <Main /> : <Navigate to="/" {...alert("접근할 수 없습니다.")}/>
    )
}

export default Navigator;   
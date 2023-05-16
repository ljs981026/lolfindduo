import Main from "./Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./LoginPage/Login";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Navigator from "./Navigator";


const App = () => {
        const access = sessionStorage.getItem("id");
        const [init, setInit] = useState(false);
        console.log(access)
        useEffect(() => {
            setTimeout(() => setInit(true), 2000);
        })
        return(
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Routes>
                        <Route path="/main" element={<Navigator isAuth={access} component={<Main />} />}></Route>
                        {/* <Route path="/main" element={<Main />}></Route>                                    */}
                        <Route path="/" element={init ? <Login /> : <Loading />}></Route>
                    </Routes>
            </BrowserRouter>
        )
}

export default App;
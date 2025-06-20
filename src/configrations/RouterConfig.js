import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminPanel from "../components/adminPannel/AdminPanel"

function AppRouter(){
    return(

    <BrowserRouter>

        <Routes>
            <Route path="/adminpanel" element={<AdminPanel/>} />


        </Routes>
    
    </BrowserRouter>
    )
}



export default AppRouter;


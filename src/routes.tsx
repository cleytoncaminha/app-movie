import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";

const appRoutes = ()=>{
    <BrowserRouter>
        <Routes>
            <Route path="/" element={Home} />
        </Routes>
    </BrowserRouter>
}
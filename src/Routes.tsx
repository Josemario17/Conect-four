import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Pages/Auth/SignIn'
import SignUp from './Pages/Auth/SignUp'
import HomeGame from './Pages/GamePages/Home'

export default function CostumRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />}></Route>
                <Route path='/create' element={<SignUp />}></Route>
                <Route path='/Home' element={<HomeGame />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

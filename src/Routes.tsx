import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Pages/Auth/SignIn'
import HomeGame from './Pages/GamePages/Home'
import GameRoom from './Pages/GamePages/GameRoom'

export default function CostumRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<SignIn />}></Route>
                <Route path='/Home' element={<HomeGame />}></Route>
                <Route path='*' element={<HomeGame />}></Route>
                <Route path='/game/:room' element={<GameRoom />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

import { Outlet } from "react-router-dom";

function Home() {
    return (
        <div>
            <p>Welcome home :)</p>
            <Outlet />
        </div>
    )
}

export default Home
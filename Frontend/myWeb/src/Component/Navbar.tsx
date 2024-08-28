import "./Navbar.css"

export const Navbar: React.FC = () => {
    return (
        <div className="sidebarComponent">
            <div className="logoComponent"></div>
            <nav>
                <ul>
                    <div  >
                        <li className="sizeMenuComponent">🎞️</li>
                    </div>
                    <a href='./Collection'>
                        <li className="sizeMenuComponent">❤️</li>
                    </a>
                    <a href='#' >
                        <li className="sizeMenuComponent">💁🏻‍♀️</li>
                    </a>
                    <a href="/EditInformation" >
                        <li className="sizeMenuComponent">👔</li>
                    </a>
                    <a href="/History" >
                        <li className="sizeMenuComponent">👜</li>
                    </a>
                    <a href="/Admin" >
                        <li className="sizeMenuComponent">💻</li>
                    </a>
                    <a href="/" className="signup-link">🔙</a>
                </ul>
            </nav>

        </div>
    )
}


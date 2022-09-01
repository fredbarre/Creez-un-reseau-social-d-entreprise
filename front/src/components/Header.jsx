import GroupomaniaLogo from '../assets/icon-left-font.svg';
import SignupForm from './SignupForm';

function PageInscription() {
    ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header /><SignupForm />
  </React.StrictMode>
)

}
function Header() {
    return (
    <header>
            <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="./src/assets/icon-left-fontadjusted.png" width="112" height="28"/>
            </a>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item">
                    Mon profil
                </a>
                <a class="navbar-item">
                    Tous les posts
                </a>

                <a class="navbar-item">
                    Mes posts
                </a>

                <a class="navbar-item">
                    Nouveau post
                </a>


            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary">
                            <strong>Deconnexion</strong>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </nav>

    <br />
    
    </header>
    );
}

export default Header;
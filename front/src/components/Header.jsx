import GroupomaniaLogo from '../assets/icon-left-font.svg';
import InscriptionForm from './InscriptionForm';

function PageInscription() {
    ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header /><InscriptionForm />
  </React.StrictMode>
)

}
function Header() {
    return (
    <header>
            <img src={GroupomaniaLogo} alt="logo groupomania" width="400" height="400"></img>
            <br />
        
            <button onClick={PageInscription}>
      Inscription
    </button> | 
           <button onClick={PageInscription}>
      Connexion
    </button>
        
    </header>
    );
}

export default Header;
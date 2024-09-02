
import { Gallery } from "../Component/Card/Gallery"
import { useNavigate } from 'react-router-dom';

function PreviewSubscription() {
    const navigate = useNavigate();
    const returntologin = () => {
        navigate('/login');
      };
    return (
        <>
        <div >
            <Gallery />
            <button className='buttonGrow' onClick={returntologin}> Return to Login</button>
        </div>
        </>
    )
}

export default PreviewSubscription

import { useParams } from 'react-router-dom'
import { useDispatch }from 'react-redux'
import { setLogin } from "../redux/slices/userSlice";
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function GoogleRedirect() {

    const {token, id} = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setLogin({token, id}))
        navigate('/')
    })

  return (
    <div>
      
    </div>
  )
}

export default GoogleRedirect

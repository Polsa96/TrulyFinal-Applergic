import React, { useState } from 'react'
import UserRegister from '../../components/Register/UserRegister/UserRegister'
import './RegisterPage.scss'
import EmergencyRegister from '../../components/Register/EmergencyRegister/EmergencyRegister'
import AllergenRegister from '../../components/Register/AllergenRegister/AllergenRegister'
import SubmitUserRegister from '../../components/Register/SubmitUserRegister/SubmitUserRegister'

const RegisterPage = () => {

const [finalInfo, setFinalInfo] = useState({})
const [page, setPage] = useState(1)


  return (
    <div>
   
    {page === 1 && <UserRegister props={{finalInfo, setFinalInfo}} props2={{page, setPage}} />}
    {page === 2 && <EmergencyRegister props={{finalInfo, setFinalInfo}} props2={{page, setPage}} />}
    {page === 3 && <AllergenRegister props={{finalInfo, setFinalInfo}} props2={{page, setPage}}  />}
    {page === 4 && <SubmitUserRegister props={{finalInfo, setFinalInfo}} props2={{page, setPage}}  />}
    </div>
  )
}

export default RegisterPage
import React from 'react'
import '../styles/header.css'
import { BarraMenuHeader } from  '../components/ComponentsHeader/BarraMenuHeader'

export const Header = () => {
  return (
    <div className='header'>

      <BarraMenuHeader width='58%' height='65px' value='LOGO'/>
      <BarraMenuHeader width='15%' height='65px' textAlign='center' value='Formació Acadèmica'/>
      <BarraMenuHeader width='10%' height='65px' textAlign='center' value='Experiència Laboral'/>
      <BarraMenuHeader width='10%' height='65px' textAlign='center' value='Llenguatges'/>
      <BarraMenuHeader width='7%' height='65px' textAlign='center' value='Sobre mi'/>
    </div>
  )
}

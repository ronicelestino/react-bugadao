 
import React from 'react'
import { Switch, Route } from 'react-router-dom'


import HomePage from './presentation/pages/home'
import Page404 from './presentation/pages/404'
import Noticia from './presentation/pages/noticias'



const RouterPath = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/noticia" component={Noticia} />
      <Route path="*" component={Page404} />
    </Switch>
  )
}

export default RouterPath
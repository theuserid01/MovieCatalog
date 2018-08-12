import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './style/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'toastr/build/toastr.min.css'
import './style/colors.css'
import './style/site.css'

import 'bootstrap/dist/js/bootstrap.bundle'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
    <Router>
        <App />
    </Router>
)
    , document.getElementById('root'))
registerServiceWorker()

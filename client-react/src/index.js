import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import store from './redux/store'

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
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
    , document.getElementById('root'))
registerServiceWorker()

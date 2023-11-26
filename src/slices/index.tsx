import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from '../../App'
import store from './store'

// redux 라이브러리에서 Provider 컴포넌트를 가져와 스토어를 감싸줌
// 전역적으로 상태관리를 위함
// store == 상태관리소

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

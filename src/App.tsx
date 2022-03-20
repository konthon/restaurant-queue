import { Route, Routes } from 'react-router-dom'

import Test from 'pages/test'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Test />} />
    </Routes>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes'
import { Fragment } from 'react'
function App() {
  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component
          const Layout = route.layout ? route.layout : Fragment
          return (
            <Route
              path={route.path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        })}
      </Routes>
    </>
  )
}

export default App

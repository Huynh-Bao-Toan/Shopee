import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes'
import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainLayout from './layouts/MainLayout'
import { ProductList } from './pages'
import { PrivateRoutesPath, PublicRoutesPath, privateRoutesPath, publicRoutesPath } from './constants/routes.constant'
import { useAppSelector } from './hooks/useAppSelector'
import ProductDetail from './pages/ProductDetail'

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        />
        <Route
          path=':nameId'
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />
        {!isAuthenticated
          ? publicRoutes.map((route, index) => {
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
            })
          : privateRoutes.map((route, index) => {
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
        {!isAuthenticated
          ? (Object.keys(privateRoutesPath) as (keyof typeof PrivateRoutesPath)[]).map((route, index) => {
              const path = privateRoutesPath[route]
              return <Route path={path} key={index} element={<Navigate to='/login' />} />
            })
          : (Object.keys(publicRoutesPath) as (keyof typeof PublicRoutesPath)[]).map((route, index) => {
              const path = publicRoutesPath[route]
              return <Route path={path} key={index} element={<Navigate to='/' />} />
            })}
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App

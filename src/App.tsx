import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes'
import { Fragment, useEffect, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainLayout from './layouts/MainLayout'
import { ProductList } from './pages'
import { PrivateRoutesPath, PublicRoutesPath, privateRoutesPath, publicRoutesPath } from './constants/routes.constant'
import { useAppSelector } from './hooks/useAppSelector'
import ProductDetail from './pages/ProductDetail'
import { LocalStorageEventTarget } from './utils/auth'
import { useAppDispatch } from './hooks/useAppDispatch'
import { resetAuth } from './redux/features/auth/authSlice'
import NotFound from './pages/NotFound'

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      dispatch(resetAuth())
    })
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', () => {
        dispatch(resetAuth())
      })
    }
  }, [resetAuth])
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
          path='*'
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        ></Route>
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
              const ChildrenLayout = route.childrenLayout ? route.childrenLayout : Fragment

              return (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    <Layout>
                      <ChildrenLayout>
                        <Suspense>
                          <Page />
                        </Suspense>
                      </ChildrenLayout>
                    </Layout>
                  }
                />
              )
            })
          : privateRoutes.map((route, index) => {
              const Page = route.component
              const Layout = route.layout ? route.layout : Fragment
              const ChildrenLayout = route.childrenLayout ? route.childrenLayout : Fragment

              return (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    <Layout>
                      <ChildrenLayout>
                        <Suspense>
                          <Page />
                        </Suspense>
                      </ChildrenLayout>
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

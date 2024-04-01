import { Outlet } from "react-router-dom"


function Main() {
  return (
    <main className='h-screen flex bg-blue-50 sm:px-8 px-4 py-3'>
        <Outlet/>
    </main>
  )
}

export default Main

import { Outlet } from "react-router-dom"


function Main() {
  return (
    <main className='min-h-[85vh] h-fit flex justify-center items-center bg-blue-50 sm:px-8 px-4 py-10'>
        <Outlet/>
    </main>
  )
}

export default Main

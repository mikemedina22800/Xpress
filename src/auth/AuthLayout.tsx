import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet/>
      </section>
      <img src="/assets/images/side-img.svg" alt="logo" className="hidden xl:block"/>
    </>
  )
}

export default AuthLayout

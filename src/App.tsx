import SigninForm from './_auth/forms/SigninForm'
import SignUpForm from './_auth/forms/SignUpForm'
import { Home } from './_root/Pages'
import './globals.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/toaster"
import Explore from './_root/Pages/Explore'
import Saved from './_root/Pages/Saved'
import AllUsers from './_root/Pages/AllUsers'
import CreatePost from './_root/Pages/CreatePost'
import EditPost from './_root/Pages/EditPost'
import PostDetails from './_root/Pages/PostDetails'
import Profile from './_root/Pages/Profile'
import UpdateProfile from './_root/Pages/UpdateProfile'


const App = () => {
  return (
   <main className='flex h-screen'>
    <Routes>
      {/*public routes*/}
    <Route element={<AuthLayout />}>
      <Route path='/sign-in' element={<SigninForm />}/>
      <Route path='/sign-up' element={<SignUpForm />}/>
    </Route>
      {/*private routes*/}
      <Route element={<RootLayout  />}>
        <Route index element={<Home/>}/>
        <Route path='/explore' element={<Explore />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/all-users' element={<AllUsers />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:id' element={<EditPost />} />
        <Route path='/posts/:id' element={<PostDetails />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/update-profile/:id' element={<UpdateProfile />} />
      </Route>
    </Routes>

    <Toaster />
   </main>
  )
}

export default App

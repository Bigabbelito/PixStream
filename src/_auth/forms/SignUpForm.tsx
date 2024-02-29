import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { userCreateUserAccount, usesignInAccount } from "@/lib/react-query/QueryAndMutations"
import { useUserContext } from "@/context/AuthContext"


const SignUpForm = () => {

  const { toast } = useToast()
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate(); 

  const { mutateAsync: creatUserAccount, isPending: isCreatingAccount } = userCreateUserAccount();
  
  const { mutateAsync: signInAccount, isPending: isSigningIn} = usesignInAccount();

  // 1.Define your form 
const form = useForm<z.infer<typeof SignupValidation>>({
  resolver: zodResolver(SignupValidation),
  defaultValues: {
    name:"",
    username: "",
    email:"",
    password:"",
  },
})

// 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
 const  newUser = await creatUserAccount (values);

if(!newUser){
  return  toast({
    title: "Sign up failed. Please try again."})
}

const session = await signInAccount({
  email: values.email, 
  password: values.password,

})

if(!session){
  return toast({title: 'Sign in faild. Please try again. '})
}

const isLoggedIn = await checkAuthUser(); 

if(isLoggedIn) {
  form.reset();
navigate('/');
} else {
  return toast({
    title: "Sign up failed. Please try again."})
}
}

  return (
       <Form {...form}>
        <div className="sm:w-420 flex flex-center flex-col">
          <img src="/assets/images/logo.svg" width={150} height={200}  />

          <h2 className="h3 bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
          <p className="text-light-3 small-medium md:base-regular">To use PixStream, please enter your account details</p>
        



      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input"{...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input"{...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" className="shad-input"{...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" className="shad-input"{...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <Button type="submit" className="shad-button_primary">
          { isCreatingAccount  ? (
            <div className="flex-center gap-1">
             <Loader /> Loading...

            </div>
          ): "Sign up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center">
            Already have account?
            <Link to={"/sign-in"} className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
      </form>
      </div>
    </Form>
   
  )
}

export default SignUpForm
2
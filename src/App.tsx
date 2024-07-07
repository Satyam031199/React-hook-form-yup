import './App.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from "../src/components/ui/button";
import { Input } from "../src/components/ui/input";


function App() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email().required("It must be a valid email"),
    password: yup.string().required("Password is required").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], "Passwords do not match").required("Confirm Password is required"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: any) => {
    console.log(data);
  }
  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder='Full name' {...register("fullName")} />
        {errors.fullName && <p>{errors.fullName.message}</p>}
        <Input type="text" placeholder='Email' {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <Input type="text" placeholder='Password' {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <Input type="text" placeholder='Confirm Password' {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <Button>Submit</Button>
      </form>
    </div>
  )
}

export default App

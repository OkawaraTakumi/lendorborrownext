import { FormBuilder } from '../../components/molecules';
import { 
  useState,
  useEffect
} from 'react';
import { useForm, FieldValues } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '../../redux-app/hooks';
import { 
  loginAndFetchUser, 
  SelectUser,
  fetchUser,
  SelectSuccess
} from '../../slices/loginSlice/loginSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  label:string,
  name:string,
  errorText?:string,
  pattern?:RegExp
}
const propsArray:Props[] = [
      {
          label:'メールアドレス',
          name:'email',
          errorText:'メールアドレスの形式が不正です',
          pattern:/.+@.+/
      },
      {
          label:'パスワード',
          name:'password',
          errorText:'パスワードの形式が不正です',
          pattern:/^[a-zA-Z0-9!#$%&()*+,.:;=?@[\]^_{}-]+$/
      }
  ]
const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errorState, setErrorState] = useState<string>('')
  const user = useAppSelector(SelectUser)
  const success = useAppSelector(SelectSuccess)
  useEffect(() => {
      dispatch(fetchUser())
  },[dispatch])
  useEffect(() => {
      if(user._id){
          router.push('/')
      }
  },[user, router])
  const { formState:{errors} , control, getValues} = useForm<FieldValues>({
      mode:"all"
  })

  const handleFunc = async () => {
      const { email, password} = getValues() 
      console.log(email)
      console.log(password)
      await dispatch(loginAndFetchUser({email, password}))
      .then(() => {
          user._id && router.push('/')
        })
    //   .catch(() => setErrorState('ログインに失敗しました'))
  }


  return (
      <>
          {!success && <p>ログインに失敗しました</p>}
          <FormBuilder propsArray={propsArray} 
                       control={control} 
                       errors={errors} 
                       handleFunc={handleFunc} 
                       textWillShow="ログイン"
          />
          <Link 
              href='/register' 
          >
              新規登録はこちら
          </Link>
      </>
  );
};

export default Login;
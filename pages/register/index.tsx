import { useState } from 'react';
import { FormBuilder } from '../../components/molecules';
import { useForm, FieldValues } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {

    interface PropsforChild {
        label:string,
        name:string,
        errorText?:string,
        pattern?:RegExp,
    }

    const propsArray:PropsforChild[] = [
        {
            label:'名前',
            name:'name',
            errorText:'名前の入力が不正です'
        },
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

    const [errorState, setErrorState] = useState<string>('')
    const history = useRouter();
    

    const { formState:{errors} , control, getValues} = useForm<FieldValues>({
        mode:"all"
    })

    const handleFunc = async () => {
        const {name, email, password} = getValues() 
        axios.defaults.withCredentials = true;
        await axios.post((`${process.env.NEXT_PUBLIC_POST_REGIST_URL}`), {
            name,
            email,
            password
        }).then(() => history.push('/login'))
          .catch(() => setErrorState('登録に失敗しました'))
    }
    

    return (
        <>
            <p>{errorState}</p>
            <FormBuilder propsArray={propsArray} 
                         control={control} 
                         errors={errors} 
                         handleFunc={handleFunc}
                         textWillShow="登録"
            />
        </>
    );
};

export default Register;
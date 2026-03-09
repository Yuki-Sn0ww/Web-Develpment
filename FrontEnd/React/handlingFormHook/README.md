handling forms in react

1.it is a liberary handle form state, validation, and submissin.
2. almost zero biolerpalte
3.how to install
npm install react-hook-form
4. import { useForm } from "react-hook-form"
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()
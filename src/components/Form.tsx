
import Question from './Question'
import { FieldValues, useForm } from "react-hook-form";
import { IQuestion } from '../models';


interface FormProps {
  questions: IQuestion[];
}

export default function Form({ questions }: FormProps){


  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
  const onSubmit = handleSubmit(data => console.log(data));

  return(
    <form onSubmit={onSubmit} className="form">
       { questions?.map(question => <Question question={question} key={question.id} register={register} errors={errors}/>) }
      <button type="submit" className="btn">Submit</button>
    </form>
  )
}
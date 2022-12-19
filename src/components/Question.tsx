import { useState } from "react";
import { UseFormRegister, FieldValues, FieldErrorsImpl } from "react-hook-form";
import { IQuestion } from "../models";

interface QuestionProps {
  question: IQuestion;
  register: UseFormRegister<FieldValues>;
  errors?: Partial<FieldErrorsImpl<{ [x: string]: any; }>> | undefined;

}

interface BasisElementProps {
  question: IQuestion;
  register: UseFormRegister<FieldValues>;
  errors?: Partial<FieldErrorsImpl<{ [x: string]: any; }>> | undefined;
  changeSubQuestionIndex: (value: string) => void;
}


const BasisElement = ({ question, register, changeSubQuestionIndex }: BasisElementProps): JSX.Element => {


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSubQuestionIndex(e.target.value)
  }


  if (question?.type === 'radio') {
    return (
      <div >
        {question.options.map(option => {
          return (
            <div key={option.id} className="option">
              <input
                type="radio"
                value={option.id}
                {...register(`${question.id}`, { required: question.required.toString() })}
                onChange={changeHandler}
              />
              <span className="option-label">{option.label}</span>
              {option.input && <input style={{ width: "85%" }} type="text" id={option.id} name={option.label} />}
            </div>


          )
        })}
      </div>

    )
  } else {
    return (
      <input type="text" style={{ width: '50%' }} placeholder='Your answer'  {...register(`${question?.id}`)} />
    )
  }

}

export default function Question({ question, register, errors }: QuestionProps) {

  const [subQuestionIndex, setSubQuestionIndex] = useState("")

  const changeSubQuestionIndex = (value: string) => {
    setSubQuestionIndex(value)
  }

  return (
    <>
      <div className="question-section question question-section-content">
        <span className="question__title option">{question?.label}
          {question?.required &&
            <span className="error star">  *</span>
          }
          {errors && errors[question.id.toString()] && <p className="error">This is required.</p>}
        </span>
        <BasisElement question={question} register={register} errors={errors} changeSubQuestionIndex={changeSubQuestionIndex} />
      </div>
      {question.subQuestions && question.subQuestions?.filter(f => f.id === subQuestionIndex).map(item => {
        return (
          <Question question={item} key={item.id} register={register} errors={errors} />
        )
      })}
    </>
  )
}
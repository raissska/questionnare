
import './App.css';
import { useQuestions } from './hooks/questions'
import { QuestionnaireInfo } from './components/QuestionnaireInfo'
import Form from './components/Form';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';

function App() {

  const { loading, error, questions } = useQuestions()


  return (
    <div className="container">
      { loading && <Loader />}
      { error && <ErrorMessage error={error} />}
      {!loading && !error &&
        <>
          <QuestionnaireInfo />
          <Form questions={questions} />
        </>
      }
    </div>
  )

}

export default App;

import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null); // Sets states for blank and edited form
  const [error, setError] = useState("");

  const blankStudent = false
  const blankInterviewer = false

  const reset = function() { //Resets props
    setStudent("");
    setInterviewer(null);
  }

  const cancel = function() { //Calls reset function and calls onCancel prop
    reset();
    props.onCancel();
  }

  function validate() { //Validates on save
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
  
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student} 
            onChange={(event) => setStudent(event.target.value)} //Changes value on input
          />
        </form>
        <section className="appointment__validation">{error}</section>

        <InterviewerList 
        interviewers={props.interviewers}
        value={interviewer}
        onChange={setInterviewer} //Changes value on input
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  )
}
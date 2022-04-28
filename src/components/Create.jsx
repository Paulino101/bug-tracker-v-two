import React, {useRef} from "react";

import Sidebar from "./Sidebar";

function Create() {
  const titleRef = useRef('')
  const dateRef = useRef('')
  const descRef = useRef('')
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log('create')
    console.log(titleRef, dateRef, descRef)

  }
  return (
    <>
      <Sidebar />
      <h1>Create New Issue</h1>
      <form className="m-2">
      <div className="mb-3">
        <label className="form-label">Title</label>
      <input ref={titleRef} type="text" className="form-control"/>
      </div>
      <div className="mb-3">
      <label className="form-label">Date</label>
      <input ref={dateRef} type="text" className="form-control" placeholder="XX/XX/XXXX"/>
      </div>
      <div className="mb-3"> 
      <label className="form-label">Description</label>
      <input ref={descRef} type="text" className="form-control" />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>submit</button>
     
      {/* eventually add pill type status on each issue depending on wether they have been solved or not */}
      </form>
      
    </>
  );
}

export default Create;

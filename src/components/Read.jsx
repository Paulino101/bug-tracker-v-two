import React from "react";

function Read({ data }) {
  return <div>
      {data.map(d => (
          <div key={d.id} className='ms-3 mt-2 border rounded p-3'>
          
            <h5 className="text-capitalize fs-6">{d.bugName}{d.fixed ? <span class="badge bg-success ms-2">Solved</span> : <span class="badge bg-danger ms-2">Issue</span>}</h5>
            
            <aside>{d.date}</aside>
            <p>{d.description}</p>
            
          </div>
      ))}
  </div>;
}

export default Read;

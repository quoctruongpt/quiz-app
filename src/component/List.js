import React from "react";
import {Link} from 'react-router-dom'
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "popper.js/dist/umd/popper";
import "jquery";

export default function List() {
  const levels = (localStorage.getItem('levels') ? JSON.parse(localStorage.getItem("levels")) : []);
  const questions = localStorage.getItem('questions') ? JSON.parse(localStorage.getItem("questions")) : [];
  return (
    <div className="List" >  
      <div className="container p-3 ">
        <div className="float-end" >
          <Link to="/add-level/200000">
          <button type="button" className="btn btn-primary btn-block">
            <i className="fas fa-plus"></i> Tạo
          </button>
          </Link>
        </div>
        <div className="fs-5" style={{ marginTop: "60px" }}>
          {!levels ? "" : levels.map((level) => (
            <Link
              to={`/detail/${level.id}`}
              className="text-decoration-none"
              key={level.id}
            >
              <div
                className="item-level row bg-light mb-3 d-flex align-content-center"
                style={{ height: "50px"}}
              >
                <div className="col">{level.type}</div>

                <div className="col">
                  {questions.filter((question) => question.idLevel === level.id).length} câu hỏi
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

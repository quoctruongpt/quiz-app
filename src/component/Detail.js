import React, {useState} from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

export default function Detail() {
  const [levels] = useState(localStorage.getItem('levels') ? JSON.parse(localStorage.getItem("levels")) : []);
  const questions = localStorage.getItem('questions') ? JSON.parse(localStorage.getItem("questions")) : [];
  const idSelectLevel = parseInt(useParams().idLevel);
  const questionsType = questions.filter(
    (question) => question.idLevel === idSelectLevel
  );
  return (
    <div className="container bg-light p-3">
      <div className="row">
        <div className="col-md-8 row abc">
          <div className="list-question">
            {!questionsType ? "" : questionsType.map((question, index) => {
              return (
                <div className="" key={index}>
                  <div className="row" style={{ paddingLeft: "0" }}>
                    <div className="col-1 number" style={{ marginRight: 0 }}>
                      <div className="bg-primary text-center text-white rounded-pill">
                        {index + 1}
                      </div>
                    </div>
                    <div className="col-11">
                      <div className="detail-question">
                        <p className="fw-bold">{question.questionContent}</p>
                        <div className="list-answer">
                          {question.answers.map((answer) => (
                            <div className="col-md-3" key={answer.id}>
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-lg disabled"
                              >
                                {answer.value}
                              </button>
                            </div>
                          ))}
                        </div>
                        <p className="text-primary fw-bold pt-5">
                          Câu trả lời đúng là:
                        </p>
                        <div className="list-answer">
                          {question.answers.map((answer, index) => (
                            <div className="col-md-3" key={index}>
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-lg disabled overflow-auto"
                                style={
                                  question.correctAnswer === answer.id
                                    ? {
                                        border: "2px solid blue",
                                        backgroundColor: "#89CFEC",
                                      }
                                    : {}
                                }
                              >
                                {answer.value}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-4">
          <div className="detail-title p-2">
            <Link to={`/add-level/${idSelectLevel}`}>
            <div className="border border-primary p-5 text-center text-primary fw-bold fs-3 overflow-hidden">
              {levels[levels.map((e) => e.id).indexOf(idSelectLevel)].type}
              <span>
                <i className="fas fa-edit ms-2 "></i>
              </span>
            </div>
            </Link>
            <div className="detail-option mt-3">
              <ul className="row" style={{ listStyle: "none" }}>
                <li className="col-6">
                  <i className="fas fa-list me-2"></i>
                  {questionsType.length} câu hỏi
                </li>
                <li className="col-6"></li>
                <li className="col-6"></li>
                <li className="col-6"></li>
              </ul>
            </div>
            <div className="detail-action row">
              <div className="col-6 ">
                <Link
                  to={`/add-edit/${idSelectLevel}`}
                  className="text-decoration-none text-light"
                >
                  <button type="button" className="btn btn-warning">
                  <i className="fas fa-edit ms-2"></i> 
                   Chỉnh sửa
                  </button>
                </Link>
              </div>
              <div className="col-6">
                <Link to="/list">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    <i className="fas fa-angle-left"></i>
                    Quay lại
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function AddEdit() {
  const levels = localStorage.getItem("levels")
    ? JSON.parse(localStorage.getItem("levels"))
    : [];
  const idSelectLevel = parseInt(useParams().idLevel);

  const schema = yup.object().shape({
    questionContent: yup.string().max(50, "Vui lòng nhập nội dung câu hỏi ít hơn 50 ký tự"),
    answerB: yup.string().max(30),
    answerA: yup.string().max(30),
    answerC: yup.string().max(30),
    answerD: yup.string().max(30),
  });

  const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(
    localStorage.getItem("questions")
      ? JSON.parse(localStorage.getItem("questions"))
      : []
  );

  // lấy tên của bộ câu hỏi
  const levelType =
    levels[levels.map((level) => level.id).indexOf(idSelectLevel)].type;

  // lọc ra những câu hỏi có idLevel bằng với idSelectLevel được truyền vào
  const questionOfType = data.filter(
    (question) => question.idLevel === idSelectLevel
  );

  const [indexSelectQuestion, setIndexSelectQuestion] = useState(
    data.map((question) => question).indexOf(questionOfType[0])
  );
  const currentQuestion = questionOfType[0]
    ? data[indexSelectQuestion]
    : {
        idLevel: idSelectLevel,
        questionContent: "",
        correctAnswer: "",
        answers: [
          {
            id: "A",
            value: "",
          },
          {
            id: "B",
            value: "",
          },
          {
            id: "C",
            value: "",
          },
          {
            id: "D",
            value: "",
          },
        ],
      };

  // khi click nút add
  const handleClickAdd = () => {
    setIsEdit(false);
    toast.info("Thêm mới câu hỏi");
    reset();
  };

  // hàm khi click nút lưu
  const onHandleSubmit = (formValues) => {
    if (
      formValues.questionContent &&
      formValues.answerA &&
      formValues.answerB &&
      formValues.answerC &&
      formValues.answerD &&
      formValues.correctAnswer
    ) {
      toast.success("Thành công!");
      if (isEdit) {
        setData((prev) => {
          const newData = prev.map((item, index) => {
            return index !== indexSelectQuestion
              ? item
              : {
                  ...item,
                  questionContent: formValues.questionContent,
                  correctAnswer: formValues.correctAnswer,
                  answers: [
                    {
                      id: "A",
                      value: formValues.answerA,
                    },
                    {
                      id: "B",
                      value: formValues.answerB,
                    },
                    {
                      id: "C",
                      value: formValues.answerC,
                    },
                    {
                      id: "D",
                      value: formValues.answerD,
                    },
                  ],
                };
          });
          localStorage.setItem("questions", JSON.stringify(newData));
          return JSON.parse(localStorage.getItem("questions"));
        });
      } else {
        setData((prev) => {
          const newData = [
            ...prev,
            {
              idLevel: idSelectLevel,
              questionContent: formValues.questionContent,
              correctAnswer: formValues.correctAnswer,
              answers: [
                {
                  id: "A",
                  value: formValues.answerA,
                },
                {
                  id: "B",
                  value: formValues.answerB,
                },
                {
                  id: "C",
                  value: formValues.answerC,
                },
                {
                  id: "D",
                  value: formValues.answerD,
                },
              ],
            },
          ];
          localStorage.setItem("questions", JSON.stringify(newData));
          return JSON.parse(localStorage.getItem("questions"));
        });
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    }
  };
  // hàm khi click nút xóa
  const deleteQuestion = (indexQuestion) => {
    if (indexQuestion !== null && indexQuestion !== undefined) {
      if (window.confirm("Bạn có thực sự muốn xóa?")) {
        setData((prev) => {
          const newData = prev.filter((item, index) => index !== indexQuestion);
          localStorage.setItem("questions", JSON.stringify(newData));
          return JSON.parse(localStorage.getItem("questions"));
        });
        toast.success("Xóa thành công !");
        reset()
      } else {
        toast.error("Xóa câu hỏi thất bại");
      }
    } else {
      toast.error("Không thể xóa câu hỏi");
    }
  };

  // khi mà indexSelectQuestion thay đổi thì question cũng thay đổi theo, gọi sau tất cả
  useEffect(() => {
    setValue("answerA", currentQuestion?.answers[0].value);
    setValue("answerB", currentQuestion?.answers[1].value);
    setValue("answerC", currentQuestion?.answers[2].value);
    setValue("answerD", currentQuestion?.answers[3].value);
    setValue("correctAnswer", currentQuestion?.correctAnswer);
    setValue("questionContent", currentQuestion?.questionContent);
  }, [indexSelectQuestion]);

  return (
    <div className="edit-create">
      {/* Phần Header */}
      <div
        className="header-edit border border-warning p-3 bg-white "
        id="header"
      >
        <div className="row">
          <div className="col-5">
            <Link
              to={`/detail/${idSelectLevel}`}
              className="text-decoration-none"
            >
              <button className="btn btn-primary rounded-pill me-2">
                <i className="fas fa-angle-left"></i> Quay lại
              </button>
            </Link>
          </div>
          <div className="col-7">
            <p className="fw-bold fs-4">{levelType}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        className="container-edit "
        style={{ paddingRight: 20, backgroundColor: "#d4bebc" }}
      >
        <div className="row">
          {/* Phần load danh sách câu hỏi */}
          <div className="col-2" style={{ marginTop: "95px" }} id="leftCol">
            {/* Load danh sách câu hỏi */}
            {questionOfType.map((question, index) => (
              <div className="item border border-1" key={index}>
                <div
                  className="d-flex bd-highlight mb-2"
                  style={{ height: "120px" }}
                >
                  <div
                    className="p-2 flex-shrink-1 bd-highlightn position-relative"
                    style={{ width: "30%" }}
                  >
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <p>{index + 1}</p>

                      {/* Nút xóa */}
                      <span
                        style={{ width: "50px" }}
                        onClick={() => {
                          deleteQuestion(
                            data
                              .map((question) => question)
                              .indexOf(questionOfType[index])
                          );
                        }}
                      >
                        <i className="far fa-trash-alt"></i>
                      </span>
                    </div>
                  </div>

                  <div
                    className="p-2 bd-highlight bg-white"
                    style={{ width: "70%" }}
                    onClick={() => {
                      setIsEdit(true);
                      toast.info("Chỉnh sửa câu hỏi số " + (index + 1));
                      setIndexSelectQuestion(
                        data
                          .map((question) => question)
                          .indexOf(questionOfType[index])
                      );
                    }}
                  ></div>
                </div>
              </div>
            ))}

            {/* Nút tạo câu hỏi mới */}
            <div className="item border border-1" onClick={handleClickAdd}>
              <div
                className="d-flex bd-highlight mb-2"
                style={{ height: "120px" }}
              >
                <div
                  className="p-2 flex-shrink-1 bd-highlight"
                  style={{ width: "30%" }}
                ></div>
                <div
                  className="p-2 bd-highlight bg-white d-flex align-items-center text-center position-relative"
                  style={{
                    width: "70%",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form chỉnh sửa câu hỏi */}
          <div className="col-10 bg-light p-3 " id="a">
            <form onSubmit={handleSubmit(onHandleSubmit)}>
              <label className="fw-bold">Câu hỏi: </label>
              {errors.questionContent && (<p className="error">{errors.questionContent?.message}</p>)}
              <div className="form-floating p-3 bg-white border border-primary">
                <textarea
                  className="form-control"
                  name="questionContent"
                  style={{
                    height: "150px",
                    backgroundColor: "#F4F6F6",
                    resize: "none",
                  }}
                  {...register("questionContent")}
                ></textarea>
              </div>
              <label className="fw-bold mt-4">Các lựa chọn:</label>
              {(errors.answerA ||
                errors.answerB ||
                errors.answerC ||
                errors.answerD) && (
                <p className="error">Vui lòng nhập đáp án ít hơn 30 ký tự</p>
              )}

              <div className="row">
                {currentQuestion?.answers.map((answer) => (
                  <div
                    className="form-answer form-floating col-6 mb-3"
                    key={answer.id}
                  >
                    <input
                      className="form-check-input radio-answer"
                      type="radio"
                      name="correctAnswer"
                      {...register("correctAnswer")}
                      value={answer.id}
                    />
                    <textarea
                      className="form-control border border-info"
                      style={{ height: "90px", resize: "none" }}
                      {...register(`answer${answer.id}`)}
                    ></textarea>
                  </div>
                ))}
              </div>
              <button
                onSubmit={onHandleSubmit}
                type="submit"
                className="btn btn-success rounded-pill"
                style={{ width: "100%" }}
              >
                <i className="far fa-save"></i> Lưu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

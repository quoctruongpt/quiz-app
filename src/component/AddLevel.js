import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

export default function AddLevel() {
  const [levels, setLevels] = useState(
    localStorage.getItem("levels")
      ? JSON.parse(localStorage.getItem("levels"))
      : []
  );
  const idSelectLevel = parseInt(useParams().idLevel);
  const indexLevel = levels.map((e) => e.id).indexOf(idSelectLevel);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { error },
  } = useForm({ defaultValues: {} });

  if (idSelectLevel !== 200000) {
    setValue("type", levels[indexLevel].type);
  }
  const onHandleSubmit = (formValues) => {
    if (formValues.type) {
      if (formValues.type.length <= 50) {
        if (idSelectLevel === 200000) {
          setLevels((prev) => {
            const newLevels = [
              ...prev,
              { id: Math.floor(Math.random() * 100000), type: formValues.type },
            ];
            localStorage.setItem("levels", JSON.stringify(newLevels));
            return JSON.parse(localStorage.getItem("levels"));
          });
          reset();
          toast.success("Thêm thành công!");
        } else {
          setLevels((prev) => {
            const newLevels = prev.map((level, index) => {
              return index !== indexLevel
                ? level
                : {
                    ...level,
                    type: formValues.type,
                  };
            });
            localStorage.setItem("levels", JSON.stringify(newLevels));
            return JSON.parse(localStorage.getItem("levels"));
          });
          toast.success("Sửa thành công!");
        }
      } else {
        toast.error("Vui lòng nhập ít hơn 50 ký tự");
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return (
    <div className="container p-3 bg-light">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="form-group">
          <label>Tên bộ câu hỏi</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên bộ câu hỏi"
            {...register("type")}
          />
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/list">
            <button
              type="button"
              className="btn btn-warning"
              style={{ float: "right" }}
            >
              <i className="fas fa-angle-left"></i>
              Quay lại
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

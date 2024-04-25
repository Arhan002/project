import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import back from "../../assets/back.png";
import "../Register/Register.css";

type formObj = {
  Username: string;
  password: string;
  confirmPass: string;
};

const url = "http://127.0.0.1:5000/user/add";

const Register = () => {
  const navigate = useNavigate();
  const toast = useRef<any>(null);

  const { control, handleSubmit } = useForm<formObj>({
    defaultValues: {
      Username: "",
      password: "",
      confirmPass: "",
    },
  });

  const onSubmit: SubmitHandler<formObj> = async (data) => {
    console.log(data);
    if (data.password == data.confirmPass) {
      console.log("OK");
      try {
        const response = await axios.post(url, {
          username: data.Username,
          password: data.password,
        });
      } catch (error) {
        toast.current.show({
          severity: "warning",
          summary: "Same User Might Exist",
          detail: "Use new credentials",
        });
      }
      navigate("/");
    } else {
      console.log("Not same password");
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} id="form">
          <Link to={"/"}>
            <img
              src={back}
              style={{ width: "50px", height: "50px" }}
              className="back-button"
            />
          </Link>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Register
          </h1>
          <Controller
            name="Username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputText
                onChange={onChange}
                value={value}
                placeholder="Username"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Password
                onChange={onChange}
                value={value}
                toggleMask={true}
                inputStyle={{ width: "100%" }}
                placeholder="Password"
              />
            )}
          />
          <Controller
            name="confirmPass"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Password
                onChange={onChange}
                value={value}
                toggleMask={true}
                inputStyle={{ width: "100%" }}
                placeholder="Confirm Password"
              />
            )}
          />

          <Button
            type="submit"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Register
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;

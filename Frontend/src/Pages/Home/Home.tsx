import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../../Context/User Details/User_details";
import "../Home/Home.css";

type formObj = {
  Username: string;
  password: string;
};

type userObj = {
  user_name: string;
  user_id: number;
  password: string;
};

const url = "http://127.0.0.1:5000/user/get";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(usercontext);
  const [login, setLogin] = useState<userObj>({
    user_id: 0,
    user_name: "",
    password: "",
  });

  const { control, handleSubmit } = useForm<formObj>({
    defaultValues: {
      Username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<formObj> = async (data) => {
    try {
      const resp = await axios.post(url, {
        username: data.Username,
        password: data.password,
      });
      const data1 = resp.data;
      setLogin(data1[0]);
      setUser({ ...user, user: login.user_id });
      console.log(user);
      console.log(data);
      {
        if (user.user != undefined && user.user != 0) {
          navigate("/store");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} id="form">
          <Controller
            name="Username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputText onChange={onChange} value={value} />
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
              />
            )}
          />
          <div className="btn-container">
            <Button type="submit">Submit</Button>
            <a className="reg" href="/register">
              <u>Register Now</u>
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;

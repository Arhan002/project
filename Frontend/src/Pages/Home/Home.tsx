import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Home/Home.css";

type formObj = {
  Username: string;
  password: string;
};

const Home = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<formObj>({
    defaultValues: {
      Username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<formObj> = (data) => {
    console.log(data);
    navigate("/store");
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
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default Home;

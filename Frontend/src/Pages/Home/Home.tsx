import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "../Home/Home.css";

type formObj = {
  Username: string;
  password: string;
};

const Home = () => {
  const { control, handleSubmit } = useForm<formObj>({
    defaultValues: {
      Username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<formObj> = (data) => {
    console.log(data);
  };

  return (
    <>
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
            <Password onChange={onChange} value={value} toggleMask={true} />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default Home;

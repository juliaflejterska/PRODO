import { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Form from "react-bootstrap/Form";

type FormData = {
  email: string;
  password: string;
};

type AuthFormProps = {
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string) => void;
};

export const AuthForm = ({ onLogin, onRegister }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isRegistering, setIsRegistering] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;
    if (isRegistering) {
      onRegister(email, password);
    } else {
      onLogin(email, password);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column align-items-center text-center gap-4"
      style={{ backgroundColor: "white", padding: "30px", borderRadius: "6px" }}
    >
      <div className="d-flex flex-column align-items-center gap-2">
        <Form.Label htmlFor="email" style={{ fontSize: "1.25rem" }}>
          E-mail
        </Form.Label>
        <Form.Control
          id="email"
          type="text"
          style={{ width: "250px" }}
          {...register("email", {
            required: true,
            pattern: /\S+@\S+\.\S+/,
          })}
        />

        {errors.email?.type === "required" && (
          <Form.Text style={{ color: "#a81d1d", width: "250px" }}>
            E-mail field is required.
          </Form.Text>
        )}

        {errors.email?.type === "pattern" && (
          <Form.Text style={{ color: "#a81d1d", width: "250px" }}>
            Entered value does not match e-mail format.
          </Form.Text>
        )}
      </div>

      <div className="d-flex flex-column align-items-center gap-2">
        <Form.Label htmlFor="password" style={{ fontSize: "1.25rem" }}>
          Password
        </Form.Label>
        <Form.Control
          id="password"
          type="password"
          style={{ width: "250px" }}
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password?.type === "required" && (
          <Form.Text style={{ color: "#a81d1d", width: "250px" }}>
            Password field is required.
          </Form.Text>
        )}
        {errors.password?.type === "minLength" && (
          <Form.Text style={{ color: "#a81d1d", width: "250px" }}>
            Password must be at least 8 characters long.
          </Form.Text>
        )}
      </div>

      <div className="d-flex flex-column align-items-center gap-2">
        <Button
          variant="dark"
          type="submit"
          style={{ fontSize: "1.25rem", width: "250px" }}
        >
          {isRegistering ? "REGISTER NOW" : "LOG IN"}
        </Button>
        <Button
          variant="secondary"
          type="button"
          style={{ fontSize: "1.25rem", width: "250px" }}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Already have an account?" : "Need to register?"}
        </Button>
      </div>
    </Form>
  );
};

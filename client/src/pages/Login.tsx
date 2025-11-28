import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import useUser from "@/store/user";
import { useState } from "react";
import { Alert, AlertTitle } from "../components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Api from "@/lib/axios";
import { Spinner } from "../components/ui/spinner";

interface LoginDetailsType {
  identifier: string;
  password: string;
}

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["Login User"],
    mutationFn: async (loginDetails: LoginDetailsType) => {
      const response = await Api.post("/auth/login", loginDetails);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setLoginError(
          error.response?.data.message || "An unexpected error occured",
        );
      } else {
        setLoginError("An unexpected error occured");
      }
    },
    onSuccess: (data) => {
      setUser(data);
      navigate("/dashboard");
    },
  });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const loginDetails = { identifier, password };
    mutate(loginDetails);
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg border rounded-lg p-6 shadow-sm bg-card">
        <h1 className="text-3xl font-bold text-center mb-6">
          LOGIN TO YOUR ACCOUNT
        </h1>
        <form
          className="space-y-4 mx-auto flex flex-col gap-3"
          onSubmit={handleLogin}
        >
          {loginError && (
            <Alert variant="destructive">
              <AlertTitle>{loginError}</AlertTitle>
            </Alert>
          )}

          <div className="flex flex-col space-y-1">
            <Label htmlFor="ident">Username or Email address</Label>
            <Input
              type="ident"
              id="email"
              placeholder="johndoe@gmail.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Choose a strong password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner />}
            Login
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-2">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-primary font-medium hover:underline"
                      >
                        Register
                      </Link>
                      </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

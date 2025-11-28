import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Alert, AlertTitle } from "../components/ui/alert";
import { toast } from "sonner";
import Api from "@/lib/axios";
import { Spinner } from "../components/ui/spinner";

interface UserInfoType {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
}

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["Register User"],
    mutationFn: async function (userInformation: UserInfoType) {
      const response = await Api.post("auth/register", userInformation);
      return response.data;
    },
    onError: function (error) {
      toast.error("There was an error", {
        position: "top-center",
      });
      if (axios.isAxiosError(error)) {
        setRegistrationError(error.response?.data.message);
      } else {
        setRegistrationError("An unexpected error occured");
      }
    },
    onSuccess: function () {
      navigate("/login");
    },
  });

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegistrationError("");

    if (password != cPassword) {
      toast.error("There was an error", {
        position: "top-center",
      });
      setRegistrationError("Password and confirm password must match");
      return;
    }
    const userInfo = {
      firstName,
      lastName,
      userName,
      emailAddress,
      password,
    };
    mutate(userInfo);
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg border rounded-lg p-6 shadow-sm bg-card">
        <h1 className="text-3xl font-bold text-center mb-6">
          CREATE AN ACCOUNT
        </h1>
        {registrationError && (
          <Alert variant="destructive">
            <AlertTitle>{registrationError}</AlertTitle>
          </Alert>
        )}

        <form
          className="space-y-4 mx-auto flex flex-col gap-3"
          onSubmit={handleRegister}
        >
          <div className="flex flex-col space-y-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              placeholder="John"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              placeholder="Doe"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="userName">User Name</Label>
            <Input
              type="text"
              placeholder="userName"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="email">Your email address</Label>
            <Input
              type="email"
              placeholder="johndoe@gmail.com"
              id="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
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
          <div className="flex flex-col space-y-1">
            <Label htmlFor="cPassword">Confirm Password</Label>
            <Input
              type="password"
              placeholder="Repeat Password"
              id="cPassword"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-4"
            size="lg"
            disabled={isPending}
          >
            {isPending && <Spinner />}Register
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

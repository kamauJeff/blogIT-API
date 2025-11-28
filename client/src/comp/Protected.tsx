import { useEffect } from "react";
import { useUser } from "@store/user";
import { useNavigate } from "react-router-dom";

function Protected({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return <div>{children}</div>;
}
export default Protected;

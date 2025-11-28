import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "@/lib/axios";
import { Button } from "../components/ui/button";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

interface Profile {
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  dateJoined: string;
}

function ProfilePage() {
  const queryClient = useQueryClient();

  // Fetch profile
  const { data, isLoading, isError } = useQuery<Profile>({
    queryKey: ["GetProfile"],
    queryFn: async () => {
      const response = await Api.get("/users"); // ✅ backend getUserProfile
      return response.data;
    },
  });

  // Local state for editing profile
  const [form, setForm] = useState<Partial<Profile>>({});

  // Local state for password change
  const [passwords, setPasswords] = useState({
    previousPassword: "",
    password: "",
  });

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: async (updated: Partial<Profile>) =>
      Api.patch("/users", updated), // ✅ backend updateProfile
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetProfile"] });
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  // Delete profile mutation
  const deleteMutation = useMutation({
    mutationFn: async () => Api.delete("/users"), // ✅ backend deleteProfile
    onSuccess: () => {
      toast.success("Account deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  // Change password mutation
  const passwordMutation = useMutation({
    mutationFn: async (payload: typeof passwords) =>
      Api.patch("/auth/password", payload), // ✅ backend changePassword
    onSuccess: () => {
      toast.success("Password changed successfully");
      setPasswords({ previousPassword: "", password: "" });
    },
    onError: () => {
      toast.error("Failed to change password");
    },
  });

  if (isLoading) return <Loading message="Loading profile..." />;
  if (isError) return <Error message="Could not load profile" />;

  return (
    <div className="p-6 max-w-lg mx-auto space-y-8">
      <h1 className="text-2xl font-bold">My Profile</h1>

      {/* Profile Update Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateMutation.mutate(form);
        }}
        className="space-y-4"
      >
        <Input
          placeholder="First Name"
          defaultValue={data?.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <Input
          placeholder="Last Name"
          defaultValue={data?.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <Input
          placeholder="Email"
          defaultValue={data?.emailAddress}
          onChange={(e) => setForm({ ...form, emailAddress: e.target.value })}
        />
        <Input
          placeholder="Username"
          defaultValue={data?.userName}
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
        />

        <Button type="submit" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>

      {/* Change Password Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          passwordMutation.mutate(passwords);
        }}
        className="space-y-4"
      >
        <Input
          type="password"
          placeholder="Current Password"
          value={passwords.previousPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, previousPassword: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="New Password"
          value={passwords.password}
          onChange={(e) =>
            setPasswords({ ...passwords, password: e.target.value })
          }
        />

        <Button type="submit" disabled={passwordMutation.isPending}>
          {passwordMutation.isPending ? "Changing..." : "Change Password"}
        </Button>
      </form>

      {/* Delete Account */}
      <div className="mt-6">
        <Button
          variant="destructive"
          onClick={() => deleteMutation.mutate()}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete Account"}
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;

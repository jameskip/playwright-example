import { LoginInfo } from "./ui/pages/sauce-demo.page";

export const expectedResponse = (petId: number) => {
  return {
    category: { id: 0, name: "string" },
    id: petId,
    name: `doggie ${petId}`,
    photoUrls: ["string"],
    status: "available",
    tags: [{ id: 0, name: "string" }],
  };
};

export const userInfo: LoginInfo = {
  username: "standard_user",
  password: "secret_sauce",
};

export const lockedUserInfo: LoginInfo = {
  username: "locked_out_user",
  password: "secret_sauce",
};

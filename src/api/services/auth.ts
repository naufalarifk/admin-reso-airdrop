import type { AxiosResponse } from "axios";
import { baseApi } from "../config";

interface PayloadToken {
  signature: string;
  message: string;
  public_key: string;
}

export async function getTokenServices(payload: PayloadToken) {
  try {
    const response: AxiosResponse = await baseApi.post(
      "auth/identity/sessions/sign/auth",
      payload
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getMe() {
  try {
    const response: AxiosResponse = await baseApi.get(
      "trade/account/members/me"
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
}

export async function clearTokenServices() {
  try {
    const response = await baseApi.delete("auth/identity/sessions");
    return response;
  } catch (error) {
    console.log("error", error);
  }
}

export async function joinAirdropPost(token: string) {
    try {
      const response = await baseApi.post("trade/airdrop/airdrops", 
      {},
      {
        headers: {
          "X-CSRF-TOKEN": token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
}

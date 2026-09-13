import { apiRequest } from "./api";

export type HouseholdMember = {
  id: number;
  email: string;
};

export type Household = {
  id: number;
  name: string;
  invite_code: string;
};

export type HouseholdResponse = {
  household: Household;
  members: HouseholdMember[];
};

export async function getMyHousehold(): Promise<HouseholdResponse> {
  return apiRequest("/households/me");
}
import { http, Result } from "@fider/services/http";

export interface CreateIssueRequest {
  projectID: number;
  title: string;
  description?: string;
}

export const createIssue = async (request: CreateIssueRequest): Promise<Result> => {
  return await http.post("/_api/gitlab/issues", request);
};

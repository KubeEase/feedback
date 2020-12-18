import { http, Result } from "@fider/services/http";

export interface CreateIssueRequest {
  projectID: number;
  title: string;
  postID: number;
  description?: string;
}

export const createIssue = async (request: CreateIssueRequest): Promise<Result> => {
  return await http.post("/api/v1/gitlab/issues", request);
};

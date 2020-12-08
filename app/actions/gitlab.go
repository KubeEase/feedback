package actions

import (
	"context"

	"github.com/getfider/fider/app/models"
	"github.com/getfider/fider/app/pkg/validate"
)

// CreateEditGitlabConfig is used to create/edit gitlab configurations
type CreateEditGitlabConfig struct {
	Model *models.CreateEditGitlabConfig
}

// Initialize the model
func (input *CreateEditGitlabConfig) Initialize() interface{} {
	input.Model = new(models.CreateEditGitlabConfig)
	return input.Model
}

// IsAuthorized returns true if current user is authorized to perform this action
func (input *CreateEditGitlabConfig) IsAuthorized(ctx context.Context, user *models.User) bool {
	return user != nil && user.IsAdministrator()
}

// Validate if current model is valid
func (input *CreateEditGitlabConfig) Validate(ctx context.Context, user *models.User) *validate.Result {
	result := validate.Success()

	if input.Model.URL == "" {
		result.AddFieldFailure("url", "Gitlab URL is required.")
	} else if len(input.Model.URL) > 500 {
		result.AddFieldFailure("url", "Gitlab URL must have less than 500 characters.")
	}

	if input.Model.Path == "" {
		result.AddFieldFailure("path", "Project Path is required.")
	} else if len(input.Model.Path) > 300 {
		result.AddFieldFailure("path", "Project Path must have less than 300 characters.")
	}

	if input.Model.Username == "" {
		result.AddFieldFailure("username", "Username is required.")
	} else if len(input.Model.Username) > 300 {
		result.AddFieldFailure("username", "Username must have less than 300 characters.")
	}

	if input.Model.Token == "" {
		result.AddFieldFailure("token", "Token is required.")
	} else if len(input.Model.Token) > 300 {
		result.AddFieldFailure("token", "Token must have less than 300 characters.")
	}

	return result
}

// CreateGitlabIssue used to create a gitlab issue with post
type CreateGitlabIssue struct {
	ProjectID   int    `json:"projectID"`
	Title       string `json:"title"`
	Description string `json:"description"`
	PostID      int    `json:"postID"`
}

// Initialize model return self
func (c *CreateGitlabIssue) Initialize() interface{} {
	return c
}

// IsAuthorized returns true if current user is authorized to perform this action
func (c *CreateGitlabIssue) IsAuthorized(ctx context.Context, user *models.User) bool {
	return user != nil && user.IsAdministrator()
}

// Validate if current model is valid
func (c *CreateGitlabIssue) Validate(ctx context.Context, user *models.User) *validate.Result {
	if c.PostID == 0 {
		return validate.Failed("Invaild post ID")
	}
	result := validate.Success()

	if c.ProjectID == 0 {
		result.AddFieldFailure("project", "Project is required.")
	}
	if len(c.Title) <= 10 {
		result.AddFieldFailure("title", "Issue title must have more than 10 characters.")
	}

	return result
}

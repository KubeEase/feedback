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

	if input.Model.AppID == "" {
		result.AddFieldFailure("applicationID", "Application ID is required.")
	} else if len(input.Model.AppID) > 300 {
		result.AddFieldFailure("applicationID", "Application ID must have less than 300 characters.")
	}

	if input.Model.AppSecret == "" {
		result.AddFieldFailure("setApplicationSecret", "Application Secret is required.")
	} else if len(input.Model.AppSecret) > 300 {
		result.AddFieldFailure("setApplicationSecret", "Application Secret must have less than 300 characters.")
	}

	return result
}

package actions

import (
	"context"

	"github.com/getfider/fider/app/models"
	"github.com/getfider/fider/app/pkg/validate"
)

// UserSignUpByEmail happens when user request to sign up by email
type UserSignUpByEmail struct {
	Model *models.UserSignUpByEmail
}

// Initialize the model
func (input *UserSignUpByEmail) Initialize() interface{} {
	input.Model = new(models.UserSignUpByEmail)
	input.Model.VerificationKey = models.GenerateSecretKey()
	return input.Model
}

// IsAuthorized returns true if current user is authorized to perform this action
func (input *UserSignUpByEmail) IsAuthorized(ctx context.Context, user *models.User) bool {
	return true
}

// Validate if current model is valid
func (input *UserSignUpByEmail) Validate(ctx context.Context, user *models.User) *validate.Result {
	result := validate.Success()

	if input.Model.Email == "" {
		result.AddFieldFailure("email", "Email is required.")
		return result
	}

	if len(input.Model.Email) > 200 {
		result.AddFieldFailure("email", "Email must have less than 200 characters.")
	}

	messages := validate.Email(input.Model.Email)
	result.AddFieldFailure("email", messages...)

	return result
}

package handlers

import (
	"errors"
	"time"

	"github.com/getfider/fider/app/actions"
	"github.com/getfider/fider/app/models"
	"github.com/getfider/fider/app/models/cmd"
	"github.com/getfider/fider/app/models/enum"
	"github.com/getfider/fider/app/models/query"
	"github.com/getfider/fider/app/pkg/bus"
	"github.com/getfider/fider/app/pkg/web"
	"github.com/getfider/fider/app/tasks"
)

// RegisterByEmail sends a new email with verification key
func RegisterByEmail() web.HandlerFunc {
	return func(c *web.Context) error {

		input := new(actions.UserSignUpByEmail)
		if result := c.BindTo(input); !result.Ok {
			return c.HandleValidation(result)
		}
		input.Model.Language = c.Request.GetHeader("Language")

		userByEmail := &query.GetUserByEmail{Email: input.Model.Email}
		err := bus.Dispatch(c, userByEmail)
		if err == nil {
			return c.Failure(errors.New("email has exists"))
		}

		err = bus.Dispatch(c, &cmd.SaveVerificationKey{
			Key:      input.Model.VerificationKey,
			Duration: 30 * time.Minute,
			Request:  input.Model,
		})
		if err != nil {
			return c.Failure(err)
		}

		c.Enqueue(tasks.SendUserEmailConfirmation(input.Model))

		return c.Ok(web.Map{})
	}
}

// VerifyRegisterKey checks if verify key is correct and sign in user
func VerifyRegisterKey(kind enum.EmailVerificationKind) web.HandlerFunc {
	return func(c *web.Context) error {
		result, err := validateKey(kind, c)
		if result == nil {
			return err
		}

		var user *models.User
		if kind == enum.EmailVerificationKindUserRegister {
			status := enum.UserActive
			if c.Tenant().IsPrivate {
				status = enum.UserPendding
			}
			user = &models.User{
				Name:   result.Name,
				Email:  result.Email,
				Tenant: c.Tenant(),
				Role:   enum.RoleVisitor,
				Status: status,
			}

			if err = bus.Dispatch(c, &cmd.RegisterUser{User: user}); err != nil {
				return c.Failure(err)
			}
		} else {
			return c.NotFound()
		}

		err = bus.Dispatch(c, &cmd.SetKeyAsVerified{Key: result.Key})
		if err != nil {
			return c.Failure(err)
		}

		// webutil.AddAuthUserCookie(c, user)

		return c.Redirect("/")
	}
}

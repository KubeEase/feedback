package apiv1

import (
	"github.com/getfider/fider/app/actions"
	"github.com/getfider/fider/app/pkg/web"
	gitlab "github.com/xanzy/go-gitlab"
)

// CreateGitlabIssue used to create gitlab issue with post
func CreateGitlabIssue() web.HandlerFunc {
	return func(c *web.Context) error {
		input := new(actions.CreateGitlabIssue)
		if result := c.BindTo(input); !result.Ok {
			return c.HandleValidation(result)
		}
		_, err := gitlab.NewClient("")
		if err != nil {
			return c.Failure(err)
		}
		return c.Ok(web.Map{})
	}
}

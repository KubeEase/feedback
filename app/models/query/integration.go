package query

import (
	"github.com/getfider/fider/app/models"
)

// ListAllIntegrations used to query integrations
type ListAllIntegrations struct {
	Result []*models.CreateEditGitlabConfig
}

type GitlabProject struct {
	ConfigID int    `json:"id"`
	Path     string `json:"path"`
}

package cmd

import "github.com/getfider/fider/app/models"

// SaveGitlabConfig used to create or edit gitlab configurations
type SaveGitlabConfig struct {
	Config *models.CreateEditGitlabConfig
}

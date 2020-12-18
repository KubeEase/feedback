package postgres

import (
	"context"

	"github.com/getfider/fider/app/models"
	"github.com/getfider/fider/app/models/cmd"
	"github.com/getfider/fider/app/models/query"
	"github.com/getfider/fider/app/pkg/dbx"
	"github.com/getfider/fider/app/pkg/errors"
)

type dbGitlabConfig struct {
	ID        int    `db:"id"`
	URL       string `db:"url"`
	Path      string `db:"path"`
	VerifySSL bool   `db:"ssl"`
	Username  string `db:"username"`
	Token     string `db:"token"`
}

func (c *dbGitlabConfig) toModel() *models.CreateEditGitlabConfig {
	return &models.CreateEditGitlabConfig{
		ID:        c.ID,
		URL:       c.URL,
		Path:      c.Path,
		VerifySSL: c.VerifySSL,
		Username:  c.Username,
		Token:     c.Token,
	}
}

func listAllIntegrations(ctx context.Context, q *query.ListAllIntegrations) error {
	return using(ctx, func(trx *dbx.Trx, tenant *models.Tenant, user *models.User) error {
		var err error
		configs := []*dbGitlabConfig{}
		if tenant != nil {
			err = trx.Select(&configs, `
			SELECT id, url, path, ssl, username, token
			FROM integration_gitlab
			WHERE tenant_id = $1
			ORDER BY id`, tenant.ID)
			if err != nil {
				return err
			}
		}

		q.Result = make([]*models.CreateEditGitlabConfig, len(configs))
		for i, config := range configs {
			q.Result[i] = config.toModel()
		}
		return nil
	})
}

func saveGitlabConfig(ctx context.Context, c *cmd.SaveGitlabConfig) error {
	return using(ctx, func(trx *dbx.Trx, tenant *models.Tenant, user *models.User) error {
		var err error

		if c.Config.ID == 0 {
			query := `INSERT INTO integration_gitlab (
			url, path, ssl, username, token, tenant_id)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING id`

			err = trx.Get(&c.Config.ID, query,
				c.Config.URL, c.Config.Path, c.Config.VerifySSL, c.Config.Username,
				c.Config.Token, tenant.ID)
		} else {
			query := `
				UPDATE integration_gitlab
				SET url = $1, path = $2, ssl = $3, username = $4,
						token = $5
			WHERE tenant_id = $6 AND id = $7`

			_, err = trx.Execute(query,
				c.Config.URL, c.Config.Path, c.Config.VerifySSL, c.Config.Username,
				c.Config.Token, tenant.ID, c.Config.ID)
		}

		if err != nil {
			return errors.Wrap(err, "failed to save Gitlab Config")
		}

		return nil
	})
}

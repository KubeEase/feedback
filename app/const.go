package app

import "errors"

// ErrNotFound represents an object not found error
var ErrNotFound = errors.New("Object not found")

// InvitePlaceholder represents the placeholder used by members to invite other users
var InvitePlaceholder = "%invite%"

//ErrUserIDRequired is used when OAuth integration returns an empty user ID
var ErrUserIDRequired = errors.New("UserID is required during OAuth integration")

type key string

func createKey(name string) key {
	return key("FIDER_CTX_" + name)
}

const (
	//FacebookProvider is const for 'facebook'
	FacebookProvider = "facebook"
	//GoogleProvider is const for 'google'
	GoogleProvider = "google"
	//GitHubProvider is const for 'github'
	GitHubProvider = "github"
)

var (
	// RequestCtxKey context key for request
	RequestCtxKey = createKey("REQUEST")
	// TransactionCtxKey is a key for transaction
	TransactionCtxKey = createKey("TRANSACTION")
	// TenantCtxKey is key for tenant
	TenantCtxKey = createKey("TENANT")
	// UserCtxKey is a key for user
	UserCtxKey = createKey("USER")
	// LogPropsCtxKey is a key for Logging
	LogPropsCtxKey = createKey("LOG_PROPS")
)

package enum

//UserStatus is the status of a user
type UserStatus int

var (
	//UserActive is the default status for users
	UserActive UserStatus = 1
	//UserDeleted is used for users that chose to delete their accounts
	UserDeleted UserStatus = 2
	//UserBlocked is used for users that have been blocked by staff members
	UserBlocked UserStatus = 3
	//UserPendding is used for users that waiting for approve
	UserPendding UserStatus = 4
)

var userStatusIDs = map[UserStatus]string{
	UserActive:  "active",
	UserDeleted: "deleted",
	UserBlocked: "blocked",
}

var userStatusName = map[string]UserStatus{
	"active":  UserActive,
	"deleted": UserDeleted,
	"blocked": UserBlocked,
}

// MarshalText returns the Text version of the user status
func (status UserStatus) MarshalText() ([]byte, error) {
	return []byte(userStatusIDs[status]), nil
}

// UnmarshalText parse string into a user status
func (status *UserStatus) UnmarshalText(text []byte) error {
	*status = userStatusName[string(text)]
	return nil
}

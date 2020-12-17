package captcha

import "github.com/mojocn/base64Captcha"

//TODO: Need support redis store
var store = base64Captcha.DefaultMemStore

var devicer *base64Captcha.DriverMath = base64Captcha.NewDriverMath(48, 180, 5, base64Captcha.OptionShowSineLine, nil, []string{"3Dumb.ttf"})

var captcha *base64Captcha.Captcha

// Generate base64 captcha code
func Generate() (string, string, error) {
	if captcha == nil {
		captcha = base64Captcha.NewCaptcha(devicer, store)
	}
	return captcha.Generate()
}

// Match returns true if the answer code matches the id
func Match(id, answer string) bool {
	return store.Verify(id, answer, true)
}

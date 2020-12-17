package captcha

import (
	"image/color"

	"github.com/mojocn/base64Captcha"
)

//TODO: Need support redis store
var store = base64Captcha.DefaultMemStore

var devicer *base64Captcha.DriverMath = base64Captcha.NewDriverMath(36, 200, 0, base64Captcha.OptionShowHollowLine, &color.RGBA{255, 255, 255, 0}, []string{"wqy-microhei.ttc"})

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

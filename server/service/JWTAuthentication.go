package service

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// SECRET_KEY secret
const SECRET_KEY = "golang"

// ISSURE issure
const ISSURE = "golang"

type authCustomClaims struct {
	Name string `json:"name"`
	User bool   `json:"user"`
	jwt.StandardClaims
}

// GenerateToken creates a new token to the client
func GenerateToken(username string, isUser bool) string {
	claims := &authCustomClaims{
		username,
		isUser,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 48).Unix(),
			Issuer:    ISSURE,
			IssuedAt:  time.Now().Unix(),
		},
	}
	generateToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	//encoded string
	token, err := generateToken.SignedString([]byte(SECRET_KEY))
	if err != nil {
		panic(err)
	}
	return token
}

//ValidateToken token from client
func ValidateToken(encodedToken string) (*jwt.Token, error) {
	return jwt.Parse(encodedToken, func(token *jwt.Token) (interface{}, error) {
		if _, isvalid := token.Method.(*jwt.SigningMethodHMAC); !isvalid {
			return nil, fmt.Errorf("Invalid token", token.Header["alg"])

		}
		return []byte(SECRET_KEY), nil
	})
}

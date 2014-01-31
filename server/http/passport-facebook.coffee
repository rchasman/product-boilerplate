db = require '../database'
User = db.model 'User'
passport = require "passport"
FacebookStrategy = require("passport-facebook").Strategy
config = require '../config'
app = require './express'
express = require 'express'

handleFunction = (accessToken, refreshToken, profile, done) ->
  profile = profile._json
  profile.provider = 'facebook'
  profile.token = accessToken
  profile.location = profile.location?.name

  User.findOne {id: profile.id}, (err, user) ->
    return done err if err?
    if user?
      user.set profile
      #console.log 'updated user', user
      user.save done
    else
      User.create profile, done

passport.use new FacebookStrategy
  clientID: config.facebook.id
  clientSecret: config.facebook.secret
  callbackURL: config.facebook.callback
, handleFunction

passport.serializeUser (user, cb) ->
  cb null, user.id

passport.deserializeUser (id, cb) ->
  User.findById _id, cb

app.get '/auth/facebook', passport.authenticate 'facebook',
  display: 'touch'

app.get '/auth/facebook/callback', passport.authenticate 'facebook',
  display: 'touch'
  successRedirect: '/'
  failureRedirect: '/login'

module.exports = passport

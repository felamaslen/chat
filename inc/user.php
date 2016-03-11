<?php

/**
 * @file inc/user.php
 * @depends inc/misc.php
 * @depends inc/db.php
 */

class User {
  public function __construct() {
    $this->uid = NULL;
    $this->name = NULL;
    $this->username = NULL;
  }

  private function make_salt() {
    // returns a new salt (random 6 letter alphanumeric string)
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    $num_chars = strlen($chars);

    $salt = '';

    $salt_length = 6;

    for ($i = 0; $i < $salt_length; $i++) {
      $salt .= substr($chars, mt_rand(0, $num_chars - 1), 1);
    }

    return $salt;
  }

  private function get_user_info($uid) {
    $info_query = db_query('
      SELECT {uid}, {name}, {username}
      FROM {users}
      WHERE {uid} = %d
    ', $uid) or http_error(500, 'Database error getting user information');

    $info = $info_query->fetch_object();

    return $info;
  }

  private function check_username_password($username, $password) {
    // checks user against the database, if it matches then
    // we return the user info for that user
    // otherwise we return false

    // first, see if there is a matching username and if so, retrieve the hash,
    // so that we can check that the password is correct
    $user_query = db_query('
      SELECT {uid}, {password}
      FROM {users}
      WHERE {username} = "%s"
    ', $username) or http_error(500, 'Database error finding user');

    if ($user_query->num_rows !== 1) {
      // username does not exist
      return FALSE;
    }

    $user_info = $user_query->fetch_object();

    $uid  = (int)$user_info->uid;
    $hash = $user_info->password;

    $good_login = password_verify($password, $hash);

    if (!$good_login) {
      // password is wrong
      return FALSE;
    }

    return $this->get_user_info($uid);
  }

  public function get_login_status() {
    // see if we are logged in, by (a) session, (b) cookie
    $result = FALSE;

    if (isset($_SESSION) && isset($_SESSION['uid'])) {
      // we are logged in already
      $result = $this->get_user_info($_SESSION['uid']);
    }

    if (!$result && isset($_COOKIE) && isset($_COOKIE['username']) && isset($_COOKIE['password'])) {
      $result = $this->check_username_password(
        $_COOKIE['username'],
        $_COOKIE['password']
      );
    }

    if ($result !== FALSE) {
      // we are logged in
      $this->uid      = $result->uid;
      $this->name     = $result->name;
      $this->username = $result->username;
    }
  }
}

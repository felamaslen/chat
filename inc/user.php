<?php

/**
 * @file inc/user.php
 * @depends inc/config.php
 * @depends inc/misc.php
 * @depends inc/db.php
 */

function _user_try_login() {
  // try to log in the user with the specified credentials
  global $user;
  
  if (!isset($_POST['username']) || !strlen($_POST['username'])) {
    http_quit(400, 'Must provide username');
  }
  $username = $_POST['username'];

  if (!isset($_POST['password']) || !strlen($_POST['password'])) {
    http_quit(400, 'Must provide password');
  }
  $password = $_POST['password'];

  $rememberme = isset($_POST['rememberme']) && $_POST['rememberme'] == 'true';

  $user->try_login($username, $password, $rememberme);
}

function user_handle_query($query) {
  global $user;

  $option = array_shift($query);

  if (!$option) {
    http_quit(400, 'No sub-task given!');
  }

  switch ($option) {
  case 'login':
    _user_try_login();
  case 'status':
  
    $user->print_user_info();

    break;
  case 'logout':
    $user->logout();

    break;
  default:
    http_quit(400, 'Invalid sub-task given!');
  }
}

class User {
  public function __construct() {
    $this->uid      = NULL;
    $this->admin    = NULL;
    $this->name     = NULL;
    $this->username = NULL;
    $this->picture  = NULL;
  }

  private function get_user_info($uid) {
    $info_query = db_query('
      SELECT {uid}, {admin}, {name}, {username}, {password}, {picture}
      FROM {users}
      WHERE {uid} = %d
    ', $uid) or http_error(500, 'Database error getting user information');

    $info = $info_query->fetch_object();

    return $info;
  }

  private function check_username_password($username, $password, $check_cookie = FALSE) {
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

    $good_login = $check_cookie
      ? $password === $hash                 // "rememberme" cookie stores password hash
      : password_verify($password, $hash);  // otherwise we check an actual password

    if (!$good_login) {
      // password is wrong
      return FALSE;
    }

    return $this->get_user_info($uid);
  }

  private function set_from_sql_result($result) {
    if (!!$result) {
      $this->uid      = (int)($result->uid);
      $this->admin    = $result->admin > 0;
      $this->name     = $result->name;
      $this->username = $result->username;
      $this->picture  = $result->picture;
    }
  }

  public function print_user_info() {
    // prints user information for JSON request
    print json_encode(array(
      'uid'       => $this->uid,
      'admin'     => $this->admin,
      'name'      => $this->name,
      'username'  => $this->username,
      'picture'   => $this->picture,
    ));

    die;
  }

  public function logout() {
    session_unset();

    setcookie('username', '', time() - 86400, '/');
    setcookie('password', '', time() - 86400, '/');

    print 'logged_out';
    die;
  }

  public function try_login($username, $password, $rememberme) {
    // tries to log in with given credentials
    $user_info = $this->check_username_password($username, $password);

    $this->set_from_sql_result($user_info);

    if ($this->uid) {
      // we are logged in!

      $_SESSION['uid'] = (int)($user_info->uid);

      if ($rememberme) {
        setcookie('username', $user_info->username, time() + REMEMBERME_TIME * 86400, '/');
        setcookie('password', $user_info->password, time() + REMEMBERME_TIME * 86400, '/');
      }
    }
  }

  public function get_login_status() {
    // see if we are logged in, by (a) session, (b) cookie
    $result = FALSE;

    if (isset($_SESSION) && isset($_SESSION['uid'])) {
      // we are logged in already
      $result = $this->get_user_info($_SESSION['uid']);
    }

    if (!$result && isset($_COOKIE)
      && isset($_COOKIE['username']) && isset($_COOKIE['password'])
    ) {
      $result = $this->check_username_password(
        $_COOKIE['username'],
        $_COOKIE['password'],
        TRUE
      );
    }

    if ($result !== FALSE) {
      // we are logged in
      $this->set_from_sql_result($result);
    }
  }
}

// check that we are logged in
if (!isset($_SESSION)) {
  session_start();
}

$user = new User;
$user->get_login_status();



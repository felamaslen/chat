<?php

/**
 * starts the application
 */

define('ROOT_PATH', dirname(dirname(__FILE__)));

require_once ROOT_PATH . '/inc/config.php';
require_once ROOT_PATH . '/inc/misc.php';
require_once ROOT_PATH . '/inc/db.php';
require_once ROOT_PATH . '/inc/user.php';

// connect to the database
db_connect();

// handle user login
$user = new User;
$user->get_login_status();

var_dump($user);


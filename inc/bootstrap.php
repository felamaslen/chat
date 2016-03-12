<?php

/**
 * @file inc/bootstrap.php
 * starts the application
 */

define('ROOT_PATH', dirname(dirname(__FILE__)));

require_once ROOT_PATH . '/inc/config.php';
require_once ROOT_PATH . '/inc/misc.php';
require_once ROOT_PATH . '/inc/db.php';
require_once ROOT_PATH . '/inc/user.php';
require_once ROOT_PATH . '/inc/chat.php';
require_once ROOT_PATH . '/inc/query.php';


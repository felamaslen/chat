<?php

/**
 * @file inc/query.php
 * @depends inc/user.php
 * @depends inc/chat.php
 * called by inc/bootstrap.php
 * query handler
 */

function _query_handle_base($query) {
  $option = array_shift($query);

  if (!$option) {
    http_quit(400, 'No task given!');
  }
  
  switch ($option) {
  case 'user':
    user_handle_query($query);
    break;
  case 'chat':
    chat_handle_query($query);
    break;
  default:
    http_quit(400, 'Invalid task given!');
  }
}

function handle_query() {
  $query_raw = isset($_GET['q']) ? $_GET['q'] : '';

  $query = explode('/', $query_raw);

  _query_handle_base($query);
}

handle_query();


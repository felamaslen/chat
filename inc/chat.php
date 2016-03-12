<?php

/**
 * @file inc/chat.php
 * @depends inc/user.php
 */

function _chat_list_all_chats($uid) {
  $query = db_query('
    SELECT {uid}, {name}, {picture}, {chats1}.{nick2}, {chats2}.{nick1}
    FROM {users}
    LEFT JOIN {chats} AS {chats1} ON ({chats1}.{uid1} = %d AND {chats1}.{uid2} = {uid})
    LEFT JOIN {chats} AS {chats2} ON ({chats2}.{uid2} = %d AND {chats2}.{uid1} = {uid})
    WHERE {uid} != %d
  ', $uid, $uid, $uid);

  $users = array();

  while (NULL !== ($row = $query->fetch_object())) {
    $name = $row->name;

    if ($row->nick1) {
      $name = $row->nick1;
    }
    else if ($row->nick2) {
      $name = $row->nick2;
    }

    $users[] = array(
      'uid'     => (int)($row->uid),
      'name'    => $name,
      'picture' => $row->picture,
    );
  }

  print json_encode($users);

  die;
}

function chat_handle_query($query) {
  global $user;

  $option = array_shift($query);

  if (!$option) {
    http_quit(400, 'No sub-task given!');
  }

  switch ($option) {
  case 'list':
    // lists all users
    if (!$user->uid) {
      http_quit(403);
    }

    _chat_list_all_chats($user->uid);

    break;
  default:
    http_quit(400, 'Invalid sub-task given!');
  }
}

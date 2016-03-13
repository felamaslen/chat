<?php

/**
 * @file inc/chat.php
 * @depends inc/user.php
 */

// class Chat implements MessageComponentInterface

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

function _chat_select_uid($uid) {
  global $user;

  if ($user->uid === $uid) {
    http_quit(400, 'Can\'t chat with yourself!');
  }

  $valid_uid_query = db_query(
    'SELECT {uid} FROM {users} WHERE {uid} = %d', $uid
  ) or http_quit(500, 'Database error validating uid!');

  $valid_uid = $valid_uid_query->num_rows > 0;

  if (!$valid_uid) {
    http_quit(400, 'Invalid uid!');
  }

  // check if there exists a chat between $user->uid (me) and $uid (them)
  $exists_query = db_query('
    SELECT {cid} FROM {chats}
    WHERE ({uid1} = %d AND {uid2} = %d) OR ({uid1} = %d AND {uid2} = %d)
    ', $user->uid, $uid, $uid, $user->uid) or http_quit(500, 'Database error checking chat!');

  if ($exists_query->num_rows > 1) {
    // this shouldn't happen
    http_quit(500, 'Database error: extraneous chats');
  }

  $chat_exists = $exists_query->num_rows > 0;

  if (!$chat_exists) {
    // make a new chat
    $new_chat_query = db_query('
      INSERT INTO {chats} ({uid1}, {uid2}) VALUES(%d, %d)
    ', $user->uid, $uid) or http_quit(500, 'Database error creating chat!');
  }

  $chat_query = db_query('
    SELECT {cid}, {nick1}, {nick2}, {name},
    CASE WHEN
      {uid1} = %d THEN 1
      ELSE 0
    END AS {i_am_uid1}
    FROM {chats}
    INNER JOIN {users} ON {uid} = %d
    WHERE ({uid1} = %d AND {uid2} = %d) OR ({uid1} = %d AND {uid2} = %d)
    LIMIT 1
    ', $user->uid, $uid, $user->uid, $uid, $uid, $user->uid)
    or http_quit(500, 'Database error fetching chat!');

  if (!$chat_query->num_rows) {
    http_quit(500, 'Chat does not exist!');
  }

  $chat = $chat_query->fetch_object();

  $nicks = array(
    $chat->nick1,
    $chat->nick2,
  );

  $i_am_uid1 = (int)($chat->i_am_uid1) > 0;

  // name of the person we are chatting to
  $name = $nicks[$i_am_uid1 ? 1 : 0];

  if (!$name || !strlen($name)) {
    $name = $chat->name;
  }

  // get the last few messages
  $cid = (int)($chat->cid);

  $messages_query = db_query('
    SELECT * FROM (
      SELECT {mid}, {timestamp}, {text}, {uid}
      FROM {messages}
      WHERE {cid} = %d
      ORDER BY {timestamp} DESC
      LIMIT 0, %d
    ) {results} ORDER BY {timestamp} ASC
    ', $cid, NUM_MESSAGES_PRELOAD) or http_quit(500, 'Database error fetching messages!');

  $messages = array();

  while (NULL !== ($row = $messages_query->fetch_object())) {
    $messages[] = array(
      'mid'       => (int)($row->mid),
      'timestamp' => (int)($row->timestamp),
      'text'      => $row->text,
      'uid'       => (int)($row->uid),
    );
  }

  print json_encode(array(
    'name'      => $name,
    'messages'  => $messages,
  ));
}

function chat_handle_query($query) {
  global $user;
  
  if (!$user->uid) {
    http_quit(403);
  }

  $option = array_shift($query);

  if (!$option) {
    http_quit(400, 'No sub-task given!');
  }

  switch ($option) {
  case 'list':
    // lists all users
    _chat_list_all_chats($user->uid);

    break;
  case 'uid':
    $uid = array_shift($query);

    if (!$uid) {
      http_quit(400, 'No uid given!');
    }

    _chat_select_uid((int)($uid));

    break;
  default:
    http_quit(400, 'Invalid sub-task given!');
  }
}

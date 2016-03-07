<?php

/**
 * This is needed for cookie based authentication to encrypt password in
 * cookie
 */
$cfg['blowfish_secret'] = '${BLOWFISH_SECRET}'; /* YOU MUST FILL IN THIS FOR COOKIE AUTH! */

/* Authentication type */
$cfg['Servers'][1]['auth_type'] = 'cookie';
/* Server parameters */
$cfg['Servers'][1]['host'] = '127.0.0.1';
$cfg['Servers'][1]['connect_type'] = 'tcp';
$cfg['Servers'][1]['compress'] = false;
$cfg['Servers'][1]['AllowNoPassword'] = false;

/**
 * Directories for saving/loading files from server
 */
$cfg['UploadDir'] = '';
$cfg['SaveDir'] = '';

<?php

// auth
// from, to, subject, message
const LDAP_URI = "ldap://127.0.0.1/";
const ADMIN_GROUP = "cn=admin,ou=groups,dc=fsinfo,dc=fim,dc=uni-passau,dc=de";

$headers = array_change_key_case(getallheaders());
$ldap = ldap_connect(LDAP_URI);
ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
if (!isset($headers["authorization"]) || explode(" ", $headers["authorization"])[0] != "Basic")
    header("HTTP/1.1 401 Unauthorized");
$auth = explode(":", base64_decode(explode(" ", $headers["authorization"])[1]));
if (!ldap_bind($ldap, $auth[0], $auth[1]) || !in_array(ADMIN_GROUP, ldap_get_entries($ldap, ldap_read($ldap, $auth[0], "(objectclass=*)", ["memberOf"]))[0]["memberof"]))
    header("HTTP/1.1 403 Forbidden");
if(!isset($_POST["from"]) || !isset($_POST["to"]) || !isset($_POST["message"]))
    header("HTTP/1.1 400 Bad Request");

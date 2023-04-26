const LDAP_API = "https://fsinfo.fim.uni-passau.de/fat/api/ldap/"
const LDAP_URI = "ldap://127.0.0.1/"
const LDAP_BASE = "dc=fsinfo,dc=fim,dc=uni-passau,dc=de"
const LDAP_USER_BASE = "ou=users," + LDAP_BASE
const LDAP_USER_DN = "uid=%u," + LDAP_USER_BASE
const LDAP_GROUP_BASE = "ou=groups," + LDAP_BASE
const LDAP_GROUP_DN = "cn=%g," + LDAP_GROUP_BASE
const PASSWORD_CHARS = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PASSWORD_LENGTH = 12;
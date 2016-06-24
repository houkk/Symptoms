MONGODB_SETTINGS = {
    'DB': 'Symptom',
    'username': 'symp',
    'PASSWORD': 'symp',
    'host': '10.120.56.203',
    'port': 27017,
}
SECRET_KEY = "#y\xf4e\xf2 pu\xea\x8a\xcb\x86\xad\x04\xbcz\x86\xf4\xd7\x85\xf5\xa5\xa2G"

import datetime

REMEMBER_COOKIE_NAME = "Symptom_token"

REMEMBER_COOKIE_DURATION = datetime.timedelta(days=10)

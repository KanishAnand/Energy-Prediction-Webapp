import pytest
import requests
import json

# def test_register():
#     url = "http://localhost:4000/user/add"
#     headers = {'Content-Type': 'application/json'}
#     user = {"username": "J3o22hn",
#             "email": "joh312n@gmail.com",
#             "phoneNo": "3918187776",
#             "firstName": "John",
#             "lastName": "Cena",
#             "password": "Hello@123",
#             "confirmPassword": "Hello@123",
#             "userType": "Owner"
#             }
#     resp = requests.post(url, data=json.dumps(user), headers=headers)
#     assert resp.status_code == 200


def test_login():
    url = "http://localhost:4000/user/login"
    headers = {'Content-Type': 'application/json'}
    user = {"username": "John",
            "password": "Hello@123",
            }

    resp = requests.post(url, data=json.dumps(user), headers=headers)
    assert resp.status_code == 200

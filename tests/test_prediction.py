# import pytest
# import requests
# import json

# # def test_register():
# #     url = "http://localhost:4000/user/add"
# #     headers = {'Content-Type': 'application/json'}
# #     user = {"username": "J3o22hn",
# #             "email": "joh312n@gmail.com",
# #             "phoneNo": "3918187776",
# #             "firstName": "John",
# #             "lastName": "Cena",
# #             "password": "Hello@123",
# #             "confirmPassword": "Hello@123",
# #             "userType": "Owner"
# #             }
# #     resp = requests.post(url, data=json.dumps(user), headers=headers)
# #     assert resp.status_code == 200


# def test_prediction():
#     url = "http://localhost:4000/model/predict"
#     headers = {'Content-Type': 'application/json'}
#     dateTime = {
#         "fromDate": "2020-04-21",
#         "fromTime": "15:00",
#         "toDate": "2020-04-22",
#         "toTime": "16:00"
#     }
#     resp = requests.post(url, data=json.dumps(dateTime), headers=headers)
#     assert resp.status_code == 200


# test_prediction()

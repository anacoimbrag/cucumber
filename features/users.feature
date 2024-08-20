Feature: Show list of users
    We need to list and view all registered users

    Scenario: Get list of users
        Given I make a GET request to http://localhost:3000/user
        When I receive a response
        Then I expect response should have a status 200
        And I expect response to return 10 users

    Scenario: Get single user
        Given I make a GET request to http://localhost:3000/user/1
        When I receive a response
        Then I expect response should have a status 200
        And I expect response should have a json like
        """
        {
            "status": "success",
            "user": {
                "gender": "female",
                "name": {
                "title": "Mrs",
                "first": "Lourdes",
                "last": "da Cruz"
                },
                "email": "lourdes.dacruz@example.com",
                "phone": "(95) 7477-0974",
                "picture": {
                "large": "https://randomuser.me/api/portraits/women/43.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/43.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/43.jpg"
                }
            }
        }
        """
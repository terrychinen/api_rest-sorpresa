define({ "api": [
  {
    "type": "post",
    "url": "url/auth/signin/",
    "title": "Allow the user to Sign In",
    "name": "PostSignin",
    "group": "Auth",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"flutter_key\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Authentication name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Authentication password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "ok",
            "description": "<p>Success of the petition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the petition.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user model.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.user_id",
            "description": "<p>The user id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role_id",
            "description": "<p>The role id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.token_id",
            "description": "<p>The token id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.first_name",
            "description": "<p>Firstname of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.last_name",
            "description": "<p>Lastname of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username for login.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.phone",
            "description": "<p>User's phone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "user.state",
            "description": "<p>User's state.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token for user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "expire_in",
            "description": "<p>Token expiration date.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "saved_date",
            "description": "<p>Token saved date.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"ok\": true,\n        \"message\": \"Login successful!\",\n        \"user\": {\n            \"user_id\": 0,\n            \"role_id\": 0,\n            \"token_id\":0,\n            \"first_name\": \"xxxxx\",\n            \"last_name\": \"xxxxx\",\n            \"username\": \"xxxx\",\n            \"phone\": \"xxxxxxxxxxxx\",\n            \"email\": \"xxxxx@gmail.com\",\n            \"state\": 1\n        },\n        \"token\": \"xxxxxxx.xxxxxx-xxxxx&xxxxxxx\",\n        \"expireIn\": \"0000000\",\n        \"savedDate\": \"xxxx-xx-xx x:xx:xx\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Username was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserWasDelete",
            "description": "<p>Username was deleted.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UpdateApp",
            "description": "<p>Need to update the application</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotFound: 400",
          "content": "HTTP/1.1 400 Not Found\n{\n        \"ok\": false,\n        \"message\": \"The username or password is not correct\"\n}",
          "type": "json"
        },
        {
          "title": "UserWasDelete: 403",
          "content": "HTTP/1.1 403 Was Deleted\n{\n        \"ok\": false,\n        \"message\": \"User deleted\",\n        \"username\": \"juan\",\n        \"state\": 0\n }",
          "type": "json"
        },
        {
          "title": "UpdateApp: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Update the app\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Server's message\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.routes.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "url/auth/signup/",
    "title": "Create new account",
    "name": "PostSignup",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "ok",
            "description": "<p>Success of the petition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the petition.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: 200",
          "content": "HTTP/1.1 200 OK\n{\n    \"ok\": true,\n    \"message\": \"User created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InsertUpdate",
            "description": "<p>Insert or Update query error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UpdateApp",
            "description": "<p>Need to update the application</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InsertUpdate: 400",
          "content": "HTTP/1.1 400 Insert or Update error\n{\n        \"ok\": false,\n        \"message\": \"INSERT or UPDATE error\",\n        error\n}",
          "type": "json"
        },
        {
          "title": "UpdateApp: 406",
          "content": "HTTP/1.1 403 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Update the app\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Errpr\n{\n        \"ok\": false,\n        \"message\": \"Server's message\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.routes.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "url/category/",
    "title": "Get categories",
    "name": "GetCategories",
    "group": "Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"flutter_key\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "ok",
            "description": "<p>Success of the petition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the petition.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>Show all categories.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.category_id",
            "description": "<p>The category id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.category_name",
            "description": "<p>The category name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"GET successful: category\",\n        \"result\": [\n            {\n                \"category_id\": 0,\n                \"category_name\": \"xxxxxx\"\n            }\n        ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "GetQueryError",
            "description": "<p>GET query error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "GetQueryError: 400",
          "content": "HTTP/1.1 400 Not Found\n{\n        \"ok\": false,\n        \"message\": \"GET error\"\n}",
          "type": "json"
        },
        {
          "title": "UpdateApp: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Update the app\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Server's message\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.ts",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "url/category/",
    "title": "Get category",
    "name": "GetCategoryBy",
    "group": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "ok",
            "description": "<p>Success of the petition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the petition.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>Show all categories.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.category_id",
            "description": "<p>The category id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.category_name",
            "description": "<p>The category name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"GET BY category_id successful: category\",\n        \"result\": [\n            {\n                \"category_id\": 0,\n                \"category_name\": \"xxxxx\"\n            }\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.ts",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "url/category/",
    "title": "Create category",
    "name": "PostCreateCategory",
    "group": "Category",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"flutter_key\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "ok",
            "description": "<p>Success of the petition.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of the petition.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"INSERT successful: category\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InsertQueryError",
            "description": "<p>POST query error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Token",
            "description": "<p>error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InsertQueryError: 400",
          "content": "HTTP/1.1 400 Query error\n{\n        \"ok\": false,\n        \"message\": \"INSERT error\"\n}",
          "type": "json"
        },
        {
          "title": "TokenError: 401",
          "content": "HTTP/1.1 401 Token error\n{\n        \"ok\": false,\n        \"message\": \"Token error\"\n}",
          "type": "json"
        },
        {
          "title": "UpdateApp: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Update the app\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Server's message\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.ts",
    "groupTitle": "Category"
  }
] });

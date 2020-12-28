define({ "api": [
  {
    "type": "put",
    "url": "/store/:store_id",
    "title": "Actualizar Almacén",
    "name": "ActualizarAlmacén",
    "group": "Almacén",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "store_id",
            "description": "<p>El ID del almacén (este ID tiene que ir en el URL)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "store_name",
            "description": "<p>El nombre del almacén</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado del almacén (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Almacén actualizado correctamente\"\n}",
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
            "field": "StoreExists",
            "description": "<p>Ya existe el almacén</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StoreIDNotFound",
            "description": "<p>El ID del almacén no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "StoreExists: 400",
          "content": "HTTP/1.1 400 Store exists\n{\n        \"ok\": false,\n        \"message\": \"El almacén ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "StoreIDNotFound: 405",
          "content": "HTTP/1.1 405 Store ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID del almacén no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/store.routes.ts",
    "groupTitle": "Almacén"
  },
  {
    "type": "post",
    "url": "/store/search",
    "title": "Buscador de almacenes",
    "name": "BuscarAlamcenes",
    "group": "Almacén",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "query",
            "description": "<p>El nombre del almacén</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado del almacén (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de almacenes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n               \"store_id\": 1,\n                \"store_name\": \"Almacén A\",\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StateNotFound",
            "description": "<p>El 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "StateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n        \"ok\": false,\n        \"message\": \"La variable 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/store.routes.ts",
    "groupTitle": "Almacén"
  },
  {
    "type": "post",
    "url": "/store",
    "title": "Crear almacén",
    "name": "CrearAlmacén",
    "group": "Almacén",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
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
            "field": "store_name",
            "description": "<p>El nombre del almacén</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado del almacén (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Almacén creado correctamente\"\n}",
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
            "field": "StoreExists",
            "description": "<p>Ya existe el almacén</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "StoreExists: 400",
          "content": "HTTP/1.1 406 Store exists\n{\n        \"ok\": false,\n        \"message\": \"El almacén ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/store.routes.ts",
    "groupTitle": "Almacén"
  },
  {
    "type": "delete",
    "url": "/store/:store_id",
    "title": "Eliminar Almacén",
    "name": "EliminarAlmacén",
    "group": "Almacén",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "store_id",
            "description": "<p>El ID del almacén (este ID tiene que ir en el URL)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"El almacén ha sido eliminado correctamente\"\n}",
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
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StoreIDNotFound",
            "description": "<p>El ID del almacén no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "StoreIDNotFound: 405",
          "content": "HTTP/1.1 405 Store ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID del almacén no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/store.routes.ts",
    "groupTitle": "Almacén"
  },
  {
    "type": "get",
    "url": "/store?offset=0&state=1",
    "title": "Obtener todos los almacenes",
    "name": "ObtenerAlmacenes",
    "group": "Almacén",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Número de índice</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado del almacén (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de almacenes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"store_id\": 1,\n                \"store_name\": \"Almacén A\",\n                \"state\": 1\n            },                \n            {\n                \"store_id\": 2,\n                \"store_name\": \"Almacén B\",\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OffsetOrStateNotFound",
            "description": "<p>El 'offset' o 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "OffsetOrStateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n        \"ok\": false,\n        \"message\": \"La variable 'offset' y 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/store.routes.ts",
    "groupTitle": "Almacén"
  },
  {
    "type": "post",
    "url": "url/auth/signin",
    "title": "Inciar sesión al usuario",
    "name": "IniciarSesión",
    "group": "Auth",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
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
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Clave del usuario</p>"
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
            "description": "<p>Si la peticion ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Modelo usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.user_id",
            "description": "<p>El ID del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.token_id",
            "description": "<p>El ID del token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role_id",
            "description": "<p>El ID del rol</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role_name",
            "description": "<p>El nombre del rol</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>El nombre del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.first_name",
            "description": "<p>El nombre de la persona</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.last_name",
            "description": "<p>El apellido dela persona</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.state",
            "description": "<p>El estado del usuario (si está permitido loguearse o no)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>El token</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "expires_in",
            "description": "<p>La expiración del token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>La fecha del token generado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Login successful!\",\n        \"user\": {\n            \"user_id\": 0,\n            \"token_id\": 0,\n            \"role_id\": 0,\n            \"role_name\": 0,\n            \"first_name\": \"xxxxx\",\n            \"last_name\": \"xxxxx\",\n            \"username\": \"xxxx\",\n            \"state\": 1\n        },\n        \"token\": \"xxxxxxx.xxxxxx-xxxxx&xxxxxxx\",\n        \"expireIn\": \"0000000\",\n        \"date\": \"xxxx-xx-xx x:xx:xx\"\n}",
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
            "description": "<p>El nombre del usuario no fue encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDisabled",
            "description": "<p>El usuario ha sido desactivado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotFound: 400",
          "content": "HTTP/1.1 400 Not Found\n{\n        \"ok\": false,\n        \"message\": \"El nombre del usuario o la clave es incorrecta!\"\n}",
          "type": "json"
        },
        {
          "title": "UserDisabled: 403",
          "content": "HTTP/1.1 403 Disabled\n{\n        \"ok\": false,\n        \"message\": \"Usuario desactivado\",\n        \"username\": \"juan\",\n        \"state\": 0\n }",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
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
    "url": "/token/refresh",
    "title": "Refrescar el token",
    "name": "RefrescarToken",
    "group": "Auth",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
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
            "field": "token",
            "description": "<p>El token del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>El ID del usuario</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>El token ya refrescado</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "expires_in",
            "description": "<p>La expiración del token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Token updated\",\n        \"token\": \"xxxxxxx.xxxxxx-xxxxx&xxxxxxx\",\n        \"expires_in\": 3600000\n}",
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
            "field": "JWTNotFound",
            "description": "<p>El 'token' no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"message\": \"El token no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 406",
          "content": "HTTP/1.1 406 JWTNotFound\n{\n        \"ok\": false,\n        \"message\": \"El usuario no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/token.routes.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/quantity/:quantity_id",
    "title": "Actualizar Cantidad",
    "name": "ActualizarQuantity",
    "group": "Cantidad",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quantity_id",
            "description": "<p>El ID de la cantidad (este ID tiene que ir en el URL)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quantity_name",
            "description": "<p>El nombre de la cantidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "short_name",
            "description": "<p>La abreviatura de la cantidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la cantidad (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Cantidad actualizado correctamente\"\n}",
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
            "field": "QuantityExists",
            "description": "<p>Ya existe la cantidad</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "QuantityIDNotFound",
            "description": "<p>El ID de la cantidad no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "QuantityExists: 400",
          "content": "HTTP/1.1 400 Quantity exists\n{\n        \"ok\": false,\n        \"message\": \"La cantidad ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "QuantityIDNotFound: 405",
          "content": "HTTP/1.1 405 Quantity ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID de la cantidad no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/quantity.routes.ts",
    "groupTitle": "Cantidad"
  },
  {
    "type": "post",
    "url": "/quantity/search",
    "title": "Buscador de cantidades",
    "name": "BuscarCantidades",
    "group": "Cantidad",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "query",
            "description": "<p>El nombre de la cantidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la cantidad (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de cantidades</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n         \"ok\": true,\n         \"message\": \"Query successful\",\n         \"result\": [\n             {\n                 \"quantity_id\": 1,\n                 \"quantity_name\": \"Caja\",\n                 \"short_name\": \"\"\n                 \"state\": 1\n             }\n         ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StateNotFound",
            "description": "<p>El 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n         \"ok\": false,\n         \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "StateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n         \"ok\": false,\n         \"message\": \"La variable 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n         \"ok\": false,\n         \"name\": \"TokenExpiredError\",\n         \"message\": \"jwt expired\",\n         \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n         \"ok\": false,\n         \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/quantity.routes.ts",
    "groupTitle": "Cantidad"
  },
  {
    "type": "post",
    "url": "/quantity",
    "title": "Crear cantidad",
    "name": "CrearCantidad",
    "group": "Cantidad",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
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
            "field": "quantity_name",
            "description": "<p>El nombre de la cantidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "short_name",
            "description": "<p>La abreviatura de la cantidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la cantidad (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Cantidad creado correctamente\"\n}",
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
            "field": "QuantityExists",
            "description": "<p>Ya existe la cantidad</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "QuantityExists: 400",
          "content": "HTTP/1.1 406 Quantity exists\n{\n        \"ok\": false,\n        \"message\": \"La cantidad ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/quantity.routes.ts",
    "groupTitle": "Cantidad"
  },
  {
    "type": "delete",
    "url": "/quantity/:quanitity_id",
    "title": "Eliminar Cantidad",
    "name": "EliminarCantidad",
    "group": "Cantidad",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quantity_id",
            "description": "<p>El ID de la cantidad (este ID tiene que ir en el URL)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"La cantidad ha sido eliminado correctamente\"\n}",
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
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "QuantityIDNotFound",
            "description": "<p>El ID de la cantidad no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "QuantityIDNotFound: 405",
          "content": "HTTP/1.1 405 Quantity ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID de la cantidad no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/quantity.routes.ts",
    "groupTitle": "Cantidad"
  },
  {
    "type": "get",
    "url": "/quantity?offset=0&state=1",
    "title": "Obtener todas las cantidades",
    "name": "ObtenerCantidades",
    "group": "Cantidad",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Número de índice</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la cantidad (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de cantidades</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"quantity_id\": 1,\n                \"quantity_name\": \"Caja\",\n                \"short_name\": \"\"\n                \"state\": 1\n            },                \n            {\n                \"quantity_id\": 2,\n                \"quantity_name\": \"Paquete\",\n                \"short_name\": \"paq\"\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OffsetOrStateNotFound",
            "description": "<p>El 'offset' o 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "OffsetOrStateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n        \"ok\": false,\n        \"message\": \"La variable 'offset' y 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/quantity.routes.ts",
    "groupTitle": "Cantidad"
  },
  {
    "type": "put",
    "url": "/category/:category_id",
    "title": "Actualizar Categoría",
    "name": "ActualizarCategoría",
    "group": "Categoría",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "category_id",
            "description": "<p>El ID de la categoría (este ID tiene que ir en el URL)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_name",
            "description": "<p>El nombre de la categoría</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la categoría (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Categoría actualizado correctamente\"\n}",
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
            "field": "CategoryExists",
            "description": "<p>Ya existe la categoría</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CategoyIDNotFound",
            "description": "<p>El ID de la categoría no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "CategoryExists: 400",
          "content": "HTTP/1.1 400 Category exists\n{\n        \"ok\": false,\n        \"message\": \"La categoría ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "CategoryIDNotFound: 405",
          "content": "HTTP/1.1 405 Category ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID de la categoría no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.ts",
    "groupTitle": "Categoría"
  },
  {
    "type": "post",
    "url": "/category/search",
    "title": "Buscador de categorías",
    "name": "BuscarCategorías",
    "group": "Categoría",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "query",
            "description": "<p>El nombre de la categoría</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la categoría (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de categorías</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"category_id\": 1,\n                \"category_name\": \"Leche\",\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StateNotFound",
            "description": "<p>El 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "StateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n        \"ok\": false,\n        \"message\": \"La variable 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.ts",
    "groupTitle": "Categoría"
  },
  {
    "type": "post",
    "url": "/category",
    "title": "Crear categoría",
    "name": "CrearCategoría",
    "group": "Categoría",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
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
            "field": "category_name",
            "description": "<p>El nombre de la categoría</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la categoría (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Categoría creado correctamente\"\n}",
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
            "field": "CategoryExists",
            "description": "<p>Ya existe el nombre de la categoría</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "CategoryExists: 400",
          "content": "HTTP/1.1 406 Category exists\n{\n        \"ok\": false,\n        \"message\": \"La categoría ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.ts",
    "groupTitle": "Categoría"
  },
  {
    "type": "delete",
    "url": "/category/:category_id",
    "title": "Eliminar Categoría",
    "name": "EliminarCategoría",
    "group": "Categoría",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "category_id",
            "description": "<p>El ID de la categoría (este ID tiene que ir en el URL)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"La Categoría ha sido eliminado correctamente\"\n}",
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
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CategoryIDNotFound",
            "description": "<p>El ID de la categoría no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "CategoryIDNotFound: 405",
          "content": "HTTP/1.1 405 Category ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID de la categoría no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.ts",
    "groupTitle": "Categoría"
  },
  {
    "type": "get",
    "url": "/category?offset=0&state=1",
    "title": "Obtener todas las categorías",
    "name": "ObtenerCategorías",
    "group": "Categoría",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Número de índice</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la categoría (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de categorías</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"category_id\": 1,\n                \"category_name\": \"Leche\",\n                \"state\": 1\n            },                \n            {\n                \"category_id\": 2,\n                \"category_name\": \"Envase\",\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OffsetOrStateNotFound",
            "description": "<p>El 'offset' o 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "OffsetOrStateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n        \"ok\": false,\n        \"message\": \"La variable 'offset' y 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.ts",
    "groupTitle": "Categoría"
  },
  {
    "type": "put",
    "url": "/brand/:brand_id",
    "title": "Actualizar Marca",
    "name": "ActualizarMarca",
    "group": "Marca",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "brand_id",
            "description": "<p>El ID de la marca (este ID tiene que ir en el URL)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "brand_name",
            "description": "<p>El nombre de la marca</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la marca (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Marca actualizado correctamente\"\n}",
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
            "field": "BrandExists",
            "description": "<p>Ya existe la marca</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BrandIDNotFound",
            "description": "<p>El ID de la marca no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "BrandExists: 400",
          "content": "HTTP/1.1 400 Brand exists\n{\n        \"ok\": false,\n        \"message\": \"La marca ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "BrandIDNotFound: 405",
          "content": "HTTP/1.1 405 Brand ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID de la marca no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/brand.routes.ts",
    "groupTitle": "Marca"
  },
  {
    "type": "post",
    "url": "/brand/search",
    "title": "Buscador de la marca",
    "name": "BuscarMarcas",
    "group": "Marca",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "query",
            "description": "<p>El nombre de la marca</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la marca (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de marcas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"brand_id\": 1,\n                \"brand_name\": \"Gloria\",\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StateNotFound",
            "description": "<p>El 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "StateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n        \"ok\": false,\n        \"message\": \"La variable 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/brand.routes.ts",
    "groupTitle": "Marca"
  },
  {
    "type": "post",
    "url": "/brand",
    "title": "Crear Marca",
    "name": "CrearMarca",
    "group": "Marca",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
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
            "field": "brand_name",
            "description": "<p>El nombre de la marca</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la marca (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Marca creado correctamente\"\n}",
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
            "field": "BrandExists",
            "description": "<p>Ya existe la marca</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "BrandExists: 400",
          "content": "HTTP/1.1 406 Brand exists\n{\n        \"ok\": false,\n        \"message\": \"La marca ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/brand.routes.ts",
    "groupTitle": "Marca"
  },
  {
    "type": "delete",
    "url": "/brand/:brand_id",
    "title": "Eliminar Marca",
    "name": "EliminarMarca",
    "group": "Marca",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "brand_id",
            "description": "<p>El ID de la marca (este ID tiene que ir en el URL)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"La Marca ha sido eliminado correctamente\"\n}",
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
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BrandIDNotFound",
            "description": "<p>El ID de la marca no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "BrandIDNotFound: 405",
          "content": "HTTP/1.1 405 Brand ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID de la marca no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/brand.routes.ts",
    "groupTitle": "Marca"
  },
  {
    "type": "get",
    "url": "/brand?offset=0&state=1",
    "title": "Obtener todas las marcas",
    "name": "ObtenerMarcas",
    "group": "Marca",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Número de índice</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la marca (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de marcas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"brand_id\": 1,\n                \"brand_name\": \"Gloria\",\n                \"state\": 1\n            },                \n            {\n                \"brand_id\": 2,\n                \"brand_name\": \"Otto kunz\",\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OffsetOrStateNotFound",
            "description": "<p>El 'offset' o 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "OffsetOrStateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n        \"ok\": false,\n        \"message\": \"La variable 'offset' y 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/brand.routes.ts",
    "groupTitle": "Marca"
  },
  {
    "type": "put",
    "url": "/role/:role_id",
    "title": "Actualizar Rol",
    "name": "ActualizarRol",
    "group": "Rol",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>El ID del rol (este ID tiene que ir en el URL)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role_name",
            "description": "<p>El nombre del rol</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado del rol (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Rol actualizado correctamente\"\n}",
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
            "field": "RoleExists",
            "description": "<p>Ya existe el rol</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RoleIDNotFound",
            "description": "<p>El ID del rol no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "RoleExists: 400",
          "content": "HTTP/1.1 400 Role exists\n{\n        \"ok\": false,\n        \"message\": \"El rol ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "RoleIDNotFound: 405",
          "content": "HTTP/1.1 405 Role ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID de la rol no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/role.routes.ts",
    "groupTitle": "Rol"
  },
  {
    "type": "post",
    "url": "/role/search",
    "title": "Buscador de roles",
    "name": "BuscarRoles",
    "group": "Rol",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "query",
            "description": "<p>El nombre del rol</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado del rol (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de roles</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n         \"ok\": true,\n         \"message\": \"Query successful\",\n         \"result\": [\n             {\n                \"role_id\": 1,\n                \"role_name\": \"Administrador\",\n                \"state\": 1\n             }\n         ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StateNotFound",
            "description": "<p>El 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n         \"ok\": false,\n         \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "StateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n         \"ok\": false,\n         \"message\": \"La variable 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n         \"ok\": false,\n         \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/role.routes.ts",
    "groupTitle": "Rol"
  },
  {
    "type": "post",
    "url": "/role",
    "title": "Crear rol",
    "name": "CrearRol",
    "group": "Rol",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
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
            "field": "rol_name",
            "description": "<p>El nombre del rol</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado del rol (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Rol creado correctamente\"\n}",
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
            "field": "RoleExists",
            "description": "<p>Ya existe el rol</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "RoleExists: 400",
          "content": "HTTP/1.1 406 Role exists\n{\n        \"ok\": false,\n        \"message\": \"El rol ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/role.routes.ts",
    "groupTitle": "Rol"
  },
  {
    "type": "delete",
    "url": "/role/:role_id",
    "title": "Eliminar Rol",
    "name": "EliminarRol",
    "group": "Rol",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": "<p>El ID del rol (este ID tiene que ir en el URL)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"El rol ha sido eliminado correctamente\"\n}",
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
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RoleIDNotFound",
            "description": "<p>El ID del rol no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "RoleIDNotFound: 405",
          "content": "HTTP/1.1 405 Role ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID del rol no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/role.routes.ts",
    "groupTitle": "Rol"
  },
  {
    "type": "get",
    "url": "/role?offset=0&state=1",
    "title": "Obtener todos los roles",
    "name": "ObtenerRoles",
    "group": "Rol",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Número de índice</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado del rol (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de roles</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"role_id\": 1,\n                \"role_name\": \"Administrador\",\n                \"state\": 1\n            },                \n            {\n                \"role_id\": 2,\n                \"role_name\": \"Cajero\",\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OffsetOrStateNotFound",
            "description": "<p>El 'offset' o 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "OffsetOrStateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n        \"ok\": false,\n        \"message\": \"La variable 'offset' y 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/role.routes.ts",
    "groupTitle": "Rol"
  },
  {
    "type": "put",
    "url": "/unit/:unit_id",
    "title": "Actualizar Unidad",
    "name": "ActualizarUnidad",
    "group": "Unidad",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "unit_id",
            "description": "<p>El ID de la unidad (este ID tiene que ir en el URL)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "unit_name",
            "description": "<p>El nombre de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "symbol",
            "description": "<p>El símbolo de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la unidad (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Unidad actualizado correctamente\"\n}",
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
            "field": "UnitExists",
            "description": "<p>Ya existe la unidad</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnitIDNotFound",
            "description": "<p>El ID de la unidad no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UnitExists: 400",
          "content": "HTTP/1.1 400 Unit exists\n{\n        \"ok\": false,\n        \"message\": \"La unidad ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "UnitIDNotFound: 405",
          "content": "HTTP/1.1 405 Unit ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID de la unidad no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/unit.routes.ts",
    "groupTitle": "Unidad"
  },
  {
    "type": "post",
    "url": "/unit/search",
    "title": "Buscador de unidades",
    "name": "BuscarUnidades",
    "group": "Unidad",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "query",
            "description": "<p>El nombre de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la unidad (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de unidades</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"unit_id\": 5,\n                \"unit_name\": \"Metros\",\n                \"symbol\": \"m\"\n                \"state\": 1\n            },                \n            {\n                \"unit_id\": 9,\n                \"unit_name\": \"Militros\",\n                \"symbol\": \"ml\"\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StateNotFound",
            "description": "<p>El 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "StateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n        \"ok\": false,\n        \"message\": \"La variable 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/unit.routes.ts",
    "groupTitle": "Unidad"
  },
  {
    "type": "post",
    "url": "/unit",
    "title": "Crear unidad",
    "name": "CrearUnidad",
    "group": "Unidad",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
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
            "field": "unit_name",
            "description": "<p>El nombre de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "symbol",
            "description": "<p>El símbolo de la unidad</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la unidad (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Unidad creado correctamente\"\n}",
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
            "field": "UnitExists",
            "description": "<p>Ya existe la unidad</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UnitExists: 400",
          "content": "HTTP/1.1 406 Unit exists\n{\n        \"ok\": false,\n        \"message\": \"La unidad ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/unit.routes.ts",
    "groupTitle": "Unidad"
  },
  {
    "type": "delete",
    "url": "/unit/:unit_id",
    "title": "Eliminar Unidad",
    "name": "EliminarUnidad",
    "group": "Unidad",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "unit_id",
            "description": "<p>El ID de la unidad (este ID tiene que ir en el URL)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"La unidad ha sido eliminado correctamente\"\n}",
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
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnitIDNotFound",
            "description": "<p>El ID de la unidad no existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "UnitIDNotFound: 405",
          "content": "HTTP/1.1 405 Unit ID Not Found\n{\n        \"ok\": false,\n        \"message\": \"EL ID de la unidad no existe!\",\n}",
          "type": "json"
        },
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Need to update\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/unit.routes.ts",
    "groupTitle": "Unidad"
  },
  {
    "type": "get",
    "url": "/unit?offset=0&state=1",
    "title": "Obtener todas las unidades",
    "name": "ObtenerUnidades",
    "group": "Unidad",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"version\": \"xxxxx\",\n   \"token\": \"xxxx.xxxx.xxxx\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Número de índice</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado de la unidad (0, 1)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "ok",
            "description": "<p>Si la petición ha sido exitosa o no</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del servidor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>La lista de unidades</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"unit_id\": 1,\n                \"unit_name\": \"Litros\",\n                \"symbol\": \"L\"\n                \"state\": 1\n            },                \n            {\n                \"unit_id\": 2,\n                \"unit_name\": \"Kilogramos\",\n                \"symbol\": \"Kg\"\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "AppVersion",
            "description": "<p>Necesita actualizar la aplicación</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OffsetOrStateNotFound",
            "description": "<p>El 'offset' o 'state' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTNotFound",
            "description": "<p>El 'token' no ha sido encontrado</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServeError",
            "description": "<p>Error del servidor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AppVersion: 406",
          "content": "HTTP/1.1 406 Version error\n{\n        \"ok\": false,\n        \"message\": \"Actualiza la apliación\",\n}",
          "type": "json"
        },
        {
          "title": "OffsetOrStateNotFound: 405",
          "content": "HTTP/1.1 405 Not Found\n{\n        \"ok\": false,\n        \"message\": \"La variable 'offset' y 'state' son obligatorio!\"\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "ServeError: 500",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n        \"ok\": false,\n        \"message\": \"Mensaje de error del servidor\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/unit.routes.ts",
    "groupTitle": "Unidad"
  }
] });

define({ "api": [
  {
    "type": "post",
    "url": "/store",
    "title": "Crear almacen",
    "name": "CrearAlmacen",
    "group": "Almacen",
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
            "description": "<p>El nombre del almacen</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>El estado del almacen (0, 1)</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Almacen creado correctamente\"\n}",
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
            "description": "<p>Ya existe el almacen</p>"
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
            "field": "UpdateApp",
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
          "content": "HTTP/1.1 406 Quantity exists\n{\n        \"ok\": false,\n        \"message\": \"El almacen ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "UpdateApp: 406",
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
    "groupTitle": "Almacen"
  },
  {
    "type": "get",
    "url": "/store?offset=0&state=1",
    "title": "Obtener todos los almacenes",
    "name": "ObtenerAlmacenes",
    "group": "Almacen",
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
            "description": "<p>El estado del almacen (0, 1)</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"store_id\": 1,\n                \"store_name\": \"Almacen A\",\n                \"state\": 1\n            },                \n            {\n                \"store_id\": 2,\n                \"store_name\": \"Almacen B\",\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "UpdateApp",
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
    "groupTitle": "Almacen"
  },
  {
    "type": "post",
    "url": "url/auth/signin",
    "title": "Inciar sesión al usuario",
    "name": "IniciarSesión",
    "group": "Auth",
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
            "field": "UpdateApp",
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
          "title": "UpdateApp: 406",
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
            "field": "UnitExists",
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
            "field": "UpdateApp",
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
          "title": "UpdateApp: 406",
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
            "field": "UpdateApp",
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
    "type": "post",
    "url": "/unit",
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
            "field": "unit_name",
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
            "field": "UnitExists",
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
            "field": "UpdateApp",
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
          "content": "HTTP/1.1 406 Unit exists\n{\n        \"ok\": false,\n        \"message\": \"La categoría ya existe!\",\n}",
          "type": "json"
        },
        {
          "title": "JWTNotFound: 401",
          "content": "HTTP/1.1 401 JWTNotFound\n{\n        \"ok\": false,\n        \"name\": \"TokenExpiredError\",\n        \"message\": \"jwt expired\",\n        \"expiredAt\": \"2020-12-26T16:01:48.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "UpdateApp: 406",
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
    "url": "/role?offset=0&state=1",
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
            "field": "UpdateApp",
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
            "field": "UpdateApp",
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
          "title": "UpdateApp: 406",
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
            "field": "UpdateApp",
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
            "field": "UpdateApp",
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
          "title": "UpdateApp: 406",
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
            "field": "UpdateApp",
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
    "type": "get",
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
          "content": "HTTP/1.1 200 OK\n{\n        \"ok\": true,\n        \"message\": \"Query successful\",\n        \"result\": [\n            {\n                \"unit_id\": 1,\n                \"unit_name\": \"Metros\",\n                \"symbol\": \"m\"\n                \"state\": 1\n            },                \n            {\n                \"unit_id\": 2,\n                \"unit_name\": \"Militros\",\n                \"symbol\": \"ml\"\n                \"state\": 1\n            }\n        ]\n}",
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
            "field": "UpdateApp",
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
            "description": "<p>El simbolo de la unidad</p>"
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
            "field": "UpdateApp",
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
          "title": "UpdateApp: 406",
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
            "field": "UpdateApp",
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

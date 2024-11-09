"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const environment_1 = require("../config/environment");
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend Test Case API',
            version: '1.0.0',
            description: 'API documentation',
            contact: {
                name: `dull98's`,
                url: 'https://abdl-portfolio.vercel.app/',
                email: 'abdl.rhohim@gmail.com'
            }
        },
        servers: [
            {
                url: `http://localhost:${environment_1.port}`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        fullname: {
                            type: 'string',
                            description: 'Full name of the user'
                        },
                        email: {
                            type: 'string',
                            description: 'Email of the user'
                        },
                        username: {
                            type: 'string',
                            description: 'Username for the user'
                        },
                        password: {
                            type: 'string',
                            description: 'Password for the user'
                        }
                    },
                    required: ['fullname', 'email', 'username', 'password']
                },
                Login: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'Username for the user'
                        },
                        password: {
                            type: 'string',
                            description: 'Password for the user'
                        }
                    },
                    required: ['username', 'password']
                },
            }
        },
        tags: [
            {
                name: 'User',
                description: 'API for managing users'
            },
            {
                name: 'Login',
                description: 'API for login'
            }
        ],
        paths: {
            '/api/user': {
                post: {
                    summary: 'Create a new User',
                    tags: ['User'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User'
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'User created successfully'
                        },
                        '500': {
                            description: 'Error inserting User'
                        }
                    }
                },
                get: {
                    summary: 'Read all users',
                    tags: ['User'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            in: 'query',
                            name: 'page',
                            schema: {
                                type: 'integer',
                                default: 1
                            },
                            description: 'The page number for pagination (optional)'
                        },
                        {
                            in: 'query',
                            name: 'pageSize',
                            schema: {
                                type: 'integer',
                                default: 15
                            },
                            description: 'The number of users to return per page (optional)'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'A list of all users',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/User'
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Internal server error'
                        }
                    }
                },
                delete: {
                    summary: 'Delete all users',
                    tags: ['User'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'All users deleted successfully'
                        },
                        '500': {
                            description: 'Internal server error'
                        }
                    }
                }
            },
            '/api/user/{id}': {
                get: {
                    summary: 'Read user by ID',
                    tags: ['User'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID of the user to retrieve'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'User details retrieved successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/User'
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'User not found'
                        },
                        '500': {
                            description: 'Internal server error'
                        }
                    }
                },
                put: {
                    summary: 'Update user by ID',
                    tags: ['User'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID of the user to update'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User'
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'User updated successfully'
                        },
                        '400': {
                            description: 'Invalid input'
                        },
                        '404': {
                            description: 'User not found'
                        },
                        '500': {
                            description: 'Internal server error'
                        }
                    }
                },
                delete: {
                    summary: 'Delete user by ID',
                    tags: ['User'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            description: 'ID of the user to delete'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'User deleted successfully'
                        },
                        '404': {
                            description: 'User not found'
                        },
                        '500': {
                            description: 'Internal server error'
                        }
                    }
                }
            },
            '/api/login': {
                post: {
                    summary: 'For login User',
                    tags: ['Login'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Login'
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Login successfully'
                        },
                        '500': {
                            description: 'Error login User'
                        }
                    }
                },
            },
            '/api/logout': {
                post: {
                    summary: 'Logout User',
                    tags: ['Login'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'User logged out successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Logout successful'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Token is required'
                        },
                        '500': {
                            description: 'Error during logout'
                        }
                    }
                }
            },
            '/api/token-test': {
                get: {
                    summary: 'Test token authentication',
                    tags: ['Login'],
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Token is valid',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Token is valid'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'Unauthorized: Invalid or expired token'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.ts']
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerDocs;
//# sourceMappingURL=swaggerRoute.js.map
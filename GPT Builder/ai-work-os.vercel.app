{
  "openapi": "3.1.0",
  "info": {
    "title": "AI Work OS API",
    "version": "1.0.0",
    "description": "AI Work OS の Todoist 登録・一覧取得・更新・完了 API"
  },
  "servers": [
    {
      "url": "https://ai-work-os.vercel.app"
    }
  ],
  "paths": {
    "/api/task": {
      "post": {
        "operationId": "createTask",
        "summary": "Todoist にタスクを登録する",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "due_string": {
                    "type": "string"
                  },
                  "labels": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                },
                "required": ["title"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "タスク登録成功"
          }
        }
      }
    },
    "/api/tasks": {
      "get": {
        "operationId": "listTasks",
        "summary": "Todoist のタスク一覧を取得する",
        "parameters": [
          {
            "name": "filter",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "project_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "section_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "label_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "cursor",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "タスク一覧取得成功"
          }
        }
      }
    },
    "/api/task-update": {
      "post": {
        "operationId": "updateTask",
        "summary": "Todoist の既存タスクを更新する",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "task_id": {
                    "type": "string"
                  },
                  "content": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "labels": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "priority": {
                    "type": "integer"
                  },
                  "due_string": {
                    "type": "string"
                  },
                  "lang": {
                    "type": "string"
                  },
                  "due": {
                    "type": "object"
                  },
                  "deadline": {
                    "type": "object"
                  }
                },
                "required": ["task_id"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "タスク更新成功"
          }
        }
      }
    },
    "/api/task-close": {
      "post": {
        "operationId": "closeTask",
        "summary": "Todoist の既存タスクを完了にする",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "task_id": {
                    "type": "string"
                  }
                },
                "required": ["task_id"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "タスク完了成功"
          }
        }
      }
    }
  }
}

| Description   | Interface        | Method | url params      | Note                              |
| ------------- | ---------------- | ------ | --------------- | --------------------------------- |
| Get blog list | /api/blog/list   | get    | author, keyword | Get all when params is empty      |
| Get a blog    | /api/blog/detail | get    | id              |                                   |
| Create a blog | /api/blog/new    | post   |                 | blog content send by post data    |
| Update a blog | /api/blog/update | post   | id              | updated content send by post data |
| Delete a blog | /api/blog/del    | post   | id              |                                   |
| Login         | /api/user/login  | post   |                 | username & password in post data  |

### User Table

| column   | datatype    | pk 主键 | nn 不为空 | AI 自增长 | Default |
| -------- | ----------- | ------- | --------- | --------- | ------- |
| id       | int         | Y       | Y         | Y         |         |
| username | varchat(20) |         | Y         |           |         |
| password | varchat(20) |         | Y         |           |         |
| realname | varchat(20) |         | Y         |           |         |

### Blog Table

| column     | datatype    | pk 主键 | nn 不为空 | AI 自增长 | Default |
| ---------- | ----------- | ------- | --------- | --------- | ------- |
| id         | int         | Y       | Y         | Y         |         |
| title      | varchat(50) |         | Y         |           |         |
| content    | longtext    |         | Y         |           |         |
| createtime | bigint(20)  |         | Y         |           | 0       |
| author     | varchat(20) |         | Y         |           |         |

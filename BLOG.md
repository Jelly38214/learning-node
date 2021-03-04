| Description   | Interface        | Method | url params      | Note                              |
| ------------- | ---------------- | ------ | --------------- | --------------------------------- |
| Get blog list | /api/blog/list   | get    | author, keyword | Get all when params is empty      |
| Get a blog    | /api/blog/detail | get    | id              |                                   |
| Create a blog | /api/blog/new    | post   |                 | blog content send by post data    |
| Update a blog | /api/blog/update | post   | id              | updated content send by post data |
| Delete a blog | /api/blog/del    | post   | id              |                                   |
| Login         | /api/user/login  | post   |                 | username & password in post data  |

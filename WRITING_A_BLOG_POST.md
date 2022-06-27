### Writing a Blog Post

In order to publish a new blog post, make sure that you added yourself into `src/data/blog/authors.yaml`. That is the GraphQL schema for all the Blog Posts of the Node.js Website Blog.

The current schema supports the following fields:

| Field   | Description                                                                                          | Required |
| ------- | ---------------------------------------------------------------------------------------------------- | -------- |
| id      | Your unique id. In preference it should be your GitHub Username as we resolve the images from there. | Yes      |
| name    | Your display name. It could be your full name.                                                       | Yes      |
| website | A link to open when someone wants to get to know more about you                                      | No       |
| bio     | A short bio about you when people are looking all the posts that you've published before.            | No       |

All the blog posts should be written inside `content/blog` as only the Markdown files created there will be considered as blog posts. The blog posts support the full MDX (Markdown Extended) syntax.

Every Blog Post should follow the following template:

```markdown
---
title: Your Blog Post Title
blogAuthors: ["your-blog-authors-id", ...]
category: "your blog category"
---

Your Markdown Content
```

* It is important to mention that category is an optional field. Currently only one category is supported. Multiple authors are supported.
* The name of you blog post should follow the following format `YYYY-MM-DD-your-blog-post-title.md`.
* When you publish a new blog post, it will be automatically added to the blog posts list. So be mindful when creating a Pull Request.
* Blog Posts categories are optional. But when provided the category should exist inside `src/data/blog/categories.yaml` otherwise it will fallback to the "name" of the category.
* If the author id doesn't exist within `src/data/blog/authors.yaml` it will fallback to `Unknown`.

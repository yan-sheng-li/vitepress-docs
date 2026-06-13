# Hermes实践零碎

[官方文档](https://hermes-agent.nousresearch.com/docs/zh-Hans/)

## mcp

```yaml
mcp_servers:
  edgeone-pages:
    enabled: true
    headers:
      Authorization: Bearer ms-6321187e-4961-4c9b
    url: https://mcp.api-inference.modelscope.net/f3167719a63846/mcp

  gitee:
    enabled: true
    headers:
      Authorization: Bearer eb8641f0
    url: https://api.gitee.com/mcp

  github:
    args:
      - -y
      - '@modelcontextprotocol/server-github'
    command: npx
    enabled: false
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: ghp_iDjlOXu

  mysql:
    args: []
    command: mcp-server-mysql
    enabled: true
    env:
      ALLOW_DDL_OPERATION: 'true'
      ALLOW_DELETE_OPERATION: 'true'
      ALLOW_INSERT_OPERATION: 'true'
      ALLOW_UPDATE_OPERATION: 'true'
      MYSQL_DB: null
      MYSQL_HOST: xx
      MYSQL_PASS: xx
      MYSQL_PORT: '3306'
      MYSQL_USER: root
```

## skill

### [生图-agnes-image]()



## [分身创建](https://hermes-agent.nousresearch.com/docs/zh-Hans/user-guide/profiles)

[别名参考](https://hermes-agent.nousresearch.com/docs/zh-Hans/reference/profile-commands#hermes-profile-alias)

# Upsun CLI action

This action install CLI and interact with upsun project, so your workflow can access it.

# What's new

Please refer to the [release page](https://github.com/upsun/action-cli/releases/latest) for the latest release notes.

# Usage

```yaml
uses: upsun/action-cli@v1
with:
    # Name of CLI provider.
    # Default: 'upsun'
    cli_provider: 'upsun'

    # Force CLI version to use.
    # Default: '' (latest)
    cli_version: ''

    # Token for authentication.
    # You can get from [Upsun Documentation](https://docs.upsun.com/administration/cli/api-tokens.html)
    # We recommand to use secret variable to store the token. [more info](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
    #
    # Required for use command.
    cli_token: "${{ secrets.TOKEN_UPSUN }}"

    # Upsun project ID.
    #
    # Required for some commands.
    # Default: ''
    project_id: "${{ vars.PROJECT_ID }}"

    # Upsun environement name.
    #
    # Required for some commands.
    # Default: ''
    environment_name: ''

    # Command to execute on CLI.
    # Default: ''
    command: ''
```

# Scenarios

- [Install CLI latest version](#Install_CLI_latest_version)
- [Install CLI specific version](#Install_CLI_specific_version)
- [Install CLI specific provider](#Install_CLI_specific_provider)
- [Install CLI specific provider/version](#Install_CLI_specific_provider/version)
- [Run get route command](#Run_get_route_command)


## Install CLI latest version

```yaml
- uses: upsun/action-cli@v1
```

## Install CLI specific version

```yaml
- uses: upsun/action-cli@v1
  with:
    cli_version: '5.0.23'
```

## Install CLI specific provider

```yaml
- uses: upsun/action-cli@v1
  with:
    cli_provider: 'platform'
```

## Install CLI specific provider/version

```yaml
- uses: upsun/action-cli@v1
  with:
    cli_provider: 'platform'
    cli_version: '5.0.23'
```

## Run get route command

```yaml
- uses: upsun/action-cli@v1
  with:
    cli_token: "${{ secrets.TOKEN_UPSUN }}"
    project_id: "${{ vars.PROJECT_ID }}"
    environment_name: 'main'
    command: route:list
```
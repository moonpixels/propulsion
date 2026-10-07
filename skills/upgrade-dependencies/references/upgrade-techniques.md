# Upgrade techniques

These examples illustrate the method in [the skill](../SKILL.md). Versions and placeholders are illustrative. Consult current official documentation and the installed CLI before adapting commands.

## Target the researched version

A general update may stay inside existing ranges. For example, `npm update` cannot migrate `^2.0.0` to major 3. Use a targeted install after researching that migration. Preserve the original dependency group and range style.

```sh
# Illustrative npm production dependency with a caret range.
npm install --save-prod 'library@^3.2.1'

# Illustrative npm development dependency with an exact pin.
npm install --save-dev --save-exact 'build-tool@4.1.2'
```

[npm update](https://docs.npmjs.com/cli/commands/npm-update/) also has different manifest-saving defaults from [npm install](https://docs.npmjs.com/cli/commands/npm-install/). Check both the declaration and resolved version. Use the existing manager's equivalent command rather than introducing npm into another ecosystem.

## Upgrade a coupled set

Suppose a framework major needs a matching renderer, plugin, and type package. Research their compatibility together and treat the set plus its required migrations as one batch. A successful package installation does not prove the application's rendering still works.

Use the framework's migration CLI where provided. [Angular's `ng update`](https://angular.dev/cli/update) and [update guide](https://angular.dev/update-guide) illustrate explicit major targets and automated migrations. Apply the guide to the project's actual starting version and usage. Review transformed files and exercise affected behaviour before advancing.

## Respect runtime constraints

Suppose a package's latest major needs Node 20 but the project must remain on Node 18. Confirm that requirement from release metadata. Select the newest supported package version compatible with the fixed runtime, or explain that no safe target exists. Report the blocked latest major and any runtime support limitation. A newer Node on the agent's machine does not establish Node 18 compatibility.

For requested runtime upgrades, check the current [Node release policy](https://nodejs.org/en/about/previous-releases) or the language's own support policy. [PHP](https://www.php.net/supported-versions.php) uses active and security support periods rather than an LTS designation. Include extensions, native modules, base-image variants, and deployment support in the compatibility check.

[Composer](https://getcomposer.org/doc/03-cli.md) provides `why-not` for blockers and `check-platform-reqs` for the real PHP and extensions. Its configured platform can differ from the machine running validation.

## Restore a failed batch

Before mutation, save the relevant files' current contents, including existing user edits. If a batch fails, use the failure to identify a missing migration or incompatibility. Repair it and rerun checks, or restore only that batch's changes and reinstall from its previous lockfile. Inspect the resulting files before another batch.

For reproducibility, use the manager's locked-install mechanism. [npm ci](https://docs.npmjs.com/cli/commands/npm-ci/) checks manifest and lockfile agreement and replaces the installation. Run it in an appropriate environment for the project. Preserve previous successful batches and unrelated work when restoring.

# Flix Highlight.js Language Spec

This is the official repository for the Flix language specification
for [highlight.js](https://highlightjs.org/).

## Table of contents
- [Build](#Build)
- [Use](#Use)

## Build

### Using GitHub workflow

If you fork this repository there is a GitHub workflow
that on each push will automatically build a minimal
highlight.js file that only supports Flix for the web.

Additionally, it also generates a Flix spec that can be appended
to an existing highlight.js file.

The GitHub workflow always targets the latest release of
highlight.js

### Manual installation

We refer you to
[the official documentation for 3rd party grammars for highlight.js](https://GitHub.com/highlightjs/highlight.js/blob/main/extra/3RD_PARTY_QUICK_START.md#testing)
(read Testing & Packaging sections).

## Use

### Pre-built CDN files

There are pre-built CDN files that can just be dropped in to work with
an existing highlight.js script.
These can be found in the `dist/` directory of this repository.

Note that the `dist/highlight.min.js` file is the file
built by the GitHub workflow in this repository and is a minimal
highlight.js build that only supports Flix.
This file is **NOT** part of the CDN pre-built files and should
hence not but used if you intend to use highlight.js conventionally.

### Using GitHub workflow

The highlight.js file built by the GitHub workflow
should work automatically when included on a website.

### Custom styling

We use mdBook for [doc.flix.dev](https://doc.flix.dev/) which
has some custom styling rules (see [css files](https://github.com/flix/book/tree/master/theme))
This is to properly highlight string interpolation among
other things.

| Selector      | Description                                |
|---------------|--------------------------------------------|
| `.hljs-subst` | Used for highlighting string interpolation |
| `.hljs-meta`  | Used for highlighting annotations          |

## Pull Requests

If you open a pull request, you must also include the updated files required for the `dist/`
directory.
This can easily be done with the GitHub action in this repository.

1. Once you have submitted your PR, navigate to your fork and select the branch for which you
have a PR open.
A GitHub action should have run.

2. Navigate to the summary of that action and download both the `flix.cdn.dist` and
`highlight.min.js` files.
We recommended you check the `sha256sum` of the downloaded files against the sha256 sums on GitHub.

3. First, unzip `highlight.min.js.zip` and move the `highlight.min.js` file to `dist/`, replacing
the current copy.

4. Then unzip `flix.cdn.dist` and move `flix.es.min.js` and `flix.min.js` to `dist/`, replacing
the current copies.

5. Commit these files in `dist/` and push them to the PR.

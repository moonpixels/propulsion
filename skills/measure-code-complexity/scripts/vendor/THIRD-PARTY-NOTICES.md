# Third-Party Notices

The measurement script uses these bundled releases:

- cccc 1.7.0, under the MIT [licence](cccc/LICENSE). Unmodified release archives cover macOS and Linux ARM64/x64 and Windows x64. `cccc/manifest.json` records archive and extracted executable SHA-256 values. The helper selects the host archive, verifies it and caches only its executable in the system temporary directory. No installation or runtime download occurs. Release archives retain upstream README and licence notices. Source and release provenance are recorded in the refactor research report outside this runtime bundle.

- Lizard 1.24.0, checksum `a688bc607a891ff4a7836826f25742dc9c1bf648da3075dbd495e199e8848602`. Retain its [license](licenses/lizard/LICENSE.txt) and the [Apache License 2.0](licenses/lizard/APACHE-2.0.txt) referenced by licensed source headers.
- Pygments 2.19.2, checksum `86540386c03d588bb81d44bc3928634ff26449851e99741617ecb9037ee5ec0b`. Retain its [license](licenses/pygments/LICENSE) and [authors](licenses/pygments/AUTHORS).

These releases remain subject to their included upstream notices and disclaimers.

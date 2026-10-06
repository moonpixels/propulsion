"""Select and verify the bundled cccc release. Cache only the executable outside the repository."""

import getpass
import hashlib
import json
import os
from pathlib import Path
import platform
import tarfile
import tempfile
import zipfile

BUNDLE = Path(__file__).resolve().parent / "vendor" / "cccc"
TARGETS = {
    ("Darwin", "arm64"): "aarch64-apple-darwin",
    ("Darwin", "x86_64"): "x86_64-apple-darwin",
    ("Linux", "arm64"): "aarch64-unknown-linux-musl",
    ("Linux", "x86_64"): "x86_64-unknown-linux-musl",
    ("Windows", "x86_64"): "x86_64-pc-windows-msvc",
}


def target(system=None, machine=None):
    system = system or platform.system()
    machine = (machine or platform.machine()).lower()
    machine = {"aarch64": "arm64", "amd64": "x86_64"}.get(machine, machine)
    if (system, machine) not in TARGETS:
        raise ValueError(f"No bundled binary for {system} {machine}. Supported: macOS/Linux ARM64 or x64, Windows x64.")
    return TARGETS[system, machine]


def executable():
    spec = json.loads((BUNDLE / "manifest.json").read_text())["targets"][target()]
    archive = BUNDLE / spec["archive"]
    if hashlib.sha256(archive.read_bytes()).hexdigest() != spec["archive_sha256"]:
        raise ValueError(f"Bundled archive checksum mismatch: {archive.name}")
    user = str(os.getuid()) if hasattr(os, "getuid") else hashlib.sha256(getpass.getuser().encode()).hexdigest()[:16]
    cache = Path(tempfile.gettempdir()) / f"propulsion-cccc-{user}"
    if cache.is_symlink():
        raise ValueError(f"Expected a regular cache directory: {cache}")
    cache.mkdir(mode=0o700, exist_ok=True)
    if hasattr(os, "getuid") and cache.stat().st_uid != os.getuid():
        raise ValueError(f"Cache directory belongs to another user: {cache}")
    binary = cache / (spec["binary_sha256"] + Path(spec["member"]).suffix)
    if binary.is_symlink():
        raise ValueError(f"Expected a regular cached executable: {binary}")
    if binary.exists():
        if hashlib.sha256(binary.read_bytes()).hexdigest() != spec["binary_sha256"]:
            raise ValueError(f"Cached executable checksum mismatch. Remove {binary} and rerun.")
        return str(binary)
    if archive.suffix == ".zip":
        with zipfile.ZipFile(archive) as package:
            data = package.read(spec["member"])
    else:
        with tarfile.open(archive) as package:
            data = package.extractfile(spec["member"]).read()
    if hashlib.sha256(data).hexdigest() != spec["binary_sha256"]:
        raise ValueError(f"Bundled executable checksum mismatch: {archive.name}")
    descriptor, temporary = tempfile.mkstemp(dir=cache)
    try:
        with os.fdopen(descriptor, "wb") as stream:
            stream.write(data)
        os.chmod(temporary, 0o755)
        os.replace(temporary, binary)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)
    return str(binary)

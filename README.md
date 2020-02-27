# 202002.dockerized-webapp-project

![GitHub Actions status for "test-all-services"](https://github.com/mazgi-showcase/202002.dockerized-webapp-project/workflows/test-all-services/badge.svg)

## Prepare

1. Download cargo-make

Linux:

```shellsession
export CARGO_MAKE_VERSION="0.26.1" \
&& curl -sL https://github.com/sagiegurari/cargo-make/releases/download/${CARGO_MAKE_VERSION}/cargo-make-v${CARGO_MAKE_VERSION}-x86_64-unknown-linux-musl.zip \
| busybox unzip -p - cargo-make-v${CARGO_MAKE_VERSION}-x86_64-unknown-linux-musl/cargo-make > bin/cargo-make && chmod a+x bin/cargo-make
```

macOS:

```shellsession
export CARGO_MAKE_VERSION="0.26.1" \
&& curl -sL https://github.com/sagiegurari/cargo-make/releases/download/${CARGO_MAKE_VERSION}/cargo-make-v${CARGO_MAKE_VERSION}-x86_64-apple-darwin.zip \
| bsdtar --strip-components 1 -C bin/ -xvf - cargo-make-v${CARGO_MAKE_VERSION}-x86_64-apple-darwin/cargo-make
```

2. Set up the project via cargo-make you downloaded.

```shellsession
bin/cargo-make make --makefile tasks/setup-project.toml
```

3. Place GCP service account key file.

Place the service account key file as `config/credentials/google-cloud-keyfile.json`

4. Up the Docker Compose once.

This step is needed to activate the GCP service account.

```shellsession
docker-compose up
```

## How to build & publish the Docker Images

Run `cargo-make` to build and push docker images.

```shellsession
bin/cargo-make make --makefile tasks/build-and-push-images.toml
```

## Appendix

You can check the GCP service account that activated as below.

```shellsession
gcloud iam service-accounts list
```

If you are a user of 1Password, you can get the GCP service account key file that below step.

```shellsession
eval $(op signin my)
op get document your-service-account@your-gcp-project.iam.gserviceaccount.com > config/credentials/google-cloud-keyfile.json
```

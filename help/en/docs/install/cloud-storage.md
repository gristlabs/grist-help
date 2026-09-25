---
title: Cloud storage
---

Cloud Storage {: .tag-core .tag-ee }
=============

This feature allows automatic syncing of Grist documents and document
versions to S3-compatible stores such as RustFS (or AWS S3 itself).

The full edition of Grist has native support for Azure storage accounts, and
for AWS S3 using AWS's official client.

It is advisable to have [Redis enabled](../self-managed.md#what-is-a-state-store) when using cloud storage, since this is the best-tested configuration.

Enabling snapshotting results in a big change in how documents are stored, and is best done prior to creating documents. Back up your work before changing this configuration.

S3-compatible stores via MinIO client {: .tag-core .tag-ee }
-----

Turn this on by setting the following environment variables:

  * Set `GRIST_DOCS_S3_ACCESS_KEY` and `GRIST_DOCS_S3_SECRET_KEY`.
  * Set `GRIST_DOCS_S3_BUCKET` to the name of a versioned bucket you have created. It is important that the bucket have versioning enabled.
  * Set `GRIST_DOCS_S3_ENDPOINT` to the appropriate hostname - no protocol, no port.
  * (Optional) Set `GRIST_DOCS_S3_USE_SSL` to `1` to use `https` protocol (default) or `0` for `http`.
  * (Optional) Set `GRIST_DOCS_S3_PORT` to the port to use, if the default for the protocol (80/443) isn't right.
  * (Optional) Set `GRIST_DOCS_S3_PREFIX` to the prefix for your documents, defaults to "docs/".
  * (Optional) Set `GRIST_DOCS_S3_BUCKET_REGION` to the region for your bucket, defaults to "us-east-1".

Older versions of Grist name these settings `GRIST_DOCS_MINIO_*`
instead, as in `GRIST_DOCS_MINIO_BUCKET`. Those names still work.

If using AWS S3, the endpoint to use is `s3.amazonaws.com`, and
there's no need to set a port number or SSL flag. The access and
secret keys are your `AWS_ACCESS_KEY_ID` and
`AWS_SECRET_ACCESS_KEY`. Make sure to create a versioned bucket in
advance.

### Choosing an S3-compatible store

Grist keeps a document's history as versions of an object in the bucket.
That's why the bucket needs versioning turned on, and it means the store
has to support versioning in the first place. Not all S3-compatible stores
do. Garage and Cloudflare R2 are two popular ones that won't work with
Grist.

When Grist starts up, it checks that the bucket has versioning turned on.
If it doesn't, Grist stops with an error saying so.

We've tested Grist with these stores:

  * [AWS S3](https://aws.amazon.com/s3/) itself.
  * [RustFS](https://rustfs.com/) is an open-source S3 server. Our
    [docker-compose example](https://github.com/gristlabs/grist-core/tree/main/docker-compose-examples/grist-with-keycloak-postgres-redis-rustfs)
    uses it.
  * [MinIO](https://github.com/minio/minio). Its open-source edition is no
    longer maintained.
  * [Silo](https://github.com/pgsty/minio) is a community-maintained fork
    of MinIO. If you already run MinIO, you can switch by changing
    `minio/minio` to `pgsty/silo` in your setup. It uses the same settings
    and reads MinIO's existing data as is.
  * [Versity Gateway](https://github.com/versity/versitygw) is good for
    testing. It serves S3 from an ordinary directory, so the latest version
    of each document sits on disk as a plain file (start it with
    `--versioning-dir` to keep older versions too). Its data directory needs
    a filesystem that supports extended attributes. At the time of writing,
    it doesn't support lifecycle rules, so the
    [recommended rule](#usage-once-configured) for pruning old versions
    can't be set up there.

Whichever store you pick, you can create the bucket and turn on versioning
with the [AWS command line tool](https://aws.amazon.com/cli/), which works
with any S3-compatible store. Point it at your store with
`AWS_ENDPOINT_URL`:

```sh
export AWS_ENDPOINT_URL=http://<host>:<port>
export AWS_ACCESS_KEY_ID=<access key>
export AWS_SECRET_ACCESS_KEY=<secret key>
export AWS_DEFAULT_REGION=us-east-1
aws s3api create-bucket --bucket grist-docs
aws s3api put-bucket-versioning --bucket grist-docs \
  --versioning-configuration Status=Enabled
```

Azure {: .tag-ee }
-----

For Azure:

  * Create a storage account in the Azure portal.
  * For the storage account’s blob service, make sure that versioning is enabled.
  * Get a connection string from the storage account’s Access Keys section. It may look something like `DefaultEndpointsProtocol=https;AccountName=...`.
  * Place the connection string in an environment variable called `AZURE_STORAGE_CONNECTION_STRING`. 
  * Set the name of an Azure storage container in an environment variable called `GRIST_AZURE_CONTAINER`. An example of a container name is `my-grist-docs`.
  * Set a prefix such as `v1/` in an environment variable called `GRIST_AZURE_PREFIX`.

S3 with native AWS client {: .tag-ee}
-----

For S3:

  * Set the name of the S3 bucket in an environment variable called `GRIST_DOCS_S3_BUCKET`. An example of a bucket name is `my-grist-docs`.
  * Set a prefix such as `v1/` in an environment variable called `GRIST_DOCS_S3_PREFIX`.
  * Leave `GRIST_DOCS_S3_ENDPOINT` unset. If it is set, Grist uses the [MinIO client](#s3-compatible-stores-via-minio-client) instead.
  * Arrange for access using AWS's many options; if nothing else, you can set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` variables.

Usage once configured {: .tag-core .tag-ee}
-----

Once the external storage configuration is in place, start Grist as normal
for self-managed Grist. If you start it with `DEBUG=1` set, you'll see a
line like this among the settings Grist prints at startup:

`info: == grist.externalStorage.[s3|azure|minio].active: true`

All documents will be read from and saved to the corresponding S3 bucket or
Azure container. Configuration is simplest on a fresh Grist install
without any preexisting Grist documents.

Once up and running, it is a good idea to configure the storage
account's "lifecycle management" to place any bounds you want on how
long versions are retained.

We recommend configuring a lifecycle rule to delete noncurrent versions
of objects with the prefix `${PREFIX}/assets/unversioned/`
(e.g. `v1/assets/unversioned/`) daily. This ensures that older versions of
snapshot metadata are pruned regularly.

You can control the frequency of snapshots with the following environment variables:

  * `GRIST_SNAPSHOT_TIME_CAP` - JSON string specifying the maximum number of backups to keep
  for each time period (e.g. hourly, daily, weekly). For example, a value of
  `{"hour": 24, "day": 30, "isoWeek": 52, "month": 24, "year": 5}` will keep the most recent
  backup for every hour (for the last 24 hours), day (for the last 30 days), etc.
  Any previous backups falling outside these windows will be deleted as needed to make room
  for newer backups. If unset, `{"hour": 25, "day": 32, "isoWeek": 12, "month": 96, "year": 1000}`
  will be used as the default.
    * `hour` - The last N hours to keep the most recent snapshot for.
    * `day` - The last N days to keep the most recent snapshot for.
    * `isoWeek` - The last N weeks to keep the most recent snapshot for.
    * `month` - The last N months to keep the most recent snapshot for.
    * `year` - The last N years to keep the most recent snapshot for.
  * `GRIST_SNAPSHOT_KEEP` - Minimum number of recent snapshots to keep, regardless of
  `GRIST_SNAPSHOT_TIME_CAP`. (Default: 5)

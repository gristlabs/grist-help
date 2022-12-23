Cloud Storage {: .tag-core .tag-ee }
=============

This feature allows automatic syncing of Grist documents and document
versions to S3-compatible stores such as MinIO (or AWS S3 itself).

Grist Enterprise has native support for Azure storage accounts, and
for AWS S3 using AWS's official client.

It is advisable to have [Redis enabled](../self-managed.md#what-is-a-state-store) when using cloud storage, since this is the best-tested configuration.

Enabling snapshotting results in a big change in how documents are stored, and is best done prior to creating documents. Back up your work before changing this configuration.

S3-compatible stores via MinIO client {: .tag-core .tag-ee }
-----

Turn this on by setting the following environment variables:

  * Set `GRIST_DOCS_MINIO_ACCESS_KEY` and `GRIST_DOCS_MINIO_SECRET_KEY`.
  * Set `GRIST_DOCS_MINIO_BUCKET` to the name of a versioned bucket you have created. It is important that the bucket have versioning enabled.
  * Set `GRIST_DOCS_MINIO_ENDPOINT` to the appropriate hostname - no protocol, no port.
  * (Optional) Set `GRIST_DOCS_MINIO_USE_SSL` to `1` to use `https` protocol (default) or `0` for `http`.
  * (Optional) Set `GRIST_DOCS_MINIO_PORT` to the port to use, if the default for the protocol (80/443) isn't right.

If using AWS S3, the endpoint to use is `s3.amazonaws.com`, and
there's no need to set a port number or SSL flag. The access and
secret keys are your `AWS_ACCESS_KEY_ID` and
`AWS_SECRET_ACCESS_KEY`. Make sure to create a versioned bucket in
advance.

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
  * Arrange for access using AWS's many options; if nothing else, you can set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` variables.

Usage once configured {: .tag-core .tag-ee}
-----

Once the external storage configuration is in place, start Grist as normal
for self-managed Grist. Upon startup, there should be a line like:

`info: == grist.externalStorage.[s3|azure|minio].active: true`

All documents will be read from and saved to the corresponding S3 bucket or
Azure container. Configuration is simplest on a fresh Grist install
without any preexisting Grist documents.

Once up and running, it is a good idea to configure the storage
account's "lifecycle management" to place any bounds you want on how
long versions are retained. Grist has no requirements here, this is
strictly to your taste.

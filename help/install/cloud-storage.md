Cloud Storage {: .tag-ee }
=============

This feature allows automatic syncing of Grist documents and document
versions to an S3 or Azure storage account. It is not currently available
in Grist Core.

For Azure:

  * Create a storage account in the Azure portal.
  * For the storage account’s blob service, make sure that versioning is enabled.
  * Get a connection string from the storage account’s Access Keys section. It may look something like `DefaultEndpointsProtocol=https;AccountName=...`.
  * Place the connection string in an environment variable called `AZURE_STORAGE_CONNECTION_STRING`. 
  * set the name of an Azure storage container in an environment variable called `GRIST_AZURE_CONTAINER`. An example of a container name is `my-grist-docs`.
  * Set a prefix such as `v1/` in an environment variable called `GRIST_AZURE_PREFIX`.

For S3:

  * Set the name of the S3 bucket in an environment variable called `GRIST_DOCS_S3_BUCKET`. An example of a bucket name is `my-grist-docs`.
  * Set a prefix such as `v1/` in an environment variable called `GRIST_DOCS_S3_PREFIX`.

Once the Azure or S3 configuration is in place, start Grist as normal
for self-managed Grist. Upon startup, there should be a line like:

`info: == grist.externalStorage.s3.url: s3://my-grist-docs/v1/`

or

`info: == grist.externalStorage.azure.url: azure://my-grist-docs/v1/`

All documents will be read from and saved to the corresponding S3 or
Azure container. Configuration is simplest on a fresh Grist install
without any preexisting Grist documents.

Once up and running, it is a good idea to configure the storage
account's "lifecycle management" to place any bounds you want on how
long versions are retained. Grist has no requirements here, this is
strictly to your taste.


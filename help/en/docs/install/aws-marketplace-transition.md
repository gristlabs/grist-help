Transitioning to Grist Builder Edition {: .tag-core .tag-ee }
=============

Grist Builder Edition supersedes the AWS Marketplace offer based on
Omnibus.

# Transitioning Grist documents

It is possible to copy your Grist documents to Builder Edition.

1. Take note of the `EMAIL` variable under `~/grist/gristParameters`.
2. Start [a Grist Builder Edition instance](../aws-marketplace).
3. Follow [the instructions to run the bootstrap
   script](https://github.com/gristlabs/grist-pack/tree/main/dist#quickstart),
   using the value of `EMAIL` for the `DEFAULT_EMAIL` value. See
   [here](../../self-managed#what-is-the-administrative-account) for
   more details pertaining to this variable.
   
   You do not need to run `docker compose up`, but it can be helpful
   to verify your configuration before proceeding.

By default this should create an empty directory at
`/home/grist/persist/grist` in the Grist Builder Edition EC2 instance.
The following files from the Omnibus offer should be copied over into
this directory:

* `~/grist-persist/home.sqlite3`
* The entire `~/grist-persist/docs` directory

Also see ["What files does Grist
store?"](../../self-managed#what-files-does-grist-store) for an
explanation of what these files are.

There are a couple of standard methods to copy files across EC2
instances.

## EBS Volume

You may [use a multi-attach EBS
volume](https://docs.aws.amazon.com/ebs/latest/userguide/working-with-multi-attach.html).
With this method, you mount the volume to both machine images and use
it to store or copy the files across instances. Ideally, you may mount
the EBS volume at `/home/grist/persist/grist` in the target EC2
instance.

## `scp`

The traditional method to copy files across instances is `scp`, a file
transfer mechanism over the SSH protocol. A small complication is that
the user to copy to, `grist` in the target EC2 instance, by default
does not have an SSH login enabled. We recommend copying into the default
`ubuntu` user, log in to the Grist Builder Edition EC2 instance, and
then moving the files over from the `ubuntu` user into the `grist`
user at the `persist` location. Make sure file ownership is
transferred too, using the `chown` command.

# Transitioning Grist users

New users may need to be created in Grist Builder Edition
corresponding to the user in the Omnibus offer. Grist identifies users
by their email address.

For users that logged in via Google, Microsoft, or any other OpenID
Connect provider, setting up the corresponding OIDC provider in the
target EC2 instance is enough. This can be enabled in the environment
file `/home/grist/.env` in the Grist Builder Edition EC2 instance.

For users that logged in via Dex's built-in email/password
combination, their login credentials can be transferred to Authelia in
Grist Builder Edition. Consult the file
`/home/grist/persist/users_database.yml` in the Grist Builder Edition
EC2 instance for details.
